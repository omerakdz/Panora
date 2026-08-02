export const handleValidationError = async (
  result: any,
  response: Response,
  setFieldErrors: (errors: { [key: string]: string }) => void,
) => {
  console.error("❌ 400 Bad Request - Details:", {
    status: response.status,
    statusText: response.statusText,
    body: result,
    fouten: result.fouten,
    reden: result.reden,
    boodschap: result.boodschap,
  });

  let errorMessage = "Er is een probleem met je invoer.";

  if (
    result.fouten &&
    Array.isArray(result.fouten) &&
    result.fouten.length > 0
  ) {
    errorMessage =
      "Validatiefouten:\n" +
      result.fouten
        .map(
          (f: any) =>
            `• ${f.veld || "Onbekend veld"}: ${f.boodschap || f.fout || "Onbekende fout"}`,
        )
        .join("\n");

    console.error("📋 Validation errors:", result.fouten);
  } else if (result.reden) {
    errorMessage = result.reden;
  } else if (result.boodschap) {
    errorMessage = result.boodschap;
  }

  setFieldErrors({ form: errorMessage });

  alert(
    `Booking fout:\n\n${errorMessage}\n\nCheck de browser console (F12) voor volledige details.`,
  );
};
