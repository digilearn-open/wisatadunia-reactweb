import { Grid, Tab, Tabs, Typography, IconButton } from "@material-ui/core";
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
import appConfig from "./appConfig.json";

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

class AttractionDetailFragment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attraction: {},
      mapViewport: {
        width: "100%",
        height: "10rem",
        zoom: 12
      }
    };
  }

  componentDidMount() {
    this.fetchAttraction();
  }

  async fetchAttraction() {
    /* const attraction = {
      name: "The Colosseum",
      attractionCategory: {
        id: 1,
        name: "Must see",
      },
      fileName: "https://placeimg.com/640/480/arch?t=101",
      favorited: true,
      description:
        `Rome’s great gladiatorial arena is the most thrilling of the city's ancient sights. 
        Inaugurated in AD 80, the 50,000-seat Colosseum, also known as the Flavian Amphitheatre, 
        was originally clad in travertine...`,
      distance: 3.5,
      duration: 15,
      rank: 2,
      location: "Piazza del Colosseo",
      timeOpen: `Monday - Sunday 8.30 am - 6.00 pm
  Saturday - Sunday 8.30 am - 7.00 pm`,
      ticket:
        "Adult/reduced incl Roman Forum & Palatino €12/7.50, SUPER ticket €18/13.50",
      phoneNumber: "06 3996 7700",
      email: "pa-colosseo@benicultural.it",
      website: "http://www.parcocolosseo.it/",
      longitude: 12.4922309,
      latitude: 41.8902102
    }; */
    const { cityId, attractionId } = this.props.match.params;
    const attractionUrl = `${appConfig.travelApiUrl}/attractions/${attractionId}?projection=attractionRelated`;
    console.info("Fetching", attractionUrl, "...");
    const resp = await fetch(attractionUrl, {method: "GET"});
    const attraction = await resp.json();
    this.setState({
      attraction: attraction,
      mapViewport: {
        ...this.state.mapViewport,
        latitude: attraction.latitude,
        longitude: attraction.longitude
      }
    });
  }

  render() {
    const { attraction } = this.state;
    const { classes, match, location, history } = this.props;
    const { cityId, attractionId } = match.params;
    const mapStyle = Object.assign({}, MAP_STYLE);
    if (attraction) {
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
    }
    return (
      <Grid container style={{ alignContent: "baseline" }}>
        <Grid
          item
          xs={12}
          className={classes.cover}
          style={{
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(https://placeimg.com/640/480/arch?t=${
              attraction.fileName
            })`
          }}
        >
          <Grid container style={{ justifyContent: "space-between" }}>
            <Grid item>
              <IconButton
                size="small"
                color="inherit"
                onClick={e => history.goBack()}
                style={{}}
              >
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton size="small">
                <FavoriteIcon color={ attraction.favorited ? "secondary" : "inherit" } />
              </IconButton>
            </Grid>
          </Grid>
          <div style={{ flexGrow: 1 }} />
          <Typography variant="h6">{attraction.name}</Typography>
          <Typography variant="caption" style={{ opacity: 0.8 }}>
            {attraction.attractionCategory && attraction.attractionCategory.name}
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
                <strong>{attraction.distance}</strong>{" "}
                <small style={{ color: "#888" }}>km</small>
              </Typography>
              <Typography variant="caption" color="textSecondary">
                DISTANCE
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <strong>~{attraction.duration}</strong>{" "}
                <small style={{ color: "#888" }}>min</small>
              </Typography>
              <Typography variant="caption" color="textSecondary">
                DURATION
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <strong style={{ color: "#f33" }}>#{attraction.rank}</strong>{" "}
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
            {attraction.location}
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
            {attraction.timeOpen}
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
            {attraction.ticket}
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: "center" }}>
          <PhoneIcon />
        </Grid>
        <Grid item xs={10} style={{ padding: "0 1rem 1rem 0" }}>
          <Typography>{attraction.phoneNumber}</Typography>
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
          <Typography>{attraction.website}</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(AttractionDetailFragment));
