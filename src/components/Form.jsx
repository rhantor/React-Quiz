import Styles from "../styles/From.module.css";
export default function Form({ className, children, ...rest }) {
  return (
    <form className={`${className} ${Styles.form}` } action="#" {...rest}>
      {children}
    </form>
  );
}
