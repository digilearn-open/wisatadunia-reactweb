import {
  AppBar,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
  Tab,
  Tabs
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MapIcon from "@material-ui/icons/Map";
import InfoIcon from "@material-ui/icons/Info";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import NearMeIcon from "@material-ui/icons/NearMe";
import React from "react";
import { withRouter } from "react-router";
import "typeface-roboto";
import "./App.css";

const useStyles = makeStyles(theme => ({
  cover: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    padding: "1rem",
    height: "12rem",
    display: "flex",
    flexDirection: "column"
  }
}));

function AttractionDetailFragment(props) {
  const classes = useStyles();
  const { match, location, history } = props;
  const { cityId, attractionId } = match.params;
  const attraction = {
    name: "The Colosseum",
    attractionCategoryId: 1,
    attractionCategoryName: "Must see",
    coverPhotoUrl: "https://placeimg.com/640/480/arch?t=101",
    favorited: true,
    description:
      "Rome’s great gladiatorial arena is the most thrilling of the city's ancient sights. Inaugurated in AD 80, the 50,000-seat Colosseum, also known as the Flavian Amphitheatre, was originally clad in travertine...",
    locationName: "Piazza del Colosseo",
    openInfo: `Monday - Sunday 8.30 am - 6.00 pm
Saturday - Sunday 8.30 am - 7.00 pm`,
    ticketInfo: "Adult/reduced incl Roman Forum & Palatino €12/7.50, SUPER ticket €18/13.50",
    phone: "06 3996 7700",
    email: "pa-colosseo@benicultural.it",
    url: "http://www.parcocolosseo.it/",
  };

  return (
    <Grid container style={{ alignContent: "baseline" }}>
      <Grid
        item
        xs={12}
        className={classes.cover}
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${
            attraction.coverPhotoUrl
          })`
        }}
      >
        <Grid container style={{ justifyContent: "space-between" }}>
          <Grid item>
            <ArrowBackIcon onClick={(e) => history.goBack()} />
          </Grid>
          <Grid item>
            <FavoriteIcon
              style={{ color: attraction.favorited ? "red" : "inherit" }}
            />
          </Grid>
        </Grid>
        <div style={{ flexGrow: 1 }} />
        <Typography variant="h6">{attraction.name}</Typography>
        <Typography variant="caption" style={{ opacity: 0.8 }}>
          {attraction.attractionCategoryName}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Tabs
          value="info"
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab value="info" icon={<InfoIcon />} label="Information" />
          <Tab value="audio" icon={<PlayCircleOutlineIcon />} label="Audio" />
          <Tab value="nearby" icon={<NearMeIcon />} label="Nearby" />
        </Tabs>
      </Grid>
      <Grid item xs={12} style={{padding: "1rem"}}>
        <Typography variant="caption">{attraction.description}</Typography>
      </Grid>
      <Grid item xs={12} style={{padding: "0 1rem 1rem 0", textAlign: "center"}}>
        <Typography variant="button">MORE</Typography>
      </Grid>
      <Grid item xs={12} style={{borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc", padding: "0.5rem 0"}}>
        <Grid container style={{justifyContent: "space-evenly"}}>
            <Grid item>
                <Typography><strong>14.2</strong> <small style={{color: "#888"}}>km</small></Typography>
                <Typography variant="caption" color="textSecondary">DISTANCE</Typography>
            </Grid>
            <Grid item>
                <Typography><strong>~15</strong> <small style={{color: "#888"}}>min</small></Typography>
                <Typography variant="caption" color="textSecondary">DURATION</Typography>
            </Grid>
            <Grid item>
                <Typography><strong style={{color: "#f33"}}>#2</strong> <small style={{color: "#888"}}>/ 50</small></Typography>
                <Typography variant="caption" color="textSecondary">RANK</Typography>
            </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{marginBottom: "1rem"}}>
          Map here
      </Grid>
      <Grid item xs={2} style={{textAlign: "center"}}>
          <FavoriteIcon/>
      </Grid>
      <Grid item xs={10}>
          <Typography color="textSecondary" style={{marginBottom: "0.5rem", whiteSpace: "pre-line", fontSize: "80%"}}>{attraction.locationName}</Typography>
      </Grid>
      <Grid item xs={2} style={{textAlign: "center"}}>
          <FavoriteIcon/>
      </Grid>
      <Grid item xs={10}>
          <Typography color="textSecondary" style={{marginBottom: "0.5rem", whiteSpace: "pre-line", fontSize: "80%"}}>{attraction.openInfo}</Typography>
      </Grid>
      <Grid item xs={2} style={{textAlign: "center"}}>
          <FavoriteIcon/>
      </Grid>
      <Grid item xs={10}>
          <Typography color="textSecondary" style={{marginBottom: "0.5rem", whiteSpace: "pre-line", fontSize: "80%"}}>{attraction.ticketInfo}</Typography>
      </Grid>
      <Grid item xs={2} style={{textAlign: "center"}}>
          <FavoriteIcon/>
      </Grid>
      <Grid item xs={10}>
          <Typography style={{marginBottom: "0.5rem"}}>{attraction.phone}</Typography>
      </Grid>
      <Grid item xs={2} style={{textAlign: "center"}}>
          <FavoriteIcon/>
      </Grid>
      <Grid item xs={10}>
          <Typography style={{marginBottom: "0.5rem"}}>{attraction.email}</Typography>
      </Grid>
      <Grid item xs={2} style={{textAlign: "center"}}>
          <FavoriteIcon/>
      </Grid>
      <Grid item xs={10}>
          <Typography style={{marginBottom: "0.5rem"}}>{attraction.url}</Typography>
      </Grid>
    </Grid>
  );
}

export default withRouter(AttractionDetailFragment);
