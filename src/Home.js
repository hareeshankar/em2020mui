import React from 'react';
import Events from "./Events.js";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";

export default function Home ({ events, token}) {
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
    <div>
      {events && events.length ? (<Events events={events} />) : (
        <div style={{width:"80%",marginTop:"80px",marginLeft:"auto",marginRight:"auto"}}>
        <Typography component="h1" variant="h5" color="primary">
          No Events to show. Please add new events to manage.
          <hr/>
        </Typography>
        <Link color="inherit" href="/addEvent">
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Add Event
        </Button>
        </Link>
        </div>
      )}
      <footer id="footer">
        <Copyright />
      </footer>
    </div>) : (<Redirect to="/signin" />)
  );
}
