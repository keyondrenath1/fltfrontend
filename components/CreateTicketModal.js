import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Accordion from "./Accordion";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Authentication from "../services/authentication";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 450,
    padding: 20,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    paddingBottom: 30,
    fontWeight: 500,
    border: "1px solid black",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  createBtn: {
    backgroundColor: "green",
    color: "white",
    padding: 15,
    width: 150,
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CreateTicketModal({
  open,
  handleClose,
  setFaultType,
  setDesc,
  fetch,
  error
}) {
  const classes = useStyles();

  const addNewProperty = () => {
    const accountId = sessionStorage.getItem("id");
    // Authentication.createProperty(payload).then((res) => {
    //   handleClose();
    // });
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    const faultType = event.target.value;
    setAge(faultType);
    setFaultType(faultType);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Typography variant="h3" component="h1" className={classes.heading}>
            Create a Ticket
          </Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Fault Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={age}
              onChange={handleChange}
              label="Fault Type"
            >
              <MenuItem value={"PLUMBING"}>PLUMBING</MenuItem>
              <MenuItem value={"PAINT_WORK"}>PAINT WORK</MenuItem>
              <MenuItem value={"ELECTRICAL"}>ELECTRICAL</MenuItem>
              <MenuItem value={"GAS"}>GAS</MenuItem>
              <MenuItem value={"ROOF"}>ROOF</MenuItem>
              <MenuItem value={"CHIMNEY"}>CHIMNEY</MenuItem>
              <MenuItem value={"DRAINAGE"}>DRAINAGE</MenuItem>
              <MenuItem value={"WINDOWS"}>WINDOWS</MenuItem>
              <MenuItem value={"DAMP"}>DAMP</MenuItem>
              <MenuItem value={"GARDEN"}>GARDEN</MenuItem>
              <MenuItem value={"WOOD_WORK"}>WOOD WORK</MenuItem>
              <MenuItem value={"BOILER"}>BOILER</MenuItem>
              <MenuItem value={"BEDDING"}>BEDDING</MenuItem>
              <MenuItem value={"SOFA"}>SOFA</MenuItem>
              <MenuItem value={"TV"}>TV</MenuItem>
              <MenuItem value={"HEATING"}>HEATING</MenuItem>
              <MenuItem value={"SMOKE_ALARM"}>SMOKE ALARM</MenuItem>
              <MenuItem value={"DISH_WASHER"}>DISH WASHER</MenuItem>
              <MenuItem value={"WASHING_MACHINE"}>WASHING MACHINE</MenuItem>
            </Select>
          </FormControl>
          <TextField
            style={{
              width: "100%",
              marginTop: 25,
            }}
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={8}
            variant="outlined"
            onChange={(event) => {
              setDesc(event.target.value)
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ width: "100%", marginTop: 25 }}
            onClick={fetch}
          >
            Create
          </Button>
          <p style={{
            textAlign: 'center',
            color: 'red'
          }}>{error}</p>
        </div>
      </Fade>
    </Modal>
  );
}
