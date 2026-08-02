export const submitBooking = async (bookingPayload: any) => {
  const response = await fetch("https://n8n.panora.be/webhook/planning/boek", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingPayload),
  });
  return response;
};
