import { useState } from "react";
import Title from "../../../components/authentication/title";
import InputEmail from "../../../components/authentication/inputEmail";
import InputPassword from "../../../components/authentication/inputPassword";
import Button from "../../../components/authentication/button";
import LoginOrSignUp from "../../../components/authentication/loginOrSignUp";
import "./style.css";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function userLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Logado!");
    } catch (error) {
      console.log(error);
    }
  }

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

        <Button t={"login"} onClick={userLogin} />
        <LoginOrSignUp
          t={"Don’t have an account?"}
          p={"Sign up."}
          to={"signup"}
        />
      </div>
    </div>
  );
}
