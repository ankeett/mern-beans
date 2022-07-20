import React,{useEffect, useState} from "react";
import {TextField,Button,Typography,Paper} from "@material-ui/core";
import FileBase from 'react-file-base64'
import {useDispatch, useSelector} from 'react-redux'
import useStyles from './style'
import {createPost,updatePost} from '../../actions/posts'
import {useNavigate} from "react-router-dom"



const Form = ({currentId,setCurrentId}) =>{
    const [postData, setPostData] = useState({ title: '', message: '',tags:'',selectedFile:''
    })

    const post = useSelector((state)=>(currentId ? state.posts.posts.find((message)=>message._id === currentId) :null));

    const user= JSON.parse(localStorage.getItem("profile"));

    useEffect(()=>{
        if(post) setPostData(post);
    },[post]);

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit =(e)=>{
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId,{...postData,name:user?.result?.name}))
            
        }else{
            dispatch(createPost({...postData,name:user?.result?.name}));
            navigate('/');
            window.location.reload(false);

        }
        clear();
    };

    if(!user?.result?.name){
        return(
            <Paper className={classes.paper} elevation={6}>
                <Typography varient ="h6" align="center" >
                    Please Sign In to create your own memories.
                </Typography>
            </Paper>
        )
    }

    const clear =()=>{
        setCurrentId(null);
        setPostData({title: '', message: '',tags:'',selectedFile:''})
    }

    return(
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit ={handleSubmit}>
            <Typography variant="h6" >
                {currentId ? 'Editing' :'Creating'} a Memory
            </Typography>
            <TextField
                name="title"
                varient="outlined"
                label="Title"
                fullWidth
                value={postData.title}
                onChange={(e)=> setPostData({...postData,title: e.target.value})} 
            />
            <TextField
                name="message"
                varient="outlined"
                label="Message"
                fullWidth
                multiline
                value={postData.message}
                onChange={(e)=> setPostData({...postData,message: e.target.value})} 
            />
            <TextField
                name="tags"
                varient="outlined"
                label="Tags"
                fullWidth
                value={postData.tags}
                onChange={(e)=> setPostData({...postData,tags: e.target.value.split(',')})} 
            />

            <div className={classes.fileInput}>
                <FileBase
                    type="file"
                    multiple={false}
                    onDone = {({base64})=>setPostData({...postData,selectedFile:base64})}
                />
            </div>

            <Button className={classes.buttonSubmit} varient="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button  varient="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

            </form>
        </Paper>
    )
}

export default Form;