import { CircularProgress } from "@mui/material";
import React, { CSSProperties } from "react";

type InputType = "submit" | "button" | "reset";

interface ButtonProps {
  type?: InputType;
  style?: CSSProperties;
  error?: string;
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = "submit",
  style = {},
  error = "",
  disabled = false,
  onClick,
  loading = false,
  fullWidth = true,
  children,
}) => {
  const defaultStyle: CSSProperties = {
    backgroundColor: disabled ? "lightgrey" : undefined,
    width: fullWidth ? "100%" : "unset",
    ...style, // Merge default style with passed style
    position: "relative",
  };

  const errorStyle: CSSProperties = {
    fontSize: 10,
    marginTop: 0,
    marginBottom: 3,
    color: "red",
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <button
        type={type}
        style={defaultStyle}
        disabled={disabled}
        onClick={handleClick}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : children}
      </button>
      {error && <p style={errorStyle}>{error}</p>}
    </>
  );
};

const OutlinedButton: React.FC<ButtonProps> = ({
  type = "submit",
  style = {},
  error = "",
  disabled = false,
  onClick,
  loading = false,
  fullWidth = true,
  children,
}) => {
  const defaultStyle: CSSProperties = {
    width: fullWidth ? "100%" : "unset",
    background: "#fff",
    border: "1px solid #000",
    color: "#000",
    ...style, // Merge default style with passed style
    position: "relative",
  };

  const errorStyle: CSSProperties = {
    fontSize: 10,
    marginTop: 0,
    marginBottom: 3,
    color: "red",
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <button
        type={type}
        style={defaultStyle}
        disabled={disabled}
        onClick={handleClick}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : children}
      </button>
      {error && <p style={errorStyle}>{error}</p>}
    </>
  );
};
const TextButton: React.FC<ButtonProps> = ({
  type = "submit",
  style = {},
  error = "",
  disabled = false,
  onClick,
  loading = false,
  fullWidth = true,
  children,
}) => {
  const defaultStyle: CSSProperties = {
    width: fullWidth ? "100%" : "unset",
    background: "transparent",
    color: "#000",
    ...style, // Merge default style with passed style
    position: "relative",
  };

  const errorStyle: CSSProperties = {
    fontSize: 10,
    marginTop: 0,
    marginBottom: 3,
    color: "red",
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <button
        type={type}
        style={defaultStyle}
        disabled={disabled}
        onClick={handleClick}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : children}
      </button>
      {error && <p style={errorStyle}>{error}</p>}
    </>
  );
};

export { Button, OutlinedButton, TextButton };
