interface IProp {
  text: string;
  className?: string;
}

export const Button = ({ text, className }: IProp) => {
  return <button className={className || "btn-default"}>{text}</button>;
};
