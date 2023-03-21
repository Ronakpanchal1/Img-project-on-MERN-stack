import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import GetUser from './GetUser';


function App() {

  return (<>
    
     <Router>
       <Routes>
         <Route exact path='/' element={<Home />}></Route>
         <Route exact path='/getUser' element={<GetUser/>}></Route>
         <Route exact path='/login' element={<Login />}></Route>
         <Route exact path='/register' element={<Register/>}></Route>
       </Routes>
   </Router>
   </>
  );
}

export default App;
