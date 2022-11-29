import { useEffect } from "react";
import { setBootstrap } from "../redux/slices/bootstrap";
import store from '../redux/store'
import Authentication from '../services/authentication'
import "../styles/globals.css";
import { useSelector, useDispatch, Provider } from "react-redux";

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}