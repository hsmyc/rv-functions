import rentvisie from "./instance";

export const selfService = async (
  clientId: string,
  channelId: string,
  reservationReference: string,
  bookingReference: string,
  status: string,
  licenseplate: string
) => {
  const s = status === "pickup" ? "Pickup" : "DropOff";
  const url = `/api/v2/self-service/reservations/${reservationReference}/bookings/${bookingReference}/vehicles/${licenseplate}/inspections/${s}`;

  const response = await rentvisie.post(
    url,
    {},
    {
      headers: {
        clientid: clientId,
        channelid: channelId,
      },
    }
  );

  return response.data;
};
