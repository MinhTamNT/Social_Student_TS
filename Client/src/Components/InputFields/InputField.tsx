import React from "react";

interface InputFieldProps {
  data: string;
  setData: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: string;
  label?: string;
  inputType: "text" | "textarea"; // Specify supported input types
  type?: string; // Add type prop if needed for input type
  classNameLabel?: string;
  classNameInput?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  data,
  setData,
  value,
  label,
  inputType,
  type,
  classNameLabel,
  classNameInput,
}) => {
  return (
    <div className="flex flex-col mb-5">
      {label && <label className={classNameLabel}>{label}</label>}
      {inputType === "textarea" ? (
        <textarea
          className={classNameInput} // Add className for styling
          placeholder={label || ""}
          value={value}
          onChange={setData} // Use onChange to update data
        />
      ) : (
        <input
          type={type || "text"} // Default to "text" type if not specified
          className={classNameInput} // Add className for styling
          placeholder={label || ""}
          value={value}
          onChange={setData} // Use onChange to update data
        />
      )}
    </div>
  );
};
