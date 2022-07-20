import React, {useState,useEffect}from 'react'
import {Container, Grid, Grow,Paper,TextField,Button, AppBar} from '@material-ui/core'
import Posts from '../Posts/Posts.js'
import Form from '../Form/Form.js'
import { getPosts,getPostsBySearch } from "../../actions/posts.js";
import { useDispatch } from 'react-redux';
import Paginate from '../Pagination.jsx';
import {useNavigate,useLocation} from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
import useStyles from "./style";

function useQuery(){
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') ||1;
    const searchQuery = query.get('searchQuery');

    const [search,setSearch] = useState();
    const [tags,setTags] = useState([]);


    const handleKeyPress = (e)=>{
        if(e.keyCode ===13){
            //search post
            searchPost();
        }
    }

    const handleAdd = (tag) => setTags([...tags,tag]);

    const handleDelete = (tagToDelete)=>setTags(tags.filter((tag) => tag !==tagToDelete));

    const searchPost = ()=>{
        if(search?.trim() ||tags){
            dispatch(getPostsBySearch({search,tags:tags.join(',')}));

            navigate(`/posts/search?searchQuery=${search ||'none'}&tags=${tags.join(',')}`);
        }else{
            navigate('/');
        }
    }

    const clearSearch = ()=>{
        navigate('/');
        window.location.reload(false);
    }

  return (
    <Grow in>
                <Container maxWidth ="xl">
                    <Grid container justify="space-between" alignItems="stretch" spacing={3} className = {classes.gridContainer}>

                        <Grid item xs ={12} sm={6} md={9}>
                            <Posts setCurrentId = {setCurrentId}/>
                        </Grid>

                        <Grid item xs ={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch}  position="static" color="inherit">
                            <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                                <ChipInput
                                    style={{margin:'10px 0'}}
                                    value={tags}
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    label="Search Tags"
                                    varient="outlined"
                                />
                                <Button onClick={searchPost} className={classes.searchButton} color="primary" variant='contained'>Search</Button>
                                <Button  varient="contained" color="secondary" size="small" onClick={clearSearch} fullWidth>Clear</Button>

                            </AppBar>
                            <Form currentId = {currentId} setCurrentId = {setCurrentId}/>
                            {(!searchQuery && !tags.length)&&
                            <Paper className={classes.pagination} elevation={6}>
                                <Paginate page={page}/>
                            </Paper>
                            }
                        </Grid>

                    </Grid>
                </Container>
            </Grow>
  )
}

export default Home;