import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../../assets/images/login.svg";
import { useAuth } from "../../context/AuthContext";
import Styles from "../../styles/Login.module.css";
import Button from "../Button";
import From from "../Form";
import Illustration from "../Illustration";
import TextInput from "../TextInput";

export default function Login() {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await login(email, password);
      navigate("/home");
    } catch (err) {
      console.log(err);
      switch (err.code) {
        case "auth/user-disabled":
        case "auth/user-not-found":
        case "auth/too-many-requests":
        case "auth/invalid-email":
        case "auth/wrong-password":
          setError(err.message);
          break;
        default:
          break;
      }
      // setError("Login failed check email & password");
      setLoading(false);
    }
  }

  return (
    <div className="column">
      <Illustration>
        <img src={LoginImage} alt="Login" />
      </Illustration>
      <From className={`${Styles.login}`} onSubmit={handleLogin}>
        <TextInput
          type="text"
          placeholder="Enter Email"
          icon="alternate_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          type="password"
          placeholder="Enter password"
          icon="lock"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button disabled={loading} type="submit" className="hello">
          {" "}
          {loading ? "loging..." : <span>Submit Now</span>}
        </Button>

        {error && <p className="error"> {error} </p>}

        <div className="info">
          Don't have an account? <Link to="/signup">Signup</Link> instead.
        </div>
      </From>
    </div>
  );
}
