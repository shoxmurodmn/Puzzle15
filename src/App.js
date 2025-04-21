
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Game from './page/game/game';
import Home from "./page/home/home";
import UserTable from "./page/mizolar";


function App() {
  return (
    <BrowserRouter>
    
    <Routes>
        <Route element={<Home/>}>
           
            <Route path="/" element={ <Game />}> </Route>
            <Route path="/result" element={<UserTable/>}></Route>

        </Route>
      </Routes>
                             

    </BrowserRouter>
  );
}

export default App;
