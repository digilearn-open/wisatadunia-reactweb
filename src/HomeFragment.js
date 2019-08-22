import { BottomNavigation, BottomNavigationAction, Box, Grid, Typography, withStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PlaceIcon from "@material-ui/icons/Place";
import WorkIcon from "@material-ui/icons/Work";
import { format, utcToZonedTime } from "date-fns-tz";
import React from "react";
import { withRouter } from "react-router";
import "typeface-roboto";
import "./App.css";

const styles = theme => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    flex: "1 1 100%"
    // height: "80%",
  }
});

class HomeFragment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityId: 1,
      city: {},
      backgroundImageUrl: undefined,
    };
  }

  componentDidMount() {
    setTimeout(() => this.fetchCity(), 2000);
    /* setTimeout(() => this.setState(
      {
        city: {
          ...this.state.city,
          name: "Padang"
        }
      })
    , 5000); */
  }

  async fetchCity() {
    this.setState({
      city: {
        "id": 1,
        "name": "Bukittinggi",
        "shortDesc": "is a historical powerhouse",
        "timeZone": "Europe/Rome",
        "fileName": "rome.jpg",
        "temperatureCelsius": -2.0,
        "weather": "Scattered clouds",
        "country": {
          "id": "ID",
          "name": "Indonesia"
        },
        "_links": {
          "self": {
            "href": "http://localhost:8080/cities/1"
          },
          "city": {
            "href": "http://localhost:8080/cities/1{?projection}",
            "templated": true
          },
          "country": {
            "href": "http://localhost:8080/cities/1/country"
          }
        }
      },
      backgroundImageUrl: "https://placeimg.com/640/480/arch?t=11",
    });
  }

  render() {
    const { classes, match, location, history } = this.props;
    // sama aja: const city = this.state.city;
    const { city } = this.state;
    const cityTime = format(utcToZonedTime(new Date(), city.timeZone), "hh:mm aa");
    const cityDate = format(utcToZonedTime(new Date(), city.timeZone), "MMM d, yyyy");

    return (
      <Box
        style={{display: "flex", flexDirection: "column", height: "100%", width: "100%"}}>

        <Grid container direction="column" justify="space-around" alignItems="center"
          style={{height: "100%", 
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ),
              url(${this.state.backgroundImageUrl})`}}
          className={classes.mainFeaturedPost}>
          <Grid item style={{ flex: 2 }} />
          <Grid item>
            <Typography variant="subtitle1" style={{ textTransform: "uppercase" }}>
              {city.country && city.country.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3" style={{ textTransform: "uppercase" }}>
              {city.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption" style={{ textTransform: "uppercase" }}>
              {city.shortDesc}
            </Typography>
          </Grid>
          <Grid item style={{ flex: 1 }} />
          <Grid item style={{ width: "100%" }}>
            <Grid container justify="space-between">
              <Grid item style={{ padding: "1rem" }}>
                <Typography variant="caption" style={{ textTransform: "uppercase" }}>
                  Local time
                </Typography>
                <Typography variant="h5">{cityTime}</Typography>
                <Typography variant="caption">{cityDate}</Typography>
              </Grid>
              <Grid item style={{ padding: "1rem", textAlign: "right" }}>
                <Typography variant="caption" style={{ textTransform: "uppercase" }}>
                  Today
                </Typography>
                <Typography variant="h5">{city.temperatureCelsius}°C</Typography>
                <Typography variant="caption">{city.weather}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <BottomNavigation showLabels style={{ flex: "0 1 6rem" }}
          onChange={(event, newValue) => {
            history.push(newValue);
          }} >
          <BottomNavigationAction value={`/cities/${city.id}/attractionCategories`}
            label="Attractions" icon={<PlaceIcon />} />
          <BottomNavigationAction value="/need-to-know"
            label="Need to know" icon={<WorkIcon />} />
          <BottomNavigationAction value="/more"
            label="More" icon={<MenuIcon />} />
        </BottomNavigation>
      </Box>
    );
  }
}

export default withRouter(withStyles(styles)(HomeFragment));
