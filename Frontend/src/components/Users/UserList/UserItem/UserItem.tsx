import React from 'react'
import './UserItem.css';
import { Card, CardContent, Typography, CardActions,  IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';



const UserItem = (props:any, theme:any) => {
    return (
        <>
        <Card className="card">
        <CardContent>
            <Typography  color="textSecondary" variant="h5" component="h2" gutterBottom>
            {props.name}
            </Typography>

            <Typography variant="body2" component="p">
            {props.email}
            </Typography>
        </CardContent>
        <CardActions>
        <IconButton onClick={() => props.ctx.deleteUser(props.id)} aria-label="delete">
            <DeleteIcon />
        </IconButton>
        </CardActions>
        </Card>
        </>
    )
}

export default UserItem;
