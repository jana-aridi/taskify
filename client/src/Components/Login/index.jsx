import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import styles from './style.module.css'; 
import LocalStorageFile from '../../Utils/LocalStorageFile';


const Login = () => {

    const  navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });
 
    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const url = 'http://localhost:8080/api/login';
            const {data: res} = await axios.post(url, data);
            Toast.fire({
                icon: 'success',
                title: res.message,
            });

            const user = res.data.user;
            localStorage.setItem("token", res.data.token);
            LocalStorageFile.setLocalStorageUser(user);

            if (user.isAdmin)
                setTimeout(() => {
                    navigate('/admin-panel');
                }, 1500); 

            else
                setTimeout(() => {
                    navigate('/home');
                }, 1500); 
        }
        catch(error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500)
                Toast.fire({
                    icon: 'error',
                    title: error.response.data.message
                });
        }
    }


    return(
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                <form className={styles.form_container} onSubmit={handleSubmit}>

                    <h1> Login to Your Account </h1> 

                    <input type="email" placeholder='Email'
                    name='email' onChange={handleChange} 
                    value={data.email} required className={styles.input}/>

                    <input type="password" placeholder='Password'
                    name='password' value={data.password}
                    onChange={handleChange} required className={styles.input}/>
 
                    {error && <div className={styles.error_msg}>{error}</div>}

                    <button type="submit" className={styles.green_btn}>Sign In</button>

                    </form>
                </div>

                <div className={styles.right}>
                    <img src='/logo.png' alt="Logo" className={styles.logo} />
                    <h1>New Here?</h1>
                    <Link to="/signup">
                        <button type='button' className={styles.white_btn}>
                            Sign Up
                        </button>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
};

export default Login;