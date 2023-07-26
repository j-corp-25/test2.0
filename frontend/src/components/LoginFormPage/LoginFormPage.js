import React from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import "./LoginFormPage.css";
import googleLogo from "../../assets/GlooGle2.svg";
import { Link } from "react-router-dom";

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  if (sessionUser) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(sessionActions.login({ credential, password })).catch((err) => {
      if (err && err.errors) {
        setErrors(err.errors);
      } else {
        setErrors(["Failed to log in."]);
      }
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log("handleNext was called");

    let newErrors = {};
    if (!credential) {
      newErrors.credential = ("Username or Email is required.");
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowPassword(true);
    }
    return setErrors(newErrors);
    // return{
    //   setErrors([newErrors])}
    // }
  }

  return (
    <div className="page-container">
      <div className="signin-container">
        <figure className="logo-container">
          <img className="gloogle-logo" src={googleLogo} />
        </figure>
        <h2 className="signin-header">Sign in</h2>
        <p className="signin-subheader"> to continue to GluetTube</p>
        <form className="signin-form" onSubmit={handleSubmit}>
          {/* <ul>
            {errors.map((error, idx) => (
              <li className="err-message-sign-in" key={idx}>
                {error}
              </li>
            ))}
          </ul> */}
          {!showPassword ? (
            <>

          {errors.credential && (
                <div className="err-message-sign-in">{errors.credential}</div>
              )}
              <input
                className="signin-input email-input"
                type="text"
                value={credential}
                onChange={(e) => {
                  setCredential(e.target.value);
                  const newErrors = { ...errors};
                  delete newErrors.credential;
                  setErrors(newErrors);
                }}
                placeholder="Username or Email"
                required
              />
          
              <button
                className="next-button"
                type="submit"
                onClick={handleNext}
              >
                Next
              </button>
              <div className="signup-container">
                <Link to="/signup" className="signup-link">
                  Create account
                </Link>
              </div>
            </>
          ) : (
            <>
              <button
                className="back-button"
                type="button"
                onClick={() => setShowPassword(false)}
              >
                Back
              </button>
              <input
                className="signin-input password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button className="signin-button" type="submit">
                Sign In
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginFormPage;
