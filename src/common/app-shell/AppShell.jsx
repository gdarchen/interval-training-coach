import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    textAlign: "left"
  },
  link: {
    color: "unset",
    textDecoration: "unset"
  }
}));

const AppShell = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link to="/" className={classes.link}>
            Interval training coach
          </Link>
        </Typography>

        <Button color="inherit">
          <Link to="/credits" className={classes.link}>
            Credits
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppShell;
