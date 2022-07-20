import React,{useState} from "react";
import useStyles from './style'
import {Card, CardContent,CardActions, CardMedia,Button, Typography,ButtonBase} from "@material-ui/core"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment';
import { useDispatch } from "react-redux";
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useNavigate } from "react-router-dom";

import { deletePost,likePost } from "../../../actions/posts"

const Post = ({post, setCurrentId}) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const [likes,setLikes] = useState(post?.likes)
    
    const userId = user?.result?.googleId || user?.result?._id
    const hasLikedPost = post.likes.find((like) => like === userId)


    
    const handleLike=async()=>{
        dispatch(likePost(post._id)); 

        if(hasLikedPost){
            setLikes(post.likes.filter((id)=> id !== userId));
        }else{
            setLikes([...post.likes,userId]);
        }
        
    };
    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === userId)
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => {
        navigate(`/posts/${post._id}`);
    };


    return(
        <Card className={classes.card} raised elevation={6}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} /> 
            <div className={classes.overlay}>
                <Typography varient="h6">{post.name}</Typography>
                <Typography varient="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>

            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white' }} size="small">
                    <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
            )}

            <ButtonBase className={classes.cardAction} onClick={openPost}>
            <div className={classes.details}>
               <Typography varient="body2" color="textSecondary">{post.tags.map((tag)=>`#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title}varient="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography varient="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
        </ButtonBase>

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes/>
                </Button>

                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" /> Delete
                    </Button>
                )}

            </CardActions>
        </Card>

    )
}

export default Post;