import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { DeleteOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axios from "axios";


const CardComp = ({ res,handleDelete }) => {

    const [open, setOpen] = useState(false);
    const [commentsData,setCommentsData] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
   
    const handleChange = ({target : {name,value}}) =>{
        
      setCommentsData({...commentsData,[name]:value})

    }

    const handleSubmit = async (e)=>{
       e.preventDefault();
       console.log(commentsData);
       try {
             const resp = await axios.post(`https://jsonplaceholder.typicode.com/posts/${res.userId}/comments`,commentsData);
             localStorage.setItem('data',JSON.stringify(resp.data));
             setOpen(false);

       } catch (error) {
            console.log(error)
       }
        

    }

  
    return (
        <>
            <Card sx={{ Width: "50%", height: "100%", cursor:"pointer" }} >
                <CardHeader
                    action={
                        <IconButton>
                            <DeleteOutlined onClick={() => handleDelete(res.id)}/>
                        </IconButton>
                    }
                    title={
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            UserId : {res.userId}
                        </Typography>
                    }
                />
                <CardContent onClick={handleClickOpen} >
                    <Typography variant="body2" color="text.secondary">
                        Title : {res.title}
                    </Typography>
                    <br />
                    <Typography variant="body2" color="text.secondary">
                        Body : {res.body}
                    </Typography>

                </CardContent>
            </Card>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Comments</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange = {handleChange}
                        value={commentsData.name}
                        autoFocus
                        margin="dense"
                        name = "comments"
                        id="comments"
                        label="Comments"
                        type="text"
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>


        </>


    )
}

export default CardComp