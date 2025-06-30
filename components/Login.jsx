"use client";

import { toastDrawer, toastError, toastSuccess } from "@/app/toast_utils";
import {
  checkEmailError,
  checkPasswordError,
  clickElementOnKey,
  isValidEmail,
  isValidPassword,
} from "@/app/utils";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const parameters = useSearchParams();

  const isRegisterParameter = parameters.get("register");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRegistration, setIsRegistration] = useState(isRegisterParameter);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { signup, login } = useAuth();

  function handlePasswordVisibility() {
    setIsPasswordVisible((prev) => !prev);
  }

  async function handleAuthenticate() {
    if (isAuthenticating) {
      return;
    }

    if (!isValidEmail(email)) {
      let errorMessage = checkEmailError(email);
      toastError(errorMessage);
      return;
    } else if (!isValidPassword(password)) {
      let errorMessage = checkPasswordError(password);
      toastError(errorMessage);
      return;
    }

    setIsAuthenticating(true);
    let message = "";

    try {
      if (isRegistration) {
        await signup(email, password);
        message = "Signed Up";
      } else {
        await login(email, password);
        message = "Logged In";
      }

      toastSuccess(`${message} successfully!`);
    } catch (error) {
      console.log(error.message);
      if (error.message == "Firebase: Error (auth/invalid-credential).") {
        toastError("Please Enter Valid Credentials");
      } else {
        toastError("Please try again after some time!");
      }
    } finally {
      setIsAuthenticating(false);
    }
  }

  //   key_listener("submit", "Enter");

  useEffect(() => {
    toastDrawer("Create your free account or Login with default account");
    clickElementOnKey("submit", "Enter");
  }, []);

  return (
    <div className="login">
      <h2>{isRegistration ? "Create an Account" : "Login"}</h2>
      {/* <div className="message"><p>Create your free account or Login with default account <strong>test@gmail.com</strong> and password as <strong>'password'</strong></p></div> */}
      <input
        id="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />
      <div className="password">
        <input
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          type={isPasswordVisible ? "text" : "password"}
        />
        <button
          title="toggle password visibility"
          onClick={() => {
            handlePasswordVisibility();
          }}
        >
          <i className="fa-solid fa-eye"></i>
        </button>
      </div>
      <button
        id="submit"
        onClick={handleAuthenticate}
        disabled={isAuthenticating}
      >
        {isAuthenticating ? "Submitting..." : "Submit"}
      </button>
      <div className="full-line" />
      <div>
        <p>
          {isRegistration
            ? "Already have an Account?"
            : "Don't have an account?"}
        </p>
        <button
          onClick={() => {
            setIsRegistration(!isRegistration);
          }}
        >
          {isRegistration ? "Log In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
