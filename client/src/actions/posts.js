import * as api from '../api';
import {FETCH_ALL,FETCH_BY_SEARCH,FETCH_POST, CREATE,DELETE,UPDATE,LIKE,START_LOADING,END_LOADING,COMMENT} from "../constants/actionTypes"


//Action Creators
export const getPosts=(page)=>async(dispatch)=>{
    try{
        dispatch({type:START_LOADING})
        const {data} = await api.fetchPosts(page);
        
        dispatch({type: FETCH_ALL , payload: data});
        dispatch({type:END_LOADING})
    }catch(err){
        console.log(err);
    }
}
export const getPost=(id)=>async(dispatch)=>{
    try{
        dispatch({type:START_LOADING})
        const {data} = await api.fetchPost(id);
        
        dispatch({type: FETCH_POST , payload: data});
        dispatch({type:END_LOADING})
    }catch(err){
        console.log(err);
    }
}

export const getPostsBySearch=(searchQuery)=>async(dispatch)=>{
    try{
        dispatch({type:START_LOADING})

        const {data:{data}} = await api.fetchPostsBySearch(searchQuery);
        dispatch({type: FETCH_BY_SEARCH , payload: data});
        dispatch({type:END_LOADING})
    }catch(err){
        console.log(err);
    }
}

export const createPost=(post)=>async(dispatch)=>{
    try{
        const {data} = await api.createPost(post);
        dispatch({type: CREATE , payload: data});
    }catch(err){
        console.log(err);
    }
}

export const updatePost = (id,post)=>async(dispatch)=>{
    try{
        console.log(post);
        const {data} = await api.updatePost(id,post);
        dispatch({type: UPDATE,payload:data})
    }catch(err){ 
        console.log(err)
    }
}

export const deletePost = (id)=> async(dispatch)=>{
    try{
        await api.deletePost(id);
        dispatch({type:DELETE,payload:id})
    }catch(err){
        console.log(err);
    }
}

export const likePost = (id)=>async(dispatch)=>{
    const user = JSON.parse(localStorage.getItem('profile'))
    try{
        const {data} = await api.likePost(id,user?.token);
        dispatch({type:LIKE,payload:data});
    }catch(err){
        console.log(err);
    }
}

export const commentPost = (value,id)=>async(dispatch)=>{
    try{
        const {data} = await api.comment(value,id);
        console.log(data);
        dispatch({type:COMMENT, payload:data});
        return data.comments;
    }catch(err){
        console.log(err);
    }
}
