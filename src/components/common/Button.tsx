type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};
const Button = ({ children,...props }: ButtonProps) => {
  return (
    <button {...props} className={["btn",props.className ?? ""].join(" ")}>{children}</button>
  )
}

export default Button;