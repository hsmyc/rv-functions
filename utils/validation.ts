import { addDays, isAfter, isSameDay, isBefore, parseISO } from "date-fns";
type ValidationError = {
  message: string;
};
export const validateEmail = (email: string) => {
  const emailValidationRegex =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!email) {
    return { message: "Email is required" };
  }

  if (!emailValidationRegex.test(email)) {
    return { message: "Email not valid" };
  }
  return null;
};

export const validatePassword = (password: string, isLogin: boolean) => {
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password) {
    return { message: "Password is required" };
  }
  if (!isLogin && !strongPasswordRegex.test(password)) {
    return {
      message:
        "Password must contain at least 8 characters, one uppercase letter, one number and one symbol",
    };
  }
  return null;
};

export const validateRepeatPassword = (
  password: string,
  repeatPassword: string
) => {
  if (!repeatPassword) {
    return { message: "Repeat password is required" };
  }

  if (password !== repeatPassword) {
    return { message: "Passwords do not match" };
  }
  return null;
};

export const validateDate = (
  date1: Date,
  date2: Date,
  time1: string,
  time2: string,
  setError: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const splitPickupTime = time1.split(":");
  const pickupTimeStr = `${splitPickupTime[0]}${splitPickupTime[1]}`;

  const pickupTime = parseInt(pickupTimeStr);
  const splitReturnTime = time2.split(":");

  const returnTimeStr = `${splitReturnTime[0]}${splitReturnTime[1]}`;
  const returnTime = parseInt(returnTimeStr);

  if (isAfter(date1, date2)) {
    setError(true);
  } else if (isSameDay(date1, date2) && pickupTime > returnTime) {
    setError(true);
  } else {
    setError(false);
  }
};

export const validateNull = (value: string) => {
  if (!value) {
    return { message: "This field is required" };
  }
  return null;
};

export const validateHouseNumber = (houseNumber: string) => {
  const houseNumberRegex = /^[1-9][0-9]*[a-zA-Z]?(\/[1-9][0-9]*[a-zA-Z]?)?$/;

  if (!houseNumber) {
    return { message: "House number is required" };
  }

  if (!houseNumberRegex.test(houseNumber) || houseNumber.length > 5) {
    return { message: "Invalid house number format" };
  }

  return null;
};

export const validatePostcode = (postcode: string): ValidationError | null => {
  const regex = /^[1-9][0-9]{3}/;
  if (!postcode) {
    return { message: "Postcode is required" };
  } else if (!regex.test(postcode)) {
    return { message: "Invalid postcode" };
  } else {
    return null;
  }
};
export const validatePostcodeCheck = (
  postcode: string
): ValidationError | null => {
  const regex = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/;
  if (!postcode) {
    return { message: "Postcode is required" };
  } else if (!regex.test(postcode)) {
    return { message: "Invalid postcode" };
  } else {
    return null;
  }
};
export const validateAddition = (addition: string): ValidationError | null => {
  const regex = /^[a-zA-Z0-9]{0,4}$/;
  if (!regex.test(addition)) {
    return { message: "Invalid addition" };
  } else {
    return null;
  }
};
export const validatePhoneNumber = (
  phoneNumber: string
): ValidationError | null => {
  const regex = /^\+?\d{9,14}$/;
  if (!phoneNumber) {
    return { message: "Phone number is required" };
  } else if (!regex.test(phoneNumber)) {
    return { message: "Invalid phone number" };
  } else {
    return null;
  }
};

export const validateDateOfBirth = (date: Date) => {
  const currentDate = new Date();
  const age = currentDate.getFullYear() - date.getFullYear();

  return age < 18 ? { message: "You must be 18 years or older" } : null;
};

export const isValidIban = (input: string | boolean): string | boolean => {
  if (!input || typeof input === "boolean") {
    return false;
  }
  const iban = input.replace(/\s/g, "").toUpperCase();

  const ibanRegex =
    /^(?:(?:IT|SM)\d{2}[A-Z]\d{22}|CY\d{2}[A-Z]\d{23}|NL\d{2}[A-Z]{4}\d{10}|LV\d{2}[A-Z]{4}\d{13}|(?:BG|BH|GB|IE)\d{2}[A-Z]{4}\d{14}|GI\d{2}[A-Z]{4}\d{15}|RO\d{2}[A-Z]{4}\d{16}|KW\d{2}[A-Z]{4}\d{22}|MT\d{2}[A-Z]{4}\d{23}|NO\d{13}|(?:DK|FI|GL|FO)\d{16}|MK\d{17}|(?:AT|EE|KZ|LU|XK)\d{18}|(?:BA|HR|LI|CH|CR)\d{19}|(?:GE|DE|LT|ME|RS)\d{20}|IL\d{21}|(?:AD|CZ|ES|MD|SA)\d{22}|PT\d{23}|(?:BE|IS)\d{24}|(?:FR|MR|MC)\d{25}|(?:AL|DO|LB|PL)\d{26}|(?:AZ|HU)\d{27}|(?:GR|MU)\d{28})$/;
  if (!ibanRegex.test(iban)) {
    return false;
  }

  // Check if the IBAN starts with a valid country code (first two characters)
  const country_code = iban.slice(0, 2);
  const valid_country_codes = [
    "AT",
    "BE",
    "BG",
    "HR",
    "CY",
    "CZ",
    "DK",
    "EE",
    "FI",
    "FR",
    "DE",
    "GR",
    "HU",
    "IE",
    "IT",
    "LV",
    "LT",
    "LU",
    "MT",
    "NL",
    "PL",
    "PT",
    "RO",
    "SK",
    "SI",
    "ES",
    "SE",
  ];

  if (!valid_country_codes.includes(country_code)) {
    return false;
  }

  // Perform IBAN checksum validation
  function customModulo(x: string, y: number) {
    let result = 0;

    for (let i = 0; i < x.length; i++) {
      result = (result * 10 + parseInt(x[i], 10)) % y;
    }

    return result;
  }

  const ibanDigits = (iban.substring(4) + iban.substring(0, 4)).split("");
  let numericIban = "";

  for (let i = 0; i < ibanDigits.length; i++) {
    const char = ibanDigits[i];
    if (char >= "A" && char <= "Z") {
      numericIban += (char.charCodeAt(0) - "A".charCodeAt(0) + 10).toString();
    } else {
      numericIban += char;
    }
  }

  const remainder = customModulo(numericIban, 97);

  if (remainder !== 1) {
    return false;
  }
  return true;
};
export const validateDLNumber = (
  driverLicenseNumber: string | null
): ValidationError | null => {
  if (!driverLicenseNumber) {
    return { message: "Driver license number is required" };
  }

  const numericValue = parseInt(driverLicenseNumber.replace(/\D/g, ""), 10);

  if (!isNaN(numericValue) && numericValue >= 100000) {
    return null;
  }
  return { message: "Invalid driver license number" };
};

export const validateDLType = (str: string | null): ValidationError | null => {
  if (!str || str === "") {
    return { message: "Driver license type is required" };
  }
  return null;
};

export const validateDLIssueDate = (
  date: string | null
): ValidationError | null => {
  if (!date) {
    return { message: "Driver license issue date is required" };
  }
  const isoDate = new Date(date).toISOString();
  const parsedDate = parseISO(isoDate);
  // add 1 day as it is fine to have the same date.
  if (isBefore(parsedDate, addDays(new Date(), 1))) {
    return null;
  }
  return { message: "Issue date cannot be in the future" };
};

export const validateDLExpiryDate = (
  expiryDate: string | null,
  issueDate: string | null
): ValidationError | null => {
  if (!expiryDate || !issueDate) {
    return { message: "Driver license expiry date is required" };
  }
  const isoDate = new Date(expiryDate).toISOString();
  const isoIssueDate = new Date(issueDate).toISOString();
  const parsedExpiryDate = parseISO(isoDate);
  const parsedIssueDate = parseISO(isoIssueDate);
  if (isAfter(parsedExpiryDate, parsedIssueDate)) {
    return null;
  }
  return { message: "Expiry date must be after issue date" };
};

interface AccountFields {
  email: string;
  firstName: string;
  houseNumber: string;
  lastName: string;
  phone: string;
  postalCode: string;
  street: string;
  city: string;
  dateOfBirth: string;
  placeOfBirth: string;
}
export const validateAccountFields = (obj: AccountFields) => {
  const requiredFields: (keyof AccountFields)[] = [
    "email",
    "firstName",
    "houseNumber",
    "lastName",
    "phone",
    "postalCode",
    "street",
    "city",
    "dateOfBirth",
    "placeOfBirth",
  ];

  for (let field of requiredFields) {
    if (!obj[field]) {
      return false;
    }
  }
  return true;
};
