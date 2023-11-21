import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import styles from './JoinWorkspace.module.css';
import Swal from 'sweetalert2';
import LocalStorageFile from '../../Utils/LocalStorageFile';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import logo from '../../Assets/Images/logo.png';

const JoinWorkspace = ({ user, setUser, toggleJoinWorkspace }) => {  
  const [workspaceID, setWorkspaceID] = useState('');
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const navigate = useNavigate();

  const handleJoinWorkspace = async (event) => {
    event.preventDefault(); 

    try {
      const url = `http://localhost:8080/api/users/joinWorkspace/${user._id}`;
      const config = {
        headers: {
          'Authorization': `Bearer ${LocalStorageFile.getToken()}`
        }
      };

      const response = await axios.post(url, { workspaceID }, config); 

      if(response.status === 200) { 

        const updatedUser = { ...user, workspaceID: workspaceID };
        LocalStorageFile.setLocalStorageUser(updatedUser); 
        user = updatedUser;  

        Toast.fire({
            icon: 'success',
            title: 'Joined workspace successfully!'
        });

        window.location.reload();
    }
 
    } catch (error) { 

        Toast.fire({
            icon: 'error',
            title: error.response.data.message
        });
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <IconButton onClick={toggleJoinWorkspace} className={styles.closeButton}>
          <CloseIcon />
        </IconButton>
        <img src={logo} alt="Logo" className={styles.logo} /> 
        <form onSubmit={handleJoinWorkspace} className={styles.form}>
            <div className={styles.formDiv}>
              <div>
                  <TextField
                  className={styles.formControl}
                  label="Workspace ID"
                  variant="outlined"
                  value={workspaceID}
                  autoComplete='off'
                  onChange={(e) => setWorkspaceID(e.target.value)}
                  required
                  />
              </div> 
              <br></br>
              <div>
                <Button type="submit" variant="contained" color="primary" className={styles.submitButton}>
                Join Workspace
                </Button>
              </div>
            </div>
        </form>
      </div>
    </div>
  );
};

export default JoinWorkspace;
