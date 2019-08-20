import {
  AppBar,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MapIcon from "@material-ui/icons/Map";
import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import appConfig from "./appConfig.json";

const styles = theme => ({
  attractionCategoryItem: {
    textAlign: "center",
    display: "flex"
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
    padding: "1rem",
    height: "12rem",
    textDecoration: "none"
  }
});

class AttractionCategoryDetailFragment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attractionCategory: undefined,
      attractions: []
    };
  }

  componentDidMount() {
    /* this.setState({
      attractionCategory: {
        name: "Must see"
      },
      attractions: [
        {
          id: 1,
          name: "The Collosseum",
          subtitle: "One of the most recognizable sites in the world",
          fileName: "https://placeimg.com/640/480/arch?t=101",
          favorited: false
        },
        {
          id: 2,
          name: "The Trevi Fountain",
          subtitle: "It was designed by architect Nicola Salvi in the 18th",
          fileName: "https://placeimg.com/640/480/arch?t=102",
          favorited: true
        },
        {
          id: 3,
          name: "Castel Sant'Angelo",
          subtitle: "Erected on the banks of the Tiber River",
          fileName: "https://placeimg.com/640/480/arch?t=103",
          favorited: false
        }
      ]
    }); */
    this.fetchAttractionCategory();
    this.fetchAttractions();
  }

  async fetchAttractionCategory() {
    const { cityId, attractionCategoryId } = this.props.match.params;
    const attractionCategoryUrl = `${
      appConfig.travelApiUrl
    }/attractionCategories/${attractionCategoryId}`;
    console.info("Fetching", attractionCategoryUrl, "...");
    const resp = await fetch(attractionCategoryUrl, { method: "GET" });
    const json = await resp.json();
    this.setState({
      attractionCategory: json
    });
  }

  async fetchAttractions() {
    const { cityId, attractionCategoryId } = this.props.match.params;
    const searchUrl = `${
      appConfig.travelApiUrl
    }/attractions/search/findAllByCityIdAndAttractionCategoryId?cityId=${cityId}&attractionCategoryId=${attractionCategoryId}`;
    console.info("Fetching", searchUrl, "...");
    const resp = await fetch(searchUrl, { method: "GET" });
    const json = await resp.json();
    this.setState({
      attractions: json._embedded.attractions
    });
  }

  render() {
    const { classes, match, location, history } = this.props;
    const { attractionCategory, attractions } = this.state;
    const { cityId, attractionCategoryId } = match.params;
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
              {attractionCategory && attractionCategory.name}
            </Typography>
            <IconButton edge="end" color="inherit" aria-label="map">
              <MapIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid
          container
          style={{
            margin: "4.5rem 0.5rem 0.5rem 0.5rem",
            alignContent: "baseline"
          }}
          spacing={1}
        >
          {attractions.map(attraction => (
            <Grid
              item
              key={attraction.id}
              xs={12}
              md={6}
              className={classes.attractionCategoryItem}
            >
              <Paper
                component={Link}
                to={`/cities/${cityId}/attractions/${attraction.id}`}
                className={classes.attractionPaper}
                style={{
                  backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(https://placeimg.com/640/480/arch?t=${
                    attraction.fileName
                  })`
                }}
              >
                <FavoriteIcon
                  color={attraction.favorited ? "secondary" : "inherit"}
                  style={{ alignSelf: "flex-end" }}
                />
                <div style={{ flex: 1 }} />
                <Typography variant="body1" style={{ textAlign: "left" }}>
                  {attraction.name}
                </Typography>
                <Typography variant="caption" style={{ textAlign: "left" }}>
                  {attraction.subtitle}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(AttractionCategoryDetailFragment));
