import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function TasksItem(props) {
  const {
    taskname,
    status,
    assignedTo,
    id
  } = props.task;
  const eventId = props.eventId;

  function onDelete(){
    props.dTask(props.task.id);
  }

  return (
    <tr >
    <td>{taskname}</td>
    <td>{status}</td>
    <td>{assignedTo}</td>
    <td>
        <Link to={`/edittask/${eventId}/${id}`} style={{textDecoration:"none",color:"inherit"}}>
        <Button
         color="primary"
         style={{marginRight:"10px"}}
         startIcon={<EditIcon />}
         >
         Edit
         </Button>
         </Link>
         <Button
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={onDelete}
          >
          Delete
          </Button>
    </td>
    </tr>
  );
}
