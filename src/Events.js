import React from "react";
import EItem from "./EitemMUI.js";
import { Container, Row, Col } from "react-bootstrap";
import Typography from '@material-ui/core/Typography';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events : this.props.events
    };
    console.log(this.props.events);
  }
  componentDidMount(){
    this.setState({events: this.props.events});
  }
  render() {
    return (
      <div style={{width:"80%",marginLeft:"auto",marginRight:"auto"}}>
      <Typography component="h1" variant="h5" color="primary">
        Ongoing Events {" (" + (this.props.events.length) + ")"}
        <hr/>
      </Typography>
      <Container >
          {this.props.events.map(event => (

              <EItem key={event.id} event={event} />

          ))}
      </Container>
      </div>
    );
  }
}
export default Events;
