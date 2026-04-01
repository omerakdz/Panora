import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";

/**
 * Health status types for the database connection
 */
type HealthStatus = "healthy" | "degraded" | "unhealthy";

/**
 * Response structure for the keep-alive endpoint
 */
interface KeepAliveResponse {
  success: boolean;
  status: HealthStatus;
  message: string;
  timestamp: string;
  metadata: {
    responseTime: number;
    version: string;
    environment: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

/**
 * Keep-alive endpoint to maintain Supabase database connectivity
 *
 * This endpoint performs a lightweight health check on the database
 * and should be called periodically (weekly recommended) to prevent
 * database from pausing due to inactivity.
 *
 * Features:
 * - Rate limiting to prevent abuse
 * - Optional API key authentication
 * - Timeout handling for slow connections
 * - Detailed health status reporting
 * - Structured error logging
 *
 * @returns {KeepAliveResponse} Health status and metadata
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Rate limiting: Allow 10 requests per hour per IP
    const identifier =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateLimitResult = rateLimit(identifier, {
      id: "keep-alive",
      limit: 10,
      window: 60 * 60 * 1000, // 1 hour
    });

    if (!rateLimitResult?.success) {
      return NextResponse.json<KeepAliveResponse>(
        {
          success: false,
          status: "unhealthy",
          message: "Rate limit exceeded",
          timestamp: new Date().toISOString(),
          metadata: {
            responseTime: Date.now() - startTime,
            version: "1.0.0",
            environment: process.env.NODE_ENV || "production",
          },
          error: {
            code: "RATE_LIMIT_EXCEEDED",
            message: "Too many requests. Please try again later.",
          },
        },
        {
          status: 429,
          headers: {
            "Retry-After": "3600",
            "X-RateLimit-Limit": "10",
            "X-RateLimit-Remaining": "0",
          },
        },
      );
    }

    // Optional: Verify API key for external monitoring services
    const apiKey = request.headers.get("x-api-key");
    const expectedApiKey = process.env.KEEP_ALIVE_API_KEY;

    if (expectedApiKey && apiKey !== expectedApiKey) {
      console.warn("Unauthorized keep-alive attempt", {
        ip: identifier,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json<KeepAliveResponse>(
        {
          success: false,
          status: "unhealthy",
          message: "Unauthorized",
          timestamp: new Date().toISOString(),
          metadata: {
            responseTime: Date.now() - startTime,
            version: "1.0.0",
            environment: process.env.NODE_ENV || "production",
          },
          error: {
            code: "UNAUTHORIZED",
            message: "Invalid or missing API key",
          },
        },
        { status: 401 },
      );
    }

    // Perform database health check with timeout
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Database query timeout")), 5000),
    );

    const queryPromise = supabaseAdmin
      .from("bookings")
      .select("id")
      .limit(1)
      .then((result) => result);

    const { data, error } = await Promise.race([queryPromise, timeoutPromise]);

    const responseTime = Date.now() - startTime;

    // Determine health status based on response time and errors
    let status: HealthStatus = "healthy";
    if (error) {
      status = "unhealthy";
    } else if (responseTime > 2000) {
      status = "degraded";
    }

    if (error) {
      console.error("Keep-alive database query failed", {
        error: error.message,
        code: error.code,
        details: error.details,
        timestamp: new Date().toISOString(),
        responseTime,
      });

      return NextResponse.json<KeepAliveResponse>(
        {
          success: false,
          status,
          message: "Database connection failed",
          timestamp: new Date().toISOString(),
          metadata: {
            responseTime,
            version: "1.0.0",
            environment: process.env.NODE_ENV || "production",
          },
          error: {
            code: "DATABASE_ERROR",
            message: error.message,
          },
        },
        { status: 503 },
      );
    }

    // Log successful health check
    console.log("Keep-alive successful", {
      status,
      responseTime,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json<KeepAliveResponse>(
      {
        success: true,
        status,
        message:
          status === "healthy"
            ? "Database is fully operational"
            : "Database responding but slower than expected",
        timestamp: new Date().toISOString(),
        metadata: {
          responseTime,
          version: "1.0.0",
          environment: process.env.NODE_ENV || "production",
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "X-Health-Status": status,
          "X-Response-Time": `${responseTime}ms`,
        },
      },
    );
  } catch (error) {
    const responseTime = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    console.error("Keep-alive critical error", {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      responseTime,
    });

    return NextResponse.json<KeepAliveResponse>(
      {
        success: false,
        status: "unhealthy",
        message: "Internal server error",
        timestamp: new Date().toISOString(),
        metadata: {
          responseTime,
          version: "1.0.0",
          environment: process.env.NODE_ENV || "production",
        },
        error: {
          code: "INTERNAL_ERROR",
          message:
            process.env.NODE_ENV === "development"
              ? errorMessage
              : "An unexpected error occurred",
        },
      },
      { status: 500 },
    );
  }
}
