import { AppBar, Grid, IconButton, makeStyles, Paper, Toolbar, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MapIcon from "@material-ui/icons/Map";
import React from "react";
import { withRouter } from "react-router";
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

function AttractionsFragment(props) {
  const classes = useStyles();
  const { match, location, history } = props;
  const { cityId } = match.params;

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back" onClick={(e) => history.goBack()}>
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
        style={{ padding: "4.5rem 0.5rem 0.5rem 0.5rem", flex: 1 }}
        spacing={1}
      >
        <Grid item xs={12} className={classes.attractionCategoryItem}>
          <Paper className={classes.attractionCategoryPaper}
            style={{backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(https://placeimg.com/640/480/arch?t=1)'}}
            onClick={(e) => history.push("/cities/1/attractionCategories/1")}>
                Must see</Paper>
        </Grid>
        <Grid item xs={6} md={3} className={classes.attractionCategoryItem}>
          <Paper className={classes.attractionCategoryPaper}
            style={{backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(https://placeimg.com/640/480/arch?t=2)'}}
            onClick={(e) => history.push("/cities/1/attractionCategories/2")}>
                Cultural</Paper>
        </Grid>
        <Grid item xs={6} md={3} className={classes.attractionCategoryItem}>
          <Paper className={classes.attractionCategoryPaper}
            style={{backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(https://placeimg.com/640/480/arch?t=3)'}}
            onClick={(e) => history.push("/cities/1/attractionCategories/3")}>
            Architecture
          </Paper>
        </Grid>
        <Grid item xs={6} md={3} className={classes.attractionCategoryItem}>
          <Paper className={classes.attractionCategoryPaper}
            style={{backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(https://placeimg.com/640/480/arch?t=4)'}}
            onClick={(e) => history.push("/cities/1/attractionCategories/4")}>
            Southern Rome
          </Paper>
        </Grid>
        <Grid item xs={6} md={3} className={classes.attractionCategoryItem}>
          <Paper className={classes.attractionCategoryPaper}
            style={{backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(https://placeimg.com/640/480/arch?t=5)'}}
            onClick={(e) => history.push("/cities/1/attractionCategories/5")}>
                Museums</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(AttractionsFragment);