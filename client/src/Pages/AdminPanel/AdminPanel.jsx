import React from 'react';
import styles from './AdminPanel.module.css';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
import LocalStorageFile from '../../Utils/LocalStorageFile';
import AdminSideBar from '../../Components/AdminSideBar/SideBar';

const AdminPanel = () => {
  const user = LocalStorageFile.getLocalStorageUser();

  if (!user)
    window.location = "/";

  // if (!user.isAdmin)
  //   window.location = '/home'

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className={styles.mainContainer}> 
      <AdminSideBar/>
      <div className={styles.rightContainer}>
        <div className={styles.header}>
          <h3>Welcome Back {fullName}! 😊</h3>
          <h2></h2>
        </div>
      </div> 
    
    </div>
  );
} 

export default AdminPanel;