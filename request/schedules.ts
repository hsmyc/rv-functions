import rentvisie from "./instance";
export const getSchedule = async (
  reservationReference: string,
  dateFrom: string,
  dateTo: string
) => {
  try {
    const response = await rentvisie.get(
      `/api/v2/reservations/${reservationReference}/schedules?dateFrom=${dateFrom}&dateTo=${dateTo}`
    );

    const data = await response.data;
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
