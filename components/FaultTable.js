import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Authentication from '../services/authentication'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function FaultTable({ faults, markCompleted }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fault ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Property ID</TableCell>
            <TableCell>Reporter</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {faults && faults.map((fault) => (
            <TableRow key={fault.id}>
              <TableCell component="th" scope="row">
                {fault.faultId.toUpperCase()}
              </TableCell>
              <TableCell>{fault.type}</TableCell>
              <TableCell>{fault.propId}</TableCell>
              <TableCell>{fault.reporterName}</TableCell>
              <TableCell>{fault.status}</TableCell>
              <TableCell>
                {fault.status === "DONE" ? (
                  <Button
                    disabled
                    style={{
                      marginRight: 10,
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Completed
                  </Button>
                ) : (
                  <Button
                    style={{
                      marginRight: 10,
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() => markCompleted(fault.faultId)}
                  >
                    Mark Completed
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
