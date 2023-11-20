import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import styles from './JoinWorkspace.module.css';
import Swal from 'sweetalert2';
import LocalStorageFile from '../LocalStorageFile';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const JoinWorkspace = ({ user, setUser }) => {  
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
        console.log(error);

        Toast.fire({
            icon: 'error',
            title: error.message
        });
    }
  };

  return (
    <div className={styles.joinWorkspaceContainer}>
      <form onSubmit={handleJoinWorkspace}>
        <TextField
          label="Workspace ID"
          value={workspaceID}
          onChange={(e) => setWorkspaceID(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">
          Join Workspace
        </Button>
      </form>
    </div>
  );
};

export default JoinWorkspace;
