import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import Authentication from "../services/authentication";

const useStyles = makeStyles({
  root: {
    width: 900,
  },
  title: {
    margin: 20,
  },
  input: {
    margin: "0 0 20px 0",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  btn: {
    marginRight: 20,
  },
  preferencesTitle: {
    margin: "20px 0 0 0",
  },
});

export default function AccountDetailsColumn({
  user_email,
  firstname,
  lastname,
  updateProfile
}) {
  const classes = useStyles();

  const [first_name, setFirstName] = useState(firstname);
  const [last_name, setLastName] = useState(lastname);
  const [email, setEmail] = useState(user_email);
  const [isDisabled, setDisable] = useState(true);

  function fetchUserDetails() {
    Authentication.getUserDetails().then((res) => {
      setFirstName(res.data.first_name);
      setLastName(res.data.last_name);
      setEmail(res.data.account.email);
    });
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const cancel = () => {
    fetchUserDetails();
    setDisable(true);
  };

  const save = () => {
    const accountId = sessionStorage.getItem("id")
    const newUserDetails = {
      accountId: accountId,
      first_name: first_name,
      last_name: last_name,
      email: email
    }
    Authentication.updateAccountDetails(newUserDetails);
    setDisable(true);
  };

  return (
    <Paper className={classes.paper}>
      <CardContent>
        <div>
          <Typography variant="h5" noWrap>
            Account Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className={classes.details}>
                <InputLabel value="fasdfa" />
                <h4>First name</h4>
                <TextField
                  className={classes.input}
                  disabled={isDisabled}
                  value={first_name}
                  variant="outlined"
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />
                <h4>Last name</h4>
                <TextField
                  className={classes.input}
                  disabled={isDisabled}
                  value={last_name}
                  variant="outlined"
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
                <h4>Email</h4>
                <TextField
                  className={classes.input}
                  disabled={isDisabled}
                  value={email}
                  variant="outlined"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </CardContent>
      <CardActions>
        <div
          style={{
            marginLeft: 8,
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          {isDisabled ? (
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              onClick={() => setDisable(false)}
            >
              Edit
            </Button>
          ) : (
            <>
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={() => save()}
              >
                Save
              </Button>
              <Button variant="contained" color="secondary" onClick={cancel}>
                Cancel
              </Button>
            </>
          )}
        </div>
      </CardActions>
    </Paper>
  );
}
