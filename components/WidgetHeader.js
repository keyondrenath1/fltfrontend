import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from '@material-ui/icons/AddBox';
const useStyles = makeStyles(theme =>
  createStyles({ 
    mainRoot: {
        padding: 20
    },
    root: {
      borderColor: "#E7E8F2",
      borderBottomColor: '#26272B',
      borderBottomWidth: 0,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
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
      <CardHeader
        title={label}
        classes={{
          title: titleClass,
          root: classes.mainRoot
        }}
        action={handler && 
          <IconButton aria-label="settings" onClick={handler}>
            <AddBoxIcon style={{ color: "#A7A9C0", fontSize: 30 }} />
          </IconButton>
        }
      />
    </Card>
  );
}