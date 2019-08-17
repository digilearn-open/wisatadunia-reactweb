import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Grid,
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Paper
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PlaceIcon from "@material-ui/icons/Place";
import WorkIcon from "@material-ui/icons/Work";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MapIcon from "@material-ui/icons/Map";
import React from "react";
import "typeface-roboto";
import "./App.css";

const useStyles = makeStyles(theme => ({
  attractionCategoryItem: {
    textAlign: "center"
  },
  attractionCategoryPaper: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export function AttractionsFragment() {
  const classes = useStyles();

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Attractions
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="map">
            <MapIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid
        container
        style={{ padding: "4rem 0.5rem 0.5rem 0.5rem", flex: 1 }}
        spacing={1}
      >
        <Grid item xs={12} className={classes.attractionCategoryItem}>
          <Paper className={classes.attractionCategoryPaper}
            style={{backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(https://placeimg.com/640/480/arch?t=1)'}}>
                Must see</Paper>
        </Grid>
        <Grid item xs={6} md={3} className={classes.attractionCategoryItem}>
          <Paper className={classes.attractionCategoryPaper}
            style={{backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(https://placeimg.com/640/480/arch?t=2)'}}>
                Cultural</Paper>
        </Grid>
        <Grid item xs={6} md={3} className={classes.attractionCategoryItem}>
          <Paper className={classes.attractionCategoryPaper}
            style={{backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(https://placeimg.com/640/480/arch?t=3)'}}>
            Architecture
          </Paper>
        </Grid>
        <Grid item xs={6} md={3} className={classes.attractionCategoryItem}>
          <Paper className={classes.attractionCategoryPaper}
            style={{backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(https://placeimg.com/640/480/arch?t=4)'}}>
            Southern Rome
          </Paper>
        </Grid>
        <Grid item xs={6} md={3} className={classes.attractionCategoryItem}>
          <Paper className={classes.attractionCategoryPaper}
            style={{backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(https://placeimg.com/640/480/arch?t=5)'}}>
                Museums</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
