import signupImg from "../../assets/images/signup.svg";

import Illustration from "../Illustration";

import SignupFrom from "../SignupFrom";
export default function Signup() {
  return (
    <>
      <h1>Create an account</h1>

      <div className="column">
        <Illustration>
          <img src={signupImg} alt="Signup" />
        </Illustration>
        <SignupFrom/>
        
      </div>
    </>
  );
}
