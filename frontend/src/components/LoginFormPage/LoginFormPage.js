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
    let newErrors = {};
    setErrors({});

    if (!password) {
      newErrors.password = "Password is required to sign in.";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      return dispatch(sessionActions.login({ credential, password })).catch(
        async (res) => {
          let data;
          try {
            // .clone() essentially allows you to read the response body twice
            data = await res.clone().json();
          } catch {
            data = await res.text(); // Will hit this case if, e.g., server is down
          }
          if (data?.errors) setErrors(data.errors);
          else if (data) setErrors([data]);
          else setErrors([res.statusText]);
        }
      );
    }
  };

  const handleNext = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!credential) {
      newErrors.credential = "Username or Email is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowPassword(true);
    }

    return setErrors(newErrors);
  };

  return (
    <div className="page-container">
      <div className="signin-container">
        <figure className="logo-container">
          <img className="gloogle-logo" src={googleLogo} />
        </figure>
        <h2 className="signin-header">Sign in</h2>
        <p className="signin-subheader"> to continue to GluetTube</p>
        <form className="signin-form" onSubmit={handleSubmit}>
          <ul>
            {Object.keys(errors).map((key) => {
              if (key !== "password" && key !== "username") {
                // Exclude email errors
                return (
                  <div className="err-message-sign-in" key={key}>
                    {errors[key]}
                  </div>
                );
              }
              return null;
            })}
          </ul>
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
                  const newErrors = { ...errors };
                  delete newErrors.credential;
                  setErrors(newErrors);
                }}
                placeholder="Username or Email"
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

              {errors.password && (
                <div className="err-message-sign-in-pass">
                  {errors.password}
                </div>
              )}
              <input
                className="signin-input password-input"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  const newErrors = { ...errors };
                  delete newErrors.password;
                  setErrors(newErrors);
                }}
                placeholder="Password"
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
