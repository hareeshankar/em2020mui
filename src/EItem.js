import React from "react";
import { Card } from "react-bootstrap";

class EItem extends React.Component {
  constructor(props) {
    super(props);
  }
  function editEvent(id) {
    console.log("Edit Event Clicked, ID: " + id);
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
            <Card.Link><button onClick={(id) => {console.log("ID =" + id);}}>Edit</button></Card.Link>
            <Card.Link href="#">Delete</Card.Link>
          </Card.Body>
        </Card>
    );
  }
}

export default EItem;
