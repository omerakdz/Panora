import { CalculatorData } from "@/types";
import { saveBookingDetails } from "./saveBookingDetails";
import { useRouter } from "next/navigation";
import { handleValidationError } from "./handleValidationError";
import { trackBookingError, trackBookingSuccess } from "./tracking";

type Router = ReturnType<typeof useRouter>;
export const handleBookingResponse = async (
  response: Response,
  data: CalculatorData,
  router: Router,
  setFieldErrors: (errors: { [key: string]: string }) => void,
) => {
  let result;
  try {
    result = await response.json();
    console.log("📥 Response body:", JSON.stringify(result, null, 2));
  } catch (e) {
    console.error("❌ Failed to parse response as JSON:", e);
    const textResponse = await response.text();
    console.error("Raw response:", textResponse);
    throw new Error(`API returned invalid JSON (status ${response.status})`);
  }

  if (
    response.status === 200 &&
    (result.ok === true ||
      result.status === "bevestigd" ||
      result.bevestigd === true)
  ) {
    console.log("✅ Booking successful!");

    trackBookingSuccess(data);

    saveBookingDetails(
      result.boodschap ||
        result.bevestiging ||
        "Je afspraak is bevestigd! Je ontvangt binnenkort een e-mail met alle details.",
      data,
    );

    console.log("📦 Booking details saved to sessionStorage");
    console.log("🎉 Redirecting to confirmation page...");

    router.push("/confirmation");

    return result;
  }

  if (response.status === 409) {
    alert(
      "Dit moment is net geboekt door iemand anders. We tonen je nieuwe beschikbare momenten.",
    );

    window.location.reload();
    return result;
  }

  if (response.status === 422) {
    alert(
      result.reden ||
        "Dit moment is niet meer beschikbaar. We tonen je nieuwe momenten.",
    );

    window.location.reload();
    return result;
  }

  if (response.status === 400) {
    await handleValidationError(result, response, setFieldErrors);
    return result;
  }

  console.error("⚠️ Unexpected response format:", {
    status: response.status,
    body: result,
    hasOk: "ok" in result,
    hasStatus: "status" in result,
    hasBevestigd: "bevestigd" in result,
    okValue: result.ok,
    statusValue: result.status,
    bevestigdValue: result.bevestigd,
  });

  trackBookingError("api_error");

  throw new Error(
    result?.boodschap || result?.reden || "Onverwachte response van de server.",
  );
};
