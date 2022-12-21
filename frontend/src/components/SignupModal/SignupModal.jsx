import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SignupModal.scss";    
import { signup, clearSessionErrors } from "../../store/session";

function SignupModal({close}) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;

    switch (field) {
      case "firstName":
        setState = setFirstName;
        break;
      case "lastName":
        setState = setLastName;
        break;
      case "email":
        setState = setEmail;
        break;
      case "password":
        setState = setPassword;
        break;
      default:
        throw Error("Unknown field in Signup Form");
    }

    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(signup(user));
    close(false);

  };

  return (
    <form className="session-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="errors">{errors?.email}</div>
        <div className="signup-name-container">
            <div className="signup-firstname-wrapper input-container">
                <span className="firstname-label input-label">First Name</span>
                <input
                type="text"
                value={firstName}
                onChange={update("firstName")}
                className="signup-firstname signup-name signup-input"
                />
            </div>
            <div className="signup-lastname-wrapper input-container">
                <span className="lastname-label input-label">Last Name</span>
                <input
                type="text"
                value={lastName}
                onChange={update("lastName")}
                className="signup-lastname signup-name signup-input"
                />
            </div>
        </div>
        <div className="signup-email-container input-container">
            <span className="email-label input-label">Email</span>
            <input
            type="text"
            value={email}
            onChange={update("email")}
            className="signup-email signup-input"
            />
        </div>
        {/* <div className="errors">{errors?.username}</div> */}
        <div className="errors">{errors?.password}</div>
        <div className="signup-password-container input-container">
            <span className="input-label">Password</span>
            <input
            type="password"
            value={password}
            onChange={update("password")}
            className="signup-password signup-input"
            />
        </div>
        <input
            type="submit"
            value="Sign Up"
            className="signup-submit-button"
            disabled={
            !email ||
            !firstName ||
            !lastName ||
            !password
            }
        />
        <div className="login-switch-container">
            <span>Already have an account?</span>
            <button className="switch-loginmodal-button">Log In</button>
        </div>
    </form>
  );
}

export default SignupModal;
