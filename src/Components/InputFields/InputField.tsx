import React from "react";

interface IProp {
  data: string;
  setData: (e: React.ChangeEvent<HTMLInputElement>) => void; // Thêm prop onChange
  value: string; 
  label?: string;
  inputType: string;
  className?: string;
}

export const InputField = ({
  data,
  setData,
  value,
  label,
  inputType,
  className,
}: IProp) => {
  return (
    <>
      {label && <label>{label}</label>}
      {inputType === "textarea" ? (
        <textarea
          placeholder={label || ""}
          value={value} // Sử dụng prop value thay cho data
        ></textarea>
      ) : (
        <input
          type="text"
          className={className}
          placeholder={data}
          value={value} // Sử dụng prop value thay cho data
          onChange={setData} // Sử dụng prop onChange
        />
      )}
    </>
  );
};
