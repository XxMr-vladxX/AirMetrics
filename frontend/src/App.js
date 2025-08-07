import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './paginas/Pantalla_Home';
import Login from './paginas/Pantalla_Login';
import SignUp from './paginas/Pantalla_SignUp';
import Home2 from './paginas/Pantalla_Home2';
import Dashboard from './paginas/Pantalla_Dashboard';
import Reporte from './paginas/Pantalla_Reporte';
import './App.css';

function App(){
  return(
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='signup' element={<SignUp/>}/>
          <Route path='home' element={<Home2/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='report' element={<Reporte/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;