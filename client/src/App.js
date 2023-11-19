import {Route, Routes, Navigate} from 'react-router-dom';
import Main from './Components/Main';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Pages/UserHome/Home';

function App() {
  const user = localStorage.getItem('token');
  console.log(user)
  return (
    <Routes>
      {/* {user && <Route path="/" exact element={<Main/>}/>}
      <Route path="/signup" exact element={<Signup/>}/>
      <Route path="/login" exact element={<Login/>}/>
      <Route path="/" exact element={<Navigate replace to='/login'/>}/> */}

      <Route path="/login" exact element={<Login/>}/>
      <Route path="/home" exact element={<Home/>}/>
    </Routes>
  );
}

export default App;
