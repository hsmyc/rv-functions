import React, { ChangeEvent, CSSProperties, useState } from "react";

const dateInput = (inputValue: string) => {
  const input = inputValue.replace(/\D/g, "").slice(0, 8);

  if (!input || input.length < 2) {
    return input;
  }

  let formattedInput = "";

  formattedInput += input.slice(0, 2);

  if (input.length > 2) {
    formattedInput += "-";
  }

  formattedInput += input.slice(2, 4);

  if (input.length > 4) {
    formattedInput += "-";
  }

  formattedInput += input.slice(4);
  return formattedInput;
};

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  style?: CSSProperties;
  validatorMessage?: string;
  variant?: string;
  type?: string;
  dateMask?: boolean;
  validator: (value: string) => boolean;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = "",
  style = {},
  label = "",
  type = "text",
  dateMask = false,
  validator,
  validatorMessage,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [errorFields, setErrorFields] = useState<string[] | null>(null);
  const defaultStyle: CSSProperties = {
    border: error ? "1px solid red" : "1px solid #ccc",
    ...style,
  };

  const labelStyle: CSSProperties = {
    fontSize: 10,
    marginBottom: 3,
    marginTop: 0,
  };

  const errorStyle: CSSProperties = {
    fontSize: 10,
    marginTop: 3,
    marginBottom: 0,
    color: "red",
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (dateMask) {
      const date = dateInput(inputValue);
      onChange(date);
    } else {
      // Pass inputValue directly to onChange without formatting
      onChange(inputValue);
    }
  };

  return (
    <>
      {label && <p style={labelStyle}>{label}</p>}
      {type === "file" ? (
        <>
          <input
            type="file"
            id="upload"
            accept="image/*"
            onChange={(event) => {
              if (event.target.files) {
                const file = event.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    onChange(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }
            }}
            style={defaultStyle}
          />
          {error && <p style={errorStyle}>{error}</p>}
        </>
      ) : (
        <>
          <input
            type={type}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const inputValue = e.target.value;

              if (inputValue) {
                if (!validator(inputValue)) {
                  const updatedErrorFields = errorFields
                    ? [...errorFields, label]
                    : [label];
                  setErrorFields(updatedErrorFields);
                  setError(validatorMessage || "Invalid input");
                } else {
                  setError("");
                  setErrorFields([]);
                }
              }

              handleChange(e); // Pass the event here
            }}
            placeholder={placeholder}
            style={defaultStyle}
          />
          {error && <p style={errorStyle}>{error}</p>}
        </>
      )}
    </>
  );
};

export default Input;
