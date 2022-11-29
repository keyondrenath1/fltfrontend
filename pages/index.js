import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import LandingGrid1 from "../grids/LandingGrid1";
import Typography from "@material-ui/core/Typography";

export default function Home() {
  return <LandingGrid1 column4={<Info />} column42={<img style={{
    height: 200
  }} src="https://cdns3static.estateweb.com/assets/8242/contentimages/rsz_istock-610747286.jpg"/>}/>;
}

const Info = () => {
  return (
    <>
      <Typography component="h2" variant="h4">
        Maintennance Software, Made Easy.
      </Typography>
      <Typography component="h5" variant="body2">
        This is a one-stop platform to achieve clear and simple maintenance
        management for your property
      </Typography>
    </>
  );
};
