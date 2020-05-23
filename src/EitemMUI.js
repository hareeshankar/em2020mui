import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: "80%",
    marginTop:"10px",
    marginLeft:"auto",
    marginRight:"auto"
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const {
    eventname,
    eventdate,
    eventloc,
    eventdes,
    userId,
    id
  } = props.event;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Card
          title={eventname}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {eventloc} {"  "}{eventdate}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {eventdes}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="primary">
          Manage
        </Button>
      </CardActions>
    </Card>
  );
}
