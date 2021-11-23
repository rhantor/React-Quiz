import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Style from "../styles/Signup.module.css";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import TextInput from "./TextInput";

export default function SignupFrom() {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [agree, setAgree] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const { signup, } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPass) {
      return setError("Your Password Don't Matched  ");
    }
    // if (password.length < 8) {
    //   return setError("Password should be at least 8 characters");
    // }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, userName);
      navigate("/home");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
        case "auth/weak-password":
        case "auth/wrong-password":
          setError(err.message);
          break;
        default:
          break;
      }
      console.log(err);
      setLoading(false);
    }
  }
  return (
    <Form className={`${Style.signup}`} onSubmit={handleSubmit}>
      <TextInput
        value={userName}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Enter name"
        icon="person"
      />

      <TextInput
        required
        type="text"
        placeholder="Enter Email"
        icon="alternate_email "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextInput
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Enter password"
        icon="lock"
      />

      <TextInput
        required
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
        type="password"
        placeholder="confirm password"
        icon="lock_clock"
      />

      <Checkbox
        value={agree}
        onChange={(e) => setAgree(e.target.value)}
        required
        text="I agree to the Terms &amp; Conditions"
      />

      {error && <p className="error">{error}</p>}
      <br />
      <Button disabled={loading} type="submit">
        {" "}
        <span> {loading ? "singin..." : "Submit Now"} </span>{" "}
      </Button>

      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}
