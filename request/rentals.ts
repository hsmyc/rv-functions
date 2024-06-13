import rentvisie from "./instance";

export const fetchRental = async (
  pickupDate: string,
  returnDate: string,
  pickupTime: string,
  returnTime: string,
  locationId: number,
  vehicleClassId: number,
  clientId: string,
  channelId: string
) => {
  const url = `/api/v2/rentals?pickupDate=${pickupDate}&returnDate=${returnDate}&pickupTime=${pickupTime}&returnTime=${returnTime}&locationId=${locationId}&vehicleClassId=${vehicleClassId}`;

  try {
    const response = await rentvisie.get(url, {
      headers: {
        clientId: clientId.toString(),
        channelId: channelId.toString(),
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(`There was a problem with the fetch operation: ${error}`);
  }
};
