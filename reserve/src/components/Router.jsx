
import '../css/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from './List';
import Menu from './Menu';
import Claim from './Claim';


function Router() {
  return (
      <BrowserRouter>
        <Menu/>
            <Routes>
            <Route path='list' exact element = {<List/>}/>
            <Route path= 'claim' exact element= {<Claim/>}/>
            </Routes>
      
      
      
      
      
      
      
      
      
      
      
      </BrowserRouter>
  );
}

export default Router;
