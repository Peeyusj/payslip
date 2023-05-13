import './App.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';

function App() {
  const isloggedin=window.localStorage.getItem("islogedin")
  return (
  <BrowserRouter>
        <Routes>
            <Route path='/signup' element={isloggedin=="true"?<Dashboard/>:<Signup/>}/>
            <Route path='/signin' element={isloggedin=="true"?<Dashboard/>:<Signin />}/>
            <Route path='/home/*' element={<  Dashboard  />}/>
            
        </Routes>
  </BrowserRouter>
    
  );
}

export default App;
