import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default function SideBar ({sbclose, sbtoggle, signout, addEvent}) {
  return sbtoggle ? (
    <div>
    <div style={{width:"200px",right:"0",position:"absolute",left:"0",top:"0",zIndex:"1",height:"100%",backgroundColor:"#fff",overflow:"auto",borderRight:"1px"}} >
      <ListGroup>
        <ListGroup.Item action onClick={sbclose}>Close &times;</ListGroup.Item>
        <ListGroup.Item action onClick={addEvent}>Add New Event</ListGroup.Item>
        <ListGroup.Item action onClick={signout}>Sign Out</ListGroup.Item>
      </ListGroup>
    </div>

    </div>
  ):
  (null);
}
