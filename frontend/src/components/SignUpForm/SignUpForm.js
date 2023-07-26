import React from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import googleLogo from "../../assets/GlooGle2.svg";
import "./SignUpForm.css";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const sessionUser = useSelector((state) => state.session.user);
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [showBasicInfo, setShowBasicInfo] = useState(false);
  const [errors, setErrors] = useState({});

  if (sessionUser) {
    return <Redirect to="/" />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    setErrors({});

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Not a valid email address missing @";
    } else if (!email.includes(".")) {
      newErrors.email = "Not a valid email address missing a period ";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (password.length < 9) {
      newErrors.password = "Password must be at least 9 characters";
    }

    if (!username) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      return dispatch(
        sessionActions.signup({
          username,
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        })
      ).catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
    }
    return setErrors(newErrors);
  };

  const handleNext = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowBasicInfo(true);
    }
  };

  return (
    <div className="page-container">
      <div className="signup-container-full">
        <figure className="logo-container">
          <img className="gloogle-logo" src={googleLogo} />
        </figure>
        <h2 className="signup-header">
          {showBasicInfo ? "Enter Basic Info" : "Create a GlueTube account"}
        </h2>
        <p className="signup-subheader">
          {showBasicInfo
            ? "Please enter your email, username, and password"
            : "Enter your name"}
        </p>
        <form className="signup-form" onSubmit={handleSubmit}>
          {!showBasicInfo ? (
            <>
              {errors.firstName && (
                <div className="error-message-sign-up-fn">
                  {errors.firstName}
                </div>
              )}
              <input
                className="signup-input first-name "
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  const newErrors = { ...errors };
                  delete newErrors.firstName;
                  setErrors(newErrors);
                }}
              />
              {errors.lastName && (
                <div className="error-message-sign-up">{errors.lastName}</div>
              )}
              <input
                className="signup-input last-name"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  const newErrors = { ...errors };
                  delete newErrors.lastName;
                  setErrors(newErrors);
                }}
              />

              <button
                className="next-button-signup"
                type="button"
                onClick={handleNext}
              >
                Next
              </button>
            </>
          ) : (
            <>
              <button
                className="back-button-signup"
                type="button"
                onClick={() => setShowBasicInfo(false)}
              >
                Back
              </button>

              <ul>
                {Object.keys(errors).map((key) => {
                  if (key !== "password" && key !== "username") {
                    return (
                      <div className="error-message-sign-up-email  " key={key}>
                        {errors[key]}
                      </div>
                    );
                  }
                  return null;
                })}
              </ul>

              <input
                className="signup-input email-input-signup"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  const newErrors = { ...errors };
                  delete newErrors.email;
                  setErrors(newErrors);
                }}
                placeholder="Email address"
              />
              {errors.username && (
                <div className="error-message-sign-up-user">
                  {errors.username}
                </div>
              )}
              <input
                className="signup-input username-input-signup"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  const newErrors = { ...errors };
                  delete newErrors.username;
                  setErrors(newErrors);
                }}
                placeholder="Username"
              />
              {errors.password && (
                <div className="error-message-sign-up-pass">
                  {errors.password}
                </div>
              )}
              <input
                className="signup-input password-input-signup"
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

              <button className="signup-button" type="submit">
                Sign Up
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
