import React, { useState } from "react";
import MaterialUISignIn from "../material-ui-components/MaterialUISignIn";
import Authentication from "../services/authentication";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setBootstrap } from "../redux/slices/bootstrap";
import axios from "axios";

export default function SignIn({ history }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setErr] = useState("")

  const signIn = (email, password) => {
    Authentication.login(email, password)
      .then((response) => {
        Authentication.create_login_session(response.data);
        dispatch(setBootstrap(response.data));
        const path = response.data.accountType === "TENANT" ? "/tickets" : "/dashboard"
        router.push(path);
      })
      .catch((error) => {
        setErr(error.response.data)
        console.log("Login Failed", error);
      });

      axios.get("https://randomuser.me/api/").then((res) => {
        const url = res.data.results[0].picture.large;
        sessionStorage.setItem("profileImgUrl", url)
      });
  };

  return (
      <MaterialUISignIn signIn={(email, password) => signIn(email, password)} error={error} />
  );
}
