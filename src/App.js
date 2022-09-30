import React, { useContext } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Topbar from "./components/Topbar/Topbar";
import { Context } from "./context/Context";
import Home from './pages/home/Home'
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/singlepg/Single";
import Write from "./pages/write/Write";

function App() {

  const {user} = useContext(Context)

  return (
    <>
      <BrowserRouter>
        <Topbar/>
        <Routes>
          <Route path= "/" element = {<Home/>}/>
          <Route path= "/write" element={user? <Write/> : <Register/>}/>
          <Route path= "/settings" element={user? <Settings/> : <Register/>}/>
          <Route path= "/login" element={user? <Home/> : <Login/>}/>
          <Route path= "/register" element={user ? <Home/> : <Register/>}/>
          <Route path= "/post/:id" element={<Single/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
