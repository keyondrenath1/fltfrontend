import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme =>
  createStyles({ 
    mainRoot: {
        padding: 20
    },
    root: {
      borderColor: "#E7E8F2",
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      height: 200,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      color: "#01058A",
      fontSize: 17,
      fontFamily: "Helvetica Neue",
      fontWeight: 500,
      userSelect: "none",
    },
  })
);

export default function WidgetHeader({ label, handler, ...props }) {
  const classes = useStyles();
  const rootClass = classes.root;
  const titleClass = classes.title
  return (
    <Card variant="outlined" className={rootClass}>
      <p>{label}</p>
      <Button variant="contained" onClick={handler}>Add Property</Button>
    </Card>
  );
}