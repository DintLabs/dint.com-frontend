import {
  BrowserRouter,
  Router,
  Routes,
  Route,
  
} from "react-router-dom";

import Homepage from './Homepage.js';
import Marketplace_app from './Marketplace_app.js';

import './App.css';

function App() {


  return (
   
    <BrowserRouter>  
      <Routes>
        <Route path="/" element={<Homepage/>}  />
        <Route path="/marketplace/*" element={ <Marketplace_app/>} /> 
      </Routes>
      </BrowserRouter>
    
  );
}

export default App;
