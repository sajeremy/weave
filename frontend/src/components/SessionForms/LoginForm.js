import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SessionForm.css";

import { login, clearSessionErrors } from "../../store/session";

function LoginForm() {
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
    // debugger; commented out for render
    dispatch(login({ email, password }));
  };

  const handleClick = () => {
    dispatch(login({ email: "demouser@user.io", password: "password" }));
  };

  return (
    <>
      <form className="session-form" onSubmit={handleSubmit}>
        <h2>Log In </h2>
        <div className="errors">{errors?.email}</div>
        <label>
          <span>Email</span>
          <input
            type="text"
            value={email}
            onChange={update("email")}
            placeholder="Email"
          />
        </label>
        <div className="errors">{errors?.password}</div>
        <label>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={update("password")}
            placeholder="Password"
          />
        </label>
        <input type="submit" value="Log In" disabled={!email || !password} />
      </form>
      <button type="submit" onClick={handleClick}>
        Log In As Demo User
      </button>
    </>
  );
}

export default LoginForm;
