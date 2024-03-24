interface IProp {
  text: string;
  className?: string;
  onClick?: () => void; // Thêm kiểu dữ liệu cho prop onClick
}

export const Button = ({ text, className, onClick }: IProp) => {
  return (
    <button className={className ?? "btn-default"} onClick={onClick}>
      {text}
    </button>
  );
};
