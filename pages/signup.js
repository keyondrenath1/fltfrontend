import React, { useState } from "react";
import MaterialUISignUp from "../material-ui-components/MaterialUISignUp";
import Authentication from "../services/authentication";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();
  const [error, setErr] = useState("");
  const signUp = (newUser) => {
    Authentication.createNewUser(newUser).then((response) => {
      if (response.status === 201) {
        router.push("/signin")
      }
    }).catch(error => {
      setErr(error.response.data)
    });
  };

  return (
    <MaterialUISignUp
      signUp={(newUser) => signUp(newUser)}
      error={error}
    />
  );
}
