import React, { useEffect, useState } from 'react'
import {AppBar,Avatar,Button,Toolbar,Typography} from '@material-ui/core';
import memories from "../../images/memories.png"
import {Link, useNavigate,useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import decode from 'jwt-decode'

import useStyles from './style'
const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    console.log(user);
    
    const logout=()=>{
        dispatch({type:'LOGOUT'})
        navigate('/');
        setUser(null);
    }

    useEffect(()=>{
        const token = user?.token;

        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp *1000 < new Date().getTime()){
                logout();
            }
        }
        //JWT
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])


    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
        <Typography  component = {Link} to="/" className={classes.heading} variant="h2" align="center">
            Spill the Beans
        </Typography>
        <img className = {classes.image} src={memories} alt="memories" height="60" />
        </div>

        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src ={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>

                    <Typography className={classes.userName} varient ="h6">{user.result.name}</Typography>

                    <Button varient="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>

            ) : (
                <Button component={Link} to="/auth" varient="contained" color="primary">Sign In</Button>
            )}
        </Toolbar>

        
    </AppBar>
    )
    
}

export default Navbar;