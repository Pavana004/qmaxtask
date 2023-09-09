import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Fuse from 'fuse.js';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { DeleteOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';





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


const SearchComp = () => {

    const [postData, setPostData] = useState([]);
    const [searchInput, setSearchInput] = useState([]);


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
    }, []);



    const handleDelete = (id) => {

        const deletePost = postData.filter((del) => del.id !== id)
        setPostData(deletePost);

    }


    const options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['title', 'body']
    };

    const fuse = new Fuse(postData, options);
    const result = fuse.search(searchInput);




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
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                onChange={(e) => setSearchInput(e.target.value)}
                                type="text"
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
            </Box>
            <br />
            <Container sx={{ width: "100%" }}>
                <Grid container spacing={4} sx={{ width: "100%" }}>
                    {
                        result.map((res) => {
                            return (
                                <Grid item key={res.item.id} xs={12} md={6} lg={4} >
                                    <Card sx={{ Width: "50%", height: "100%", cursor: "pointer" }} >
                                        <CardHeader
                                            action={
                                                <IconButton>
                                                    <DeleteOutlined onClick={() => handleDelete(res.item.id)} />
                                                </IconButton>
                                            }
                                            title={
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                    UserId : {res.item.userId}
                                                </Typography>
                                            }
                                        />
                                        <CardContent  >
                                            <Typography variant="body2" color="text.secondary">
                                                Title : {res.item.title}
                                            </Typography>
                                            <br />
                                            <Typography variant="body2" color="text.secondary">
                                                Body : {res.item.body}
                                            </Typography>

                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>


        </>
    )
}

export default SearchComp