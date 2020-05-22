import React from "react";
import EItem from "./EItem.js";
import { Container, Row, Col } from "react-bootstrap";

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          eventname: "Hari Wedding",
          eventdate: "2020-05-15",
          eventloc: "Chennai",
          eventdes: "Event is on 15th may evening 7pm at Temple Bay",
          userId: "shambo",
          id: "3"
        },
        {
          eventname: "Suresh Wedding",
          eventdate: "2020-05-15",
          eventloc: "Chennai",
          eventdes: "Event is on 15th may evening 7pm at Temple Bay Event is on 15th may evening 7pm at Temple Bay Event is on 15th may evening 7pm at Temple Bay Event is on 15th may evening 7pm at Temple Bay Event is on 15th may evening 7pm at Temple Bay Event is on 15th may evening 7pm at Temple Bay ",
          userId: "shambo",
          id: "2"
        },
        {
          eventname: "Rajesh Wedding",
          eventdate: "2020-05-15",
          eventloc: "Chennai",
          eventdes: "Event is on 15th may evening 7pm at Temple Bay",
          userId: "shambo",
          id: "1"
        },
        {
          eventname: "poda poda Wedding",
          eventdate: "2020-05-15",
          eventloc: "Chennai",
          eventdes: " Event is on 15th may evening 7pm at Temple Bay Event is on 15th may evening 7pm at Temple Bay Event is on 15th may evening 7pm at Temple Bay Event is on 15th may evening 7pm at Temple Bay Event is on 15th may evening 7pm at Temple Bay",
          userId: "shambo",
          id: "4"
        }
      ]
    };
  }

  render() {
    return (
      <Container>
          {this.state.events.map(event => (

              <EItem key={event.id} event={event} />

          ))}
      </Container>
    );
  }
}
export default Events;
