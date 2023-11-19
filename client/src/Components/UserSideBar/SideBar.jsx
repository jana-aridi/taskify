import React from 'react';
import styles from './SideBar.module.css'

const SideBar = ()=> {
    return (
        <div className={styles.sidebar}> 
          <div className={styles.logo}>
            <img src="logo.png" width="70%"/>
            <p className={styles.slogan}>From To-Do to Ta-Da!</p>
          </div>
          <br></br>
           
          <nav className={styles.nav}> 
            <a href="#">Task Board</a>
            <a href="#">Log Out</a> 
          </nav>
        </div>
    )
}

export default SideBar;