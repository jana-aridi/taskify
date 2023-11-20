import {Route, Routes, Navigate} from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Pages/UserHome/Home';

function App() {
  const user = localStorage.getItem('token');
  console.log(user)
  return (
    <Routes>
      
      {user && !user.isAdmin && <Route path="/" exact element={<Home/>} />}
      {/* {user && user.isAdmin && <Route path="/" exact element={<Home/>} />} */}
      <Route path="/" exact element={<Navigate replace to='/login'/>}/> 
      <Route path="/login" exact element={<Login/>}/>
      <Route path="/signup" exact element={<Signup/>}/>
      <Route path="/home" exact element={<Home/>}/>
    </Routes>
  );
}

export default App;
