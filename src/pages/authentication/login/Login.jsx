import { useState, useEffect } from "react";
import Title from "../../../components/authentication/title";
import InputEmail from "../../../components/authentication/inputEmail";
import InputPassword from "../../../components/authentication/inputPassword";
import Button from "../../../components/authentication/button";
import LoginOrSignUp from "../../../components/authentication/loginOrSignUp";
import { CircularProgress } from "@mui/material";
import "./style.css";
import { Alert } from "@mui/material";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [userNot, setUserNot] = useState(false);
  const [err, setErr] = useState("");

  const [sucess, setSucess] = useState(false);

  const validation = !loading ? (
    "login"
  ) : (
    <CircularProgress color="#ffffff" size={22} />
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
      setUserNot(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [alert, err]);

  async function userLogin() {
    if (email === "" || password === "") {
      setLoading(true);

      const timer = setTimeout(() => {
        setLoading(false);
        setAlert(true);
      }, 2000);

      return () => clearTimeout(timer);
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSucess(true);
    } catch (error) {
      setUserNot(true);
      setErr(error.code);
      // console.log(error);
    }
  }

  console.log(err);

  return (
    <div className="login-b">
      <div
        style={{
          gap: "5%",
          display: "flex",
          flexDirection: "column",
          width: "22%",
        }}
      >
        <Title t={"Welcome back"} p={"Please, enter your details!"} />

        <div style={{ gap: 15, display: "flex", flexDirection: "column" }}>
          <InputEmail
            t={"Email"}
            p={"Enter your email"}
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          <InputPassword
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
          />
          <p style={{ fontSize: 13, textAlign: "right", cursor: "pointer" }}>
            Forgot password?
          </p>
        </div>

        <Button t={validation} onClick={userLogin} />
        <LoginOrSignUp
          t={"Don’t have an account?"}
          p={"Sign up."}
          to={"signup"}
        />
      </div>

      {alert && (
        <Alert
          hidden={alert}
          severity="warning"
          onClose={() => {
            setAlert(false);
          }}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          Please fill in all the information!
        </Alert>
      )}

      {/* {s && (
        <Alert
          hidden={alert}
          severity="success"
          onClose={() => setAlert(false)}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          Logged in successfully!
        </Alert>
      )} */}

      {userNot && (
        <Alert
          hidden={alert}
          severity="error"
          onClose={() => setUserNot(false)}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          {err}
        </Alert>
      )}
    </div>
  );
}
