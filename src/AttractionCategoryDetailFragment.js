import { AppBar, Grid, IconButton, makeStyles, Paper, Toolbar, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MapIcon from "@material-ui/icons/Map";
import React from "react";
import { withRouter } from "react-router";
/*  */import "typeface-roboto";

const useStyles = makeStyles(theme => ({
  attractionCategoryItem: {
    textAlign: "center",
    display: "flex",
    height: "12rem",
  },
  attractionPaper: {
    flex: 1,
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "stretch",
    padding: "1rem",
  }
}));

function AttractionCategoryDetailFragment(props) {
  const classes = useStyles();
  const { match, location, history } = props;
  const { cityId, attractionCategoryId } = match.params;
  const attractionCategory = {
    name: "Must see"
  };
  const attractions = [
    {
        id: 1,
      name: "The Collosseum",
      summary: "One of the most recognizable sites in the world",
      coverPhotoUrl: "https://placeimg.com/640/480/arch?t=101",
      favorited: false,
    },
    {
        id: 2,
      name: "The Trevi Fountain",
      summary: "It was designed by architect Nicola Salvi in the 18th",
      coverPhotoUrl: "https://placeimg.com/640/480/arch?t=102",
      favorited: true,
    },
    {
        id: 3,
      name: "Castel Sant'Angelo",
      summary: "Erected on the banks of the Tiber River",
      coverPhotoUrl: "https://placeimg.com/640/480/arch?t=103",
      favorited: false,
    }
  ];

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={e => history.goBack()}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {attractionCategory.name}
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="map">
            <MapIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid
        container
        style={{margin: "4.5rem 0.5rem 0.5rem 0.5rem", alignContent: "baseline"}}
        spacing={1}
      >
        {attractions.map(attraction => (
          <Grid item key={attraction.id} xs={12} md={6} className={classes.attractionCategoryItem}>
            <Paper
              className={classes.attractionPaper}
              style={{
                backgroundImage:
                  `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${attraction.coverPhotoUrl})`
              }}
              onClick={(e) => history.push(`/cities/${cityId}/attractions/${attraction.id}`)}
            >
                <FavoriteIcon style={{alignSelf: "flex-end", color: attraction.favorited ? "red" : "inherit"}}/>
                <div style={{flex: 1}}></div>
              <Typography variant="body1" style={{textAlign: "left"}}>{attraction.name}</Typography>
              <Typography variant="caption" style={{textAlign: "left"}}>{attraction.summary}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default withRouter(AttractionCategoryDetailFragment);
