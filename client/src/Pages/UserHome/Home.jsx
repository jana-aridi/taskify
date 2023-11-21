import React from 'react'
import SideBar from '../../Components/UserSideBar/SideBar';
import TaskList from '../../Components/TaskList/TaskList'; 
import TaskForm from '../../Components/TaskForm/TaskForm';
import JoinWorkspace from '../../Components/JoinWorkspace/JoinWorkspace';
import styles from './Home.module.css';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import LocalStorageFile from '../../Components/LocalStorageFile';

const Home = () => {

  const [tasks, setTasks] = useState([]);
  const [showJoinWorkspace, setShowJoinWorkspace] = useState(false);

  const [user, setUser] = useState(LocalStorageFile.getLocalStorageUser()); 

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
    if (user && user.workspaceID) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const url = `http://localhost:8080/api/users/getTasks/${user._id}`;
      const config = {
        headers: {
          'Authorization': `Bearer ${LocalStorageFile.getToken()}`
        }
      };
 
      const response = await axios.get(url, config);
      setTasks(response.data);
      
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        Toast.fire({
          icon: 'error',
          title: error.message
        });
      }
    }
  };
  
  const handleTaskCreation = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const toggleJoinWorkspace = () => {
    setShowJoinWorkspace(!showJoinWorkspace);  
  };

  return (
    <div className={styles.mainContainer}>
      <SideBar />
      
        {(user.workspaceID === null) ? (
          <>
          <div className={styles.rightContainer_join}>
            <div className={styles.header_join}>
              <h3>Welcome Back {fullName}! 😊</h3>
              <div className={styles.addButtonDiv}>
                <div className={styles.notfound}> </div>
                <button onClick={toggleJoinWorkspace} className={styles.addButton}>+</button>
                <span onClick={toggleJoinWorkspace} className={styles.joinText}>Join Workspace</span>
              </div>
            </div>
            {showJoinWorkspace && <JoinWorkspace user={user} toggleJoinWorkspace={toggleJoinWorkspace} />} </div>
          </>
        ) : (
          <>
            <div className={styles.rightContainer}>
            <div className={styles.header}>
              <h3>Welcome Back {fullName}! 😊</h3>
              <TaskForm handleTaskCreation={handleTaskCreation} user={user} setUser={setUser}/>
            </div>
            <TaskList tasks={tasks} setTasks={setTasks} /> </div>
          </>
        )} 
    </div>
  );
}

export default Home;