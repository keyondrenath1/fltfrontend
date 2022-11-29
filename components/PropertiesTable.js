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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable({ properties }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Property ID</TableCell>
            <TableCell>Street Address</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Post Code</TableCell>
            {/* <TableCell>Action</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell component="th" scope="row">
                {property.id}
              </TableCell>
              <TableCell>{property.address.streetAddress}</TableCell>
              <TableCell>{property.address.city}</TableCell>
              <TableCell>{property.address.postCode}</TableCell>
              {/* <TableCell>{property.propertyUnit.propertyDescription}</TableCell> */}
              {/* <TableCell>
                <Button
                  style={{
                    marginRight: 10,
                  }}
                  variant="contained"
                  color="primary"
                >
                  Edit
                </Button>
                <Button variant="contained" color="primary">
                  Delete
                </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
