import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ResultList from "../components/ResultList";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function CustomizedAccordions({
  sectionOne,
  sectionTwo,
  sectionThree,
  tenants,
  addedTenants
}) {
  const [expanded, setExpanded] = React.useState("panel1");
  const [search, setSearch] = useState("")
  const [recentSearches, setRecents] = useState([]);
  const [arrayholder, setArrayHolder] = React.useState(tenants);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const searchHandler = (event) => {
    const value = event.target.value
    if (value === '') {
      setRecents([])
      setSearch('')
    } else {
      setSearch(value)
      const newData = arrayholder.filter((item) => {
        const itemData = `${item.firstName.toUpperCase()}`;
        const textData = value.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setRecents(newData);
    }
  };


  return (
    <div
      style={{
        width: 800,
      }}
    >
      <div style={{
        padding: 20
      }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <TextField
            id="outlined-basic"
            fullWidth
            label="Search Tenants by name"
            variant="outlined"
            value={search}
            onChange={event => searchHandler(event)}
          />
          <ResultList tenants={recentSearches} addedTenants={(value) => addedTenants(value)}/>
        </div>
      </div>
      <Accordion
        square
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Address</Typography>
        </AccordionSummary>
        <AccordionDetails>{sectionTwo}</AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Property Unit</Typography>
        </AccordionSummary>
        <AccordionDetails>{sectionThree}</AccordionDetails>
      </Accordion>
    </div>
  );
}
