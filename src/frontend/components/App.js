import {BrowserRouter,Routes,Route,} from "react-router-dom";

import Home from './Home.js';
import Routes_Marketplace from './Routes_Marketplace.js';

import './App.css';

function App() {
  return (
   
    <BrowserRouter>  
      <Routes>
        <Route path="/" element={<Home/>}  />
        <Route path="/marketplace/*" element={ <Routes_Marketplace/>} /> 
      </Routes>
      </BrowserRouter>
    
  );
}

export default App;
