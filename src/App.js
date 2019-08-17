import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import "typeface-roboto";
import "./App.css";
import { HomeScreen } from "./HomeScreen";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    // display: "flex",
    // flexDirection: "column",
    // flex: 1,
    // flexGrow: 1,
    // height: "100%",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <HomeScreen/>
    </Container>
  );
}

export default App;
