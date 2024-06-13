import rentvisie from "./instance";

interface PostReservationBody {
  rentalId: string;
  optionalOptionIds?: string[];
  insuranceOptionId?: string;
  mileagePackageOptionId?: string;
}

export const postReservation = async (
  clientId: string,
  channelId: string,
  userid: string,
  body: PostReservationBody
) => {
  const url = `/api/v2/reservations`;
  try {
    const response = await rentvisie.post(url, body, {
      headers: {
        clientid: clientId.toString(),
        channelid: channelId.toString(),
        userid,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`There was a problem with the postRes operation: ${error}`);
  }
};
export const getReservationReferences = async (userid: string) => {
  const url = `/api/v2/aggregations/linked-reservations`;
  try {
    const response = await rentvisie.get(url, {
      headers: {
        userid: userid,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("error: ", error);
    throw new Error(
      `There was a problem with the getReservationReferences operation: ${error}`
    );
  }
};
export const getReservation = async (
  reservationReference: string,
  clientId: string,
  channelId: string,
  email: string
) => {
  const url = `/api/v2/reservations/${reservationReference}?ignoreEmail=${email}`;
  try {
    const response = await rentvisie.get(url, {
      headers: {
        clientId: clientId.toString(),
        channelId: channelId.toString(),
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("error: ", error);
    throw new Error(
      `There was a problem with the getReservation operation: ${error}`
    );
  }
};

export const deleteReservation = async (
  reservationReference: string,
  clientId: string,
  channelId: string,
  userId: string
) => {
  const url = `/api/v2/reservations/${reservationReference}`;

  try {
    const response = await rentvisie.delete(url, {
      headers: {
        clientid: clientId?.toString(),
        channelid: channelId?.toString(),
        userid: userId,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`There was a problem with the fetch operation: ${error}`);
  }
};

export const reservationExtendCheck = async (
  reservationReference?: string,
  bookingReference?: string,
  clientId?: string,
  channelId?: string
) => {
  const url = `/api/v2/reservations/${reservationReference}/rentals/${bookingReference}/extend`;
  try {
    const response = await rentvisie.get(url, {
      headers: {
        clientid: clientId?.toString(),
        channelid: channelId?.toString(),
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(`There was a problem with the fetch operation: ${error}`);
  }
};

export const reservationExtend = async (
  reservationReference?: string,
  bookingReference?: string,
  clientId?: string,
  channelId?: string,
  date?: string
) => {
  const body = JSON.stringify({
    dateTo: date,
  });
  const url = `/api/v2/reservations/${reservationReference}/rentals/${bookingReference}/extend`;

  try {
    const response = await rentvisie.post(url, body, {
      headers: {
        clientid: clientId?.toString(),
        channelid: channelId?.toString(),
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`There was a problem with the fetch operation: ${error}`);
  }
};
export const patchReservation = async (
  body: PostReservationBody,
  reservationReference: string,
  bookingReference: string
) => {
  const url = `/reservations/${reservationReference}/rentals/${bookingReference}/customer`;
  try {
    const response = await rentvisie.patch(url, body, {});
    return response.data;
  } catch (error: any) {
    throw new Error(
      `There was a problem with the patchRes operation: ${error}`
    );
  }
};

export const confirmReservation = async (
  reservationReference: string,
  bookingReference: string
) => {
  const url = `/reservations/${reservationReference}/rentals/${bookingReference}/confirmation-email`;
  try {
    const response = await rentvisie.post(url, {});
    return response.data;
  } catch (error: any) {
    console.log("error", error);
  }
};
