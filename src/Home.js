import React from 'react';
import Events from "./Events.js";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
export default function Home (props) {
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
    <div>
      <Events />
      <Box mt={8} style={{marginBottom:"20px"}}>
        <Copyright />
      </Box>
    </div>
  );
}
