import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SelectedListItem({ faults, selectedTicket }) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {faults &&
          faults.map((fault, index) => {
            return (
              <ListItem
                button
                selected={selectedIndex === index}
                onClick={(event) => {
                    handleListItemClick(event, index)
                    selectedTicket(index)
                }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                Ticket ID: <ListItemText primary={fault.faultId.toUpperCase()} />
                <ArrowForwardIosIcon />
              </ListItem>
            );
          })}
      </List>
    </div>
  );
}
