import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import "typeface-roboto";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeFragment from "./HomeFragment";
import AttractionsFragment from "./AttractionsFragment";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    width: "100%"
    // display: "flex",
    // flexDirection: "column",
    // flex: 1,
    // flexGrow: 1,
    // height: "100%",
  }
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <Container className={classes.root}>
        <Route exact path="/" component={HomeFragment} />
        <Route path="/attractions" component={AttractionsFragment} />
      </Container>
    </Router>
  );
}

export default App;
