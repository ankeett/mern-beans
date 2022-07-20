import React from "react";
import {Container} from '@material-ui/core'
import { BrowserRouter, Routes,Route, useNavigate } from "react-router-dom";


import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home"
import Auth from "./components/Auth/Auth.js";
import PostDetails from "./components/PostDetails/PostDetails.jsx";

const App = () =>{
    
    const user= JSON.parse(localStorage.getItem('profile'));
    
    console.log(user);
    return(
        <BrowserRouter>
            <Container maxWidth ="xl">
            <Navbar/>
            <Routes>
                <Route path ="/" exact element={<Home/>}/>
                <Route path ="/posts" exact element={<Home/>}/>
                <Route path ="/posts/search" exact element={<Home/>}/>
                <Route path ="/posts/:id" element={<PostDetails/>}/>
                <Route path ="/auth" element={<Auth/>}/>
            </Routes>
            </Container>
        </BrowserRouter>
        
    );
}

export default App;