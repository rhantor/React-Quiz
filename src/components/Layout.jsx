import Style from "../styles/Layout.module.css";
import Nav from "./Nav";
export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main className={Style.main}>
        <div className={Style.container}>{children}</div>
      </main>
    </>
  );
}
