import { useState } from "react";
import Title from "../../../components/authentication/title";
import InputEmail from "../../../components/authentication/inputEmail";
import InputPassword from "../../../components/authentication/inputPassword";
import Button from "../../../components/authentication/button";
import LoginOrSignUp from "../../../components/authentication/loginOrSignUp";
import "./style.css";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function CreateAccount() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      alert("Criado com sucesso!");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="signup-b">
      <div
        style={{
          gap: "5%",
          display: "flex",
          flexDirection: "column",
          width: "22%",
        }}
      >
        <Title t={"Create Account"} p={"Fill in the fields below!"} />

        <div style={{ gap: 15, display: "flex", flexDirection: "column" }}>
          <InputEmail
            t={"Name"}
            p={"Name"}
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
          />
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
        </div>

        <Button t={"sign up"} onClick={CreateAccount} />
        <LoginOrSignUp t={"Already have a account?"} p={"Login."} to={"/"} />
      </div>
    </div>
  );
}
