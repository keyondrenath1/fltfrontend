import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Authentication from '../services/authentication'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  profileImg: {
    borderRadius: "50%",
    margin: 20
  },
}));

export default function ProfileColumn({email}) {
  const classes = useStyles();
  const [profileImg, setProfileImg] = useState("");
  
  useEffect(() => {
    const url = sessionStorage.getItem("profileImgUrl")
    setProfileImg(url)
  }, []);

  return (
    <Paper className={classes.paper}>
      <img src={profileImg} className={classes.profileImg} />
      <Typography variant="h5" noWrap>
        Landlord
      </Typography>
    </Paper>
  );
}
