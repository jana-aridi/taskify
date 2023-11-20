import React from 'react'
import SideBar from '../../Components/UserSideBar/SideBar';
import TaskList from '../../Components/TaskList/TaskList'; 
import TaskForm from '../../Components/TaskForm/TaskForm';
import styles from './style.module.css';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import LocalStorageFile from '../../Components/LocalStorageFile';

const Home = () => {

  const [tasks, setTasks] = useState([]);

  const user = LocalStorageFile.getLocalStorageUser();
  if (user === null)
    window.location = '/';

  const fullName = user ? `${user.firstName} ${user.lastName}` : ' ';

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  useEffect(() => { 

    const fetchTasks = async () => {
      try {
        const url = `http://localhost:8080/api/users/getTasks/${user._id}`;
        console.log(url);
        const config = {
          headers: {
            'Authorization': `Bearer ${LocalStorageFile.getToken()}`
          }
        };
 
        const response = await axios.get(url, config); 
        console.log('tasks ' + response.data);

        setTasks(response.data); 
      } catch (error) { 
        console.log(error)
        if(error.response && error.response.status >= 400 && error.response.status <= 500)
            Toast.fire({
                icon: 'error',
                title: error.message
            })
      }
    };

    fetchTasks();
  }, []);
  
  const handleTaskCreation = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className={styles.mainContainer}>
      <div><SideBar/></div>
      <div className={styles.rightContainer}>
        <h3>Welcome Back {fullName}! 😊</h3>
        <TaskList tasks={tasks} setTasks={setTasks} />
        <TaskForm handleTaskCreation={handleTaskCreation} user={user}/>
      </div>  

    </div>
  )
}

export default Home;