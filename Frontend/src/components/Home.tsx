import React from 'react';
import './Home.css'
import {  Typography } from '@material-ui/core';



export default class HelloPage extends React.Component{   

    render(){

        return (
            <>
            <div className="homepage">

            <Typography  color="textSecondary" variant="h5" component="h2" gutterBottom>
                Hello!
            </Typography>
            </div>
            </>
        )
    }
}