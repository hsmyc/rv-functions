export const capitalizeFirstLetter = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const dateCalculation = (pickupDate: string, returDate: string) => {
  const date1 = new Date(pickupDate);
  const date2 = new Date(returDate);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

export const compareTimes = (timeStr1: string, timeStr2: string) => {
  const [hours1, minutes1] = timeStr1.split(":").map(Number);
  const [hours2, minutes2] = timeStr2.split(":").map(Number);

  if (hours1 > hours2) {
    return 1;
  } else if (hours1 < hours2) {
    return -1;
  } else {
    if (minutes1 > minutes2) {
      return 1;
    } else if (minutes1 < minutes2) {
      return -1;
    } else {
      return 0;
    }
  }
};

export const getDayAfterTomorrowDate = () => {
  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  return dayAfterTomorrow;
};
export const getReturnDate = (pickupDate: Date | string) => {
  const rPickupDate = new Date(pickupDate);
  if (isNaN(rPickupDate.getTime())) {
    return getDayAfterTomorrowDate();
  }
  return rPickupDate;
};
export const getAfterReturnDate = (returnDate: Date | string) => {
  const rReturnDate = new Date(returnDate).setDate(
    new Date(returnDate).getDate() + 1
  );

  return new Date(rReturnDate);
};
export const getTotalFromSelected = (selected: any) => {
  const vehiclePrice = selected.selectedRental?.options?.totalPrice.value;
  const mileagePrice = selected.mileageOption?.price || 0;
  const insurancePrice = selected.insuranceOption?.price || 0;
  const accessoryPrice: number =
    selected.accessories?.reduce(
      (accumulator: number, item: any) => accumulator + item.price,
      0
    ) || 0;
  const parsedPrices = [
    vehiclePrice,
    mileagePrice,
    insurancePrice,
    accessoryPrice,
  ].map((price) => {
    return parseFloat(price);
  });
  const priceT = parsedPrices.reduce(
    (accumulator: number, item: number) => accumulator + item,
    0
  );

  return priceT;
};
export const subtractOneMinute = (timeString: string): string => {
  let [hours, minutes] = timeString.split(":").map(Number);

  let totalMinutes: number = hours * 60 + minutes;

  totalMinutes -= 1;

  if (totalMinutes < 0) {
    totalMinutes += 24 * 60;
  }

  hours = Math.floor(totalMinutes / 60);
  minutes = totalMinutes % 60;

  const formattedHours: string = (hours < 10 ? "0" : "") + hours;
  const formattedMinutes: string = (minutes < 10 ? "0" : "") + minutes;

  return `${formattedHours}:${formattedMinutes}`;
};

export const addOneMinute = (timeString: string): string => {
  let [hours, minutes] = timeString.split(":").map(Number);

  let totalMinutes: number = hours * 60 + minutes;

  totalMinutes += 1;

  if (totalMinutes >= 24 * 60) {
    totalMinutes -= 24 * 60;
  }

  hours = Math.floor(totalMinutes / 60);
  minutes = totalMinutes % 60;

  const formattedHours: string = (hours < 10 ? "0" : "") + hours;
  const formattedMinutes: string = (minutes < 10 ? "0" : "") + minutes;

  return `${formattedHours}:${formattedMinutes}`;
};

export const extractId = (uri: string) => {
  const lastSlashIndex = uri.lastIndexOf("/");

  const jpgIndex = uri.indexOf(".jpg", lastSlashIndex);

  if (lastSlashIndex === -1 || jpgIndex === -1) {
    return null;
  }

  const id = uri.substring(lastSlashIndex + 1, jpgIndex);

  return id;
};
