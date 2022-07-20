import React, {useState} from 'react'
import { Avatar,Button,Paper,Grid,Typography,Container } from '@material-ui/core';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Icon from "./icon"
import { GoogleLogin } from 'react-google-login';
import {useNavigate} from 'react-router-dom'
import useStyles from "./style";
import Input from './Input';
import { gapi } from "gapi-script";
import { useDispatch } from 'react-redux';
import {signup,signin} from '../../actions/auth'


const initialState = {firstName:'',lastName:'', email:'',password:'',confirmPassword:''}

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //To remove the "popup_closed_by_user" error while logging in with google
    gapi.load("client:auth2", () => {
        gapi.client.init({
          clientId:
            "288334591553-7f822f49eonqeleqr8memih4ce7hsplj.apps.googleusercontent.com",
          scope: "email",
        });
      });

    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);

    const [isSignup,setIsSignup] = useState(false);
    const [formData,setFormData]= useState(initialState);

    const handleShowPassword=()=> setShowPassword((prevShowPassword)=>! prevShowPassword);

    const handleSubmit=(e)=>{
        e.preventDefault();

        if(isSignup){
            dispatch(signup(formData,navigate))
        }else{
            dispatch(signin(formData,navigate))

        }
    }
    const handleChange= (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const switchMode=()=>{
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    }

    const googleSuccess =async(res)=>{
        const result = res?.profileObj; //cannot get property profileObj of undefined
        const token =res?.tokenId;
        
        try{
            dispatch({type:"AUTH",data:{result,token}})
            navigate('/');
        }catch(err){
            console.log(err);
        }
    }
    const googleFailure=(err)=>{
        console.log(err);
        console.log("Google Sign In was unsuccessful. Try Again!")
    }

  return (
    <Container component = "main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography varient="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>  
                            
                                <Input name="firstName" label="First Name" handleChange = {handleChange}
                                autoFocus
                                half
                                />
                            
                                <Input name="lastName" label="Last Name" handleChange = {handleChange}
                                half
                                />

                            </>
                        )
                    }

                    <Input name="email" label="Email Address" handleChange ={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password" } handleShowPassword={handleShowPassword}/>

                    {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}

                </Grid>

                <Button type="submit" fullWidth varient="contained" color="primary" className={classes.submit}>{
                    isSignup ? 'Sign Up' : "Sign In"
                }
                </Button>

                <GoogleLogin
                    clientId="288334591553-7f822f49eonqeleqr8memih4ce7hsplj.apps.googleusercontent.com"
                    render={(renderProps)=>(
                        <Button
                            className={classes.googleButton}
                            color="primary"
                            fullWidth
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            startIcon={<Icon/>}
                            variant='contained'
                            
                        >
                            Google Sign In
                        </Button>

                    )}

                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"


                    />
                


                <Grid container justify= "flex-end">
                    <Button onClick={switchMode}>
                        {isSignup ? "Already have an account? Sign In":"Don't have an account? Sign Up"}
                    </Button>
                </Grid>
            </form>
        </Paper>

    </Container>
  )
}

export default Auth