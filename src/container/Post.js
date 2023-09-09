import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import CardComp from '../component/CardComp';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';




const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Post = () => {

    const [postData, setPostData] = useState([]);


    const fetchPostData = async () => {

        try {

            const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
            setPostData(res.data);

        } catch (error) {

            console.log(error)

        }
    }

    useEffect(() => {
        fetchPostData();
    }, [])


    const handleDelete = (id) => {

        const deletePost = postData.filter((del) => del.id !== id)
        setPostData(deletePost);

    }



    return (
        <>

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: "" }}>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            Task
                        </Typography>
                        <Link to='/search' className='link' >
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    type="text"
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </Link>
                    </Toolbar>
                </AppBar>
            </Box>
            <br />
            <Container sx={{ width: "100%" }}>
                <Grid container spacing={4} sx={{ width: "100%" }}>
                    {
                        postData.map((res) => {
                            return (
                                <Grid item key={res.id} xs={12} md={6} lg={4}>
                                    <CardComp
                                        res={res}
                                        handleDelete={handleDelete}
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>

        </>


    )
}

export default Post