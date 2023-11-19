import React from 'react'
import SideBar from '../../Components/UserSideBar/SideBar';
import TaskList from '../../Components/TaskList/TaskList'; 
import styles from './style.module.css';
import LocalStorageFile from '../../Components/LocalStorageFile';

const Home = () => {

  const user = LocalStorageFile.getLocalStorageUser();
   
  const fullName = user ? `${user.firstName} ${user.lastName}` : ' ';
 
  return (
    <div className={styles.mainContainer}>
      <div><SideBar/></div>
      <div className={styles.rightContainer}>
        <h3>Welcome Back {fullName}! 😊</h3>
        <TaskList/>
      </div>  

    </div>
  )
}

export default Home;