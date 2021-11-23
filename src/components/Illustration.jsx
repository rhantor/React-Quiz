import Styles from "../styles/Illustration.module.css";
export default function Illustration({ children }) {
  return <div className={Styles.illustration}>{children}</div>;
}
