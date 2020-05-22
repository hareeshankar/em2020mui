import React from "react";
import { Card } from "react-bootstrap";

class EItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      eventname,
      eventdate,
      eventloc,
      eventdes,
      userId,
      id
    } = this.props.event;

    return (
        <Card style={{width:'100%',marginTop:'20px'}}>
          <Card.Body>
            <Card.Title>{eventname}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {eventdate} , {eventloc}
            </Card.Subtitle>
            <Card.Text>{eventdes}</Card.Text>
            <Card.Link href="#">Edit</Card.Link>
            <Card.Link href="#">Delete</Card.Link>
          </Card.Body>
        </Card>
    );
  }
}

export default EItem;
