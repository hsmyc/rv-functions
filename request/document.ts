import rentvisie from "./instance";
export const getDocuments = async (
  reservationReference: string,
  clientid?: string,
  channelid?: string
) => {
  const url = `/api/v2/reservations/${reservationReference}/documents`;

  try {
    const response = await rentvisie.get(url, {
      headers: {
        clientid: clientid,
        channelid: channelid,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`There was a problem with the fetch operation: ${error}`);
  }
};

export const getDocument = async (
  reservationReference: string,
  documentId: string,
  clientid?: string,
  channelid?: string
) => {
  const url = `/api/v2/reservations/${reservationReference}/documents/${documentId}`;
  try {
    const response = await rentvisie.get(url, {
      headers: {
        clientid: clientid,
        channelid: channelid,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`There was a problem with the fetch operation: ${error}`);
  }
};
