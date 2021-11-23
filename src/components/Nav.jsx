import { Link } from "react-router-dom";
import Logo from "../assets/images/logo-bg.png";
import Style from "../styles/Nav.module.css";
import Account from "./Account";
export default function Nav() {
  return (
    <nav className={Style.nav}>
      <ul>
        <li>
          <Link to="/home" className={Style.brand}>
            <img src={Logo} alt="Learn with Sumit Logo" />
            <h3>React Quiz </h3>
          </Link>
        </li>
      </ul>
      <Account />
    </nav>
  );
}
