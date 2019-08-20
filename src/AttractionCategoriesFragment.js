import React, { Component } from "react";
import {
  AppBar,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  withStyles,
  Box
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MapIcon from "@material-ui/icons/Map";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import appConfig from "./appConfig.json";

const styles = theme => ({
  attractionCategoryItem: {
    textAlign: "center",
    display: "flex",
  },
  attractionCategoryPaper: {
    flex: 1,
    height: "12rem",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
  }
});

class AttractionCategoriesFragment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attractionCategories: []
    };
  }

  componentDidMount() {
    /* this.setState({
      attractionCategories: [
        {
          id: 3,
          name: "Must see"
        },
        {
          id: 4,
          name: "Cultural"
        },
        {
          id: 5,
          name: "Architecture"
        },
        {
          id: 6,
          name: "Southern Rome"
        },
        {
          id: 7,
          name: "Museums"
        }
      ]
    }); */
    this.fetchAttractionCategories();
  }

  async fetchAttractionCategories() {
    const resp = await fetch(`${appConfig.travelApiUrl}/attractionCategories`, {method: "GET"});
    const json = await resp.json();
    this.setState({
      attractionCategories: json._embedded.attractionCategories,
    });
  }

  render() {
    const { classes, match, location, history } = this.props;
    const { cityId } = match.params;
    const { attractionCategories } = this.state;
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
              Attractions
            </Typography>
            <IconButton edge="end" color="inherit" aria-label="map">
              <MapIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid
          container
          style={{ margin: "4.5rem 0.5rem 0.5rem 0.5rem", alignContent: "baseline" }}
          spacing={1}
        >
          {attractionCategories.map(attractionCategory => (
            <Grid
              item
              key={attractionCategory.id}
              xs={6}
              className={classes.attractionCategoryItem}
            >
              <Paper
                component={Link}
                to={`/cities/${cityId}/attractionCategories/${attractionCategory.id}`}
                className={classes.attractionCategoryPaper}
                style={{
                  backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(https://placeimg.com/640/480/arch?t=${
                    attractionCategory.id
                  })`
                }}
              >
                {attractionCategory.name}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(AttractionCategoriesFragment));
