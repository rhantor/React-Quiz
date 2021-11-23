import Styles from "../styles/Button.module.css";
export default function Button({ children, className , ...rest }) {
  return <button className={`${Styles.button} ${className}`} {...rest}>{children}</button>;
}
