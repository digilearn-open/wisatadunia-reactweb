import React from "react";
import logo from "./logo.svg";
import { Text } from "react-dom"
import { Button, Paper, makeStyles, Typography, Grid, BottomNavigationAction, BottomNavigation } from "@material-ui/core";
import "./App.css";
import "typeface-roboto";
import PlaceIcon from '@material-ui/icons/Place';
import WorkIcon from '@material-ui/icons/Work';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    flexGrow: 1,
    // height: "100%",
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://placeimg.com/640/480/arch)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    flex: 1,
    flexGrow: 1,
    height: "80%",
  },
}));

export function HomeScreen() {
  const classes = useStyles();

  return (
    <Paper className={classes.mainFeaturedPost}>
      <Grid container direction="column" justify="center" alignItems="center" style={{height: "100%"}}>
        <Grid item>
          <Typography variant="h6" style={{textTransform: "uppercase"}}>Italy</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h2" style={{textTransform: "uppercase"}}>Rome</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" style={{textTransform: "uppercase"}}>is a historical powerhouse</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
          <HomeScreen/>
        <BottomNavigation showLabels style={{flex: 1}}>
        <BottomNavigationAction label="Attractions" icon={<PlaceIcon />} />
        <BottomNavigationAction label="Need to know" icon={<WorkIcon />} />
        <BottomNavigationAction label="More" icon={<MenuIcon />} />
      </BottomNavigation>
    </div>
  );
}

export default App;
