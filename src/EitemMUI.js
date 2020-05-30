import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles({
  root: {
    marginTop:"10px",
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
  const subheader ="Location: " + eventloc + " Date: " + eventdate.split("T",1);
  function onEdit(){
    props.invokeEdit(props.event);
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
          <CardHeader
          title={eventname}
          subheader={subheader}
          />
          <CardContent style={{paddingTop:"0px"}}>
            {eventdes}
          </CardContent>
      </CardActionArea>
      <CardActions>
          <Button size="small" color="primary" onClick={onEdit}>
            Edit
          </Button>
          <Button size="small" color="primary">
            Manage
          </Button>
      </CardActions>
    </Card>
  );
}
