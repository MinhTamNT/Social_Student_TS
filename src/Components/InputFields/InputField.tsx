import React from "react";

interface IProp {
  data: string;
  setData: (e: React.ChangeEvent<HTMLInputElement>) => void; // Thêm prop onChange
  value: string;
  label?: string;
  inputType: string;
  type?: string;
  classNameLabel?: string;
  classNameInput?: string;
}

export const InputField = ({
  data,
  setData,
  value,
  label,
  inputType,
  type,
  classNameLabel,
  classNameInput,
}: IProp) => {
  return (
    <div className="flex flex-col mb-5">
      {label && <label className={classNameLabel}>{label}</label>}
      {inputType === "textarea" ? (
        <textarea
          placeholder={label || ""}
          value={value} // Sử dụng prop value thay cho data
        ></textarea>
      ) : (
        <input
          type={type}
          className={classNameInput}
          placeholder={data}
          value={value} // Sử dụng prop value thay cho data
          onChange={setData} // Sử dụng prop onChange
        />
      )}
    </div>
  );
};
