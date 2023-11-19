  import * as React from 'react';
  import { useState, useEffect } from 'react';
  import ListSubheader from '@mui/material/ListSubheader';
  import List from '@mui/material/List';
  import ListItemButton from '@mui/material/ListItemButton';
  import ListItemIcon from '@mui/material/ListItemIcon';
  import ListItemText from '@mui/material/ListItemText';
  import Collapse from '@mui/material/Collapse'; 
  import IconButton from '@mui/material/IconButton'; 
  import DeleteIcon from '@mui/icons-material/Delete';
  import ExpandLess from '@mui/icons-material/ExpandLess';
  import ExpandMore from '@mui/icons-material/ExpandMore'; 
  import LocalStorageFile from '../LocalStorageFile';
  import styles from './style.module.css'
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import { Checkbox } from '@mui/material';


const TaskList = () => {

  const user = LocalStorageFile.getLocalStorageUser();
  // const hasWorkspace = (user?.workspace === null) ? false : true;
    
  const [tasks, setTasks] = useState([]);  
  const [openSubtask, setOpenSubtask] = useState({});  

  // Function to toggle subtask collapse
  const handleClickSubtask = (id) => {
    setOpenSubtask((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id],
    }));
  }; 


  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  });

  useEffect(() => {
    const getUserTasks = async () => {
      try {
        const url = `http://localhost:8080/api/users/getTasks/${user._id}`;
        console.log(url);
        const config = {
          headers: {
            'Authorization': `Bearer ${LocalStorageFile.getToken()}`
          }
        };
 
        const response = await axios.get(url, config); 
        console.log(response);

        setTasks(response.data); // Set fetched tasks to state
      } catch (error) { 
        console.log(error)
        if(error.response && error.response.status >= 400 && error.response.status <= 500)
            Toast.fire({
                icon: 'error',
                title: error.message
            })
      }
    }

    getUserTasks();
  }, [user._id]); 
    

  // Task Operations
  const toggleTaskCompletion = async (task) => {
    try {
      
      const url = `http://localhost:8080/api/tasks/update/${task._id}`;
      const config = {
        headers: {
          'Authorization': `Bearer ${LocalStorageFile.getToken()}`
        }
      };

      const response = await axios.patch(url, { isCompleted: !task.isCompleted }, config);

      // Update the task in the state
      setTasks(tasks.map(t => t._id === task._id ? { ...t, isCompleted: !t.isCompleted } : t));
      Toast.fire({
        icon: 'success',
        title: 'Task status updated'
      });
      
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: error.message
      });
    }
  }; 

  const deleteTask = async (taskId) => {
    try {
       
      const url = `http://localhost:8080/api/tasks/delete/${taskId}`;
      const config = {
        headers: {
          'Authorization': `Bearer ${LocalStorageFile.getToken()}`
        }
      };

      await axios.delete(url, config);

      // Remove the task from the state
      setTasks(tasks.filter(t => t._id !== taskId));
      Toast.fire({
        icon: 'success',
        title: 'Task deleted'
      });

    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: error.message
      });
    }
  };

  return (
    <div className={styles.list}>
      <br></br>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Tasks
          </ListSubheader>
        }
      >
        {tasks.map((task) => (
          <React.Fragment key={task._id}>
            <ListItemButton>

              <ListItemIcon onChange={() => toggleTaskCompletion(task)}>
                <Checkbox checked={task.isCompleted}/>
              </ListItemIcon>

              <ListItemText primary={task.name} />
              <ListItemText secondary={task.assignees.map(a => (a.firstName + " " + a.lastName)).join(', ')} />
              <IconButton aria-label="delete">
                <DeleteIcon onClick={() => deleteTask(task._id)} />
              </IconButton>
              {task.subtasks.length > 0 ? (
                openSubtask[task._id] ? <ExpandLess /> : <ExpandMore />
              ) : null}
            </ListItemButton>
            {task.subtasks.length > 0 && (
              <Collapse in={openSubtask[task._id] || false} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {task.subtasks.map((subtask) => (
                    <ListItemButton key={subtask._id} sx={{ pl: 4 }}>
                      <ListItemIcon onChange={() => toggleTaskCompletion(subtask)}>
                        <Checkbox checked={subtask.isCompleted}/>
                      </ListItemIcon>
                      <ListItemText primary={subtask.name} />
                      <IconButton aria-label="delete" onClick={() => deleteTask(subtask._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
  }

  export default TaskList