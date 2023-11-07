import {Route, Routes, Navigate} from 'react-router-dom';
import Main from './Components/Main';
import Signup from './Components/Signup';
import Login from './Components/Login';

function App() {
  const user = localStorage.getItem('token');
  return (
    <Routes>
      {user && <Route path="/" exact element={<Main/>}/>}
      <Route path="/signup" exact element={<Signup/>}/>
      <Route path="/login" exact element={<Login/>}/>
      <Route path="/" exact element={<Navigate replace to='/login'/>}/>
    </Routes>
  );
}

export default App;
