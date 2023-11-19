// TaskForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import LocalStorageFile from '../LocalStorageFile';

const TaskForm = ({ onTaskCreated }) => {

  const user = LocalStorageFile.getLocalStorageUser();
  const workspaceID = user.workspaceID;

  const [taskName, setTaskName] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [assignees, setAssignees] = useState([]);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  });

  useEffect(() => {
    const getOtherEmployees = async () => {
      try {
        const url = `http://localhost:8080/api/workspaces/${workspaceID}/${user._id}/otherUsers`;
        console.log(url);
        const config = {
          headers: {
            'Authorization': `Bearer ${LocalStorageFile.getToken()}`
          }
        };
 
        const response = await axios.get(url, config); 
        console.log(response);

        setTasks(response.data);  
      } catch (error) { 
        console.log(error)
        if(error.response && error.response.status >= 400 && error.response.status <= 500)
            Toast.fire({
                icon: 'error',
                title: error.message
            })
      }
    }
 
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Submit new task
    // ...
    onTaskCreated(newTask); // Call the callback function with the new task
  };

  return (
    <div className={styles.formContainer} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
        <TextField
          label="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
          style={{ flex: 1 }}
        />
        
        <FormControl style={{ flex: 1 }}>
          <InputLabel id="assignee-select-label">Assignee</InputLabel>
          <Select
            labelId="assignee-select-label"
            id="assignee-select"
            value={selectedAssignee}
            label="Assignee"
            onChange={(e) => setSelectedAssignee(e.target.value)}
            required
          >
            {assignees.map((assignee) => (
              <MenuItem key={assignee._id} value={assignee._id}>
                {`${assignee.firstName} ${assignee.lastName}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Button type="submit" variant="contained" style={{ backgroundColor: 'black', color: 'white' }}>
          Submit
        </Button>
      </form>
    </div>
  );

};

export default TaskForm;
