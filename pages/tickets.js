import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import WidgetHeader from "../components/WidgetHeader";
import EmptyTable from "../components/EmptyTable";
import CreatePropertyModal from "../components/CreatePropertyModal";
import FaultTable from "../components/FaultTable";
import Authentication from "../services/authentication";
import Button from "@material-ui/core/Button";
import CreateTicketModal from "../components/CreateTicketModal";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MaterialUiList from "../material-ui-components/MaterialUiList";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Tickets() {
  const [enabled, setEnabled] = useState(false);
  const [faults, setFaults] = useState([]);
  const [open, setOpen] = useState(false);
  const [faultType, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [selected, setSelectedIndex] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    const enabled = sessionStorage.getItem("enabled");
    setEnabled(enabled);
    fetchTickets();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createTicket = () => {
    const payload = {
      faultType: faultType,
      description: desc,
      user: sessionStorage.getItem("user"),
    };
    Authentication.createFault(payload)
      .then((res) => {
        setOpen(false);
        fetchTickets();
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  function fetchTickets() {
    Authentication.getFaultsByTenant().then((res) => {
      setFaults(res.data);
    });
  }

  return (
    <DashboardLayout>
      {[].length !== 0 && (
        <div
          style={{
            textAlign: "center",
            marginTop: 50,
          }}
        >
          <p>You have not created any tickets yet.</p>
          <Button variant="contained" onClick={handleOpen}>
            Create Ticket
          </Button>
        </div>
      )}
      <CreateTicketModal
        open={open}
        handleClose={handleClose}
        setFaultType={(faultType) => setType(faultType)}
        setDesc={(desc) => setDesc(desc)}
        fetch={createTicket}
        error={error}
      />
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
        }}
        container
        spacing={2}
      >
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Button variant="contained" fullWidth onClick={handleOpen}>
              Create Fault
            </Button>
            <MaterialUiList
              faults={faults}
              selectedTicket={(value) => setSelectedIndex(value)}
            />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            {faults &&
              faults.map((fault, index) => {
                debugger;
                if (index === selected) {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "left",
                      }}
                    >
                      <TextField
                        disabled
                        id="outlined-basic"
                        label="Fault Type"
                        value={fault.type}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        disabled
                        style={{
                          width: "100%",
                          marginTop: 25,
                        }}
                        label="Description"
                        value={fault.description}
                        id="outlined-multiline-static"
                        multiline
                        rows={8}
                        variant="outlined"
                      />
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}>
                        <p><strong>Status: </strong></p>
                        {fault.completed ? <p style={{marginLeft: 10, color:'green'}}>Completed</p>: <p style={{marginLeft: 10, color:'red'}}>In progress</p>}
                      </div>
                    </div>
                  );
                }
              })}
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
