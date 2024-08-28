import './App.css'
import Dashbord from './Dashbord';
import Home from './Home';
import Login from './Login';
import Registration from './Registration';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Registration/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashbord/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
