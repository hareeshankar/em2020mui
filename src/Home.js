import React from 'react';
import Events from "./Events.js";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";

export default function Home ({ events, token, username, loading, editEvent}) {
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="/">
          Event Manager
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  return(
    token ? (
    <div id="home">
      {events && events.length ? (<Events events={events} editEvent={editEvent}/>) : (
        <div style={{width:"80%",marginTop:"80px",marginLeft:"auto",marginRight:"auto"}}>
              { loading ? (<Typography component="h1" variant="h5" color="primary">Refreshing Events . . .</Typography>):
              (
              <div style={{display:"flex", flexDirection:"row"}}>
              <Typography component="h1" variant="h5" color="primary">
              Start by Adding Events
              </Typography>
              <Link color="inherit" href="/addEvent" style={{textDecoration: "none", float:"right", marginLeft:"20px"}}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Add Event
              </Button>
              </Link>
              </div>
              )
              }
        </div>
      )}

    </div>) : (<Redirect to="/signin" />)
  );
}
