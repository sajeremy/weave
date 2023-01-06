import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, clearSessionErrors } from "../../store/session";
import "./LoginModal.scss";

function LoginModal({close, modalFunctions}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleClick = () => {
    dispatch(login({ email: "demouser@user.io", password: "password" }));
    close(false);
  };

  return (
    <>
      <form className="session-form" onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <div className="errors">{errors?.email}</div>
        <div className="login-password-container input-container">
          <span className="email-label input-label">Email</span>
          <input
            type="text"
            value={email}
            className="login-email-input login-input"
            onChange={update("email")}
          />
        </div>
        <div className="errors">{errors?.password}</div>
        <div className="login-password-container input-container">
          <span className="password-label input-label">Password</span>
          <input
            type="password"
            value={password}
            className="login-password-input login-input"
            onChange={update("password")}
          />
        </div>
        <input type="submit" value="Log In" className="login-submit-button" disabled={!email || !password} />
        <button onClick={handleClick} className="demo-button">
          Demo User
        </button>
      </form>
    </>
  );
}

export default LoginModal;
