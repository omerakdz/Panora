// Simple in-memory rate limiter for API routes
type RateLimitStore = {
  count: number;
  resetTime: number;
};

const store = new Map<string, RateLimitStore>();

export type RateLimitConfig = {
  /**
   * Unique identifier for the rate limit (e.g., "api:contact")
   */
  id: string;
  /**
   * Maximum number of requests allowed in the time window
   */
  limit: number;
  /**
   * Time window in milliseconds
   */
  window: number;
};

/**
 * Rate limit middleware for API routes
 * Returns null if allowed, or a Response object if rate limited
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig,
): { success: boolean; remaining: number; reset: number } | null {
  const key = `${config.id}:${identifier}`;
  const now = Date.now();

  const current = store.get(key);

  // If no record exists or window has expired, create new record
  if (!current || now > current.resetTime) {
    store.set(key, {
      count: 1,
      resetTime: now + config.window,
    });
    return {
      success: true,
      remaining: config.limit - 1,
      reset: now + config.window,
    };
  }

  // Increment counter
  current.count += 1;

  // Check if limit exceeded
  if (current.count > config.limit) {
    return null; // Rate limit exceeded
  }

  return {
    success: true,
    remaining: config.limit - current.count,
    reset: current.resetTime,
  };
}

/**
 * Get client IP address from request
 */
export function getClientIp(request: Request): string {
  // Try common header names
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Fallback to a constant for local development
  return "127.0.0.1";
}

/**
 * Create a rate limit response
 */
export function createRateLimitResponse(reset: number) {
  const retryAfter = Math.ceil((reset - Date.now()) / 1000);

  return new Response(
    JSON.stringify({
      error: "Te veel verzoeken. Probeer het later opnieuw.",
      retryAfter,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": retryAfter.toString(),
      },
    },
  );
}

// Cleanup old entries periodically (runs every 10 minutes)
if (typeof window === "undefined") {
  setInterval(
    () => {
      const now = Date.now();
      for (const [key, value] of store.entries()) {
        if (now > value.resetTime) {
          store.delete(key);
        }
      }
    },
    10 * 60 * 1000,
  );
}
