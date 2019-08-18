import { Grid, Tab, Tabs, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EmailIcon from "@material-ui/icons/Email";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InfoIcon from "@material-ui/icons/Info";
import LinkIcon from "@material-ui/icons/Link";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import NearMeIcon from "@material-ui/icons/NearMe";
import PhoneIcon from "@material-ui/icons/Phone";
import PlaceIcon from "@material-ui/icons/Place";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import ReactMapGL from "react-map-gl";
import { withRouter } from "react-router";
import "typeface-roboto";
import MAP_STYLE from "./map-style-basic-v8.json";

const styles = theme => ({
  cover: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    padding: "1rem",
    height: "10rem",
    display: "flex",
    flexDirection: "column"
  }
});

const mapboxApiAccessToken =
  "pk.eyJ1IjoiaGVuZHlpcmF3YW4iLCJhIjoiY2l3cnpvNmRqMTVjcDJ6cXpxb2UxejVnbSJ9.ePnKula0P6I1BhiySWkG1w";

class AttractionDetailFragment extends React.PureComponent {
  constructor(props) {
    super(props);
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
      ticketInfo:
        "Adult/reduced incl Roman Forum & Palatino €12/7.50, SUPER ticket €18/13.50",
      phone: "06 3996 7700",
      email: "pa-colosseo@benicultural.it",
      url: "http://www.parcocolosseo.it/",
      longitude: 12.4922309,
      latitude: 41.8902102
    };
    this.state = {
      attraction: attraction,
      mapViewport: {
        width: "100%",
        height: "10rem",
        latitude: attraction.latitude,
        longitude: attraction.longitude,
        zoom: 12
      }
    };
  }

  render() {
    const { attraction } = this.state;
    const { classes, match, location, history } = this.props;
    const { cityId, attractionId } = match.params;
    const mapStyle = Object.assign({}, MAP_STYLE);
    mapStyle.sources = {
      ...mapStyle.sources,
      attraction: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [attraction.longitude, attraction.latitude]
              },
              properties: {
                title: attraction.name,
                icon: "marker"
              }
            }
          ]
        }
      }
    };
    mapStyle.layers = [
      ...MAP_STYLE.layers,
      {
        id: "attraction-layer",
        type: "symbol",
        source: "attraction",
        layout: {
          "icon-image": "{icon}-15",
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top"
        }
      }
    ];
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
              <ArrowBackIcon onClick={e => history.goBack()} />
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
        <Grid item xs={12} style={{ padding: "1rem" }}>
          <Typography variant="caption">{attraction.description}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ padding: "0 1rem 1rem 0", textAlign: "center" }}
        >
          <Typography variant="button">MORE</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            borderTop: "1px solid #ccc",
            borderBottom: "1px solid #ccc",
            padding: "0.5rem 0"
          }}
        >
          <Grid container style={{ justifyContent: "space-evenly" }}>
            <Grid item>
              <Typography>
                <strong>14.2</strong>{" "}
                <small style={{ color: "#888" }}>km</small>
              </Typography>
              <Typography variant="caption" color="textSecondary">
                DISTANCE
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <strong>~15</strong>{" "}
                <small style={{ color: "#888" }}>min</small>
              </Typography>
              <Typography variant="caption" color="textSecondary">
                DURATION
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <strong style={{ color: "#f33" }}>#2</strong>{" "}
                <small style={{ color: "#888" }}>/ 50</small>
              </Typography>
              <Typography variant="caption" color="textSecondary">
                RANK
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: "1rem" }}>
          <ReactMapGL
            {...this.state.mapViewport}
            mapboxApiAccessToken={mapboxApiAccessToken}
            mapStyle={mapStyle}
            scrollZoom={false}
            doubleClickZoom={false}
            touchZoom={false}
            dragPan={false}
            dragRotate={false}
            onViewportChange={viewport => {
              const { width, height, latitude, longitude, zoom } = viewport;
              // Optionally call `setState` and use the state to update the map.
              // this.setState({ mapViewport: viewport });
            }}
          />
        </Grid>
        <Grid item xs={2} style={{ textAlign: "center" }}>
          <PlaceIcon />
        </Grid>
        <Grid item xs={10} style={{ padding: "0 1rem 1rem 0" }}>
          <Typography
            color="textSecondary"
            style={{
              whiteSpace: "pre-line",
              fontSize: "80%"
            }}
          >
            {attraction.locationName}
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: "center" }}>
          <AccessTimeIcon />
        </Grid>
        <Grid item xs={10} style={{ padding: "0 1rem 1rem 0" }}>
          <Typography
            color="textSecondary"
            style={{
              whiteSpace: "pre-line",
              fontSize: "80%"
            }}
          >
            {attraction.openInfo}
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: "center" }}>
          <LoyaltyIcon />
        </Grid>
        <Grid item xs={10} style={{ padding: "0 1rem 1rem 0" }}>
          <Typography
            color="textSecondary"
            style={{
              whiteSpace: "pre-line",
              fontSize: "80%"
            }}
          >
            {attraction.ticketInfo}
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: "center" }}>
          <PhoneIcon />
        </Grid>
        <Grid item xs={10} style={{ padding: "0 1rem 1rem 0" }}>
          <Typography>{attraction.phone}</Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: "center" }}>
          <EmailIcon />
        </Grid>
        <Grid item xs={10} style={{ padding: "0 1rem 1rem 0" }}>
          <Typography>{attraction.email}</Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: "center" }}>
          <LinkIcon />
        </Grid>
        <Grid item xs={10} style={{ padding: "0 1rem 1rem 0" }}>
          <Typography>{attraction.url}</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(AttractionDetailFragment));
