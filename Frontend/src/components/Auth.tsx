import React from 'react';
import './Auth.css'
import AuthContext from '../context/auth-context';
import { Button, TextField, Collapse, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
const axios = require('axios').default;

export default class AuthPage extends React.Component{
    private emailElement:any;
    private passwordElement:any;
    static contextType = AuthContext;
    state ={
         errorEmail:false,
         errorPassword:false,
         errorMessage: ''
        };

    constructor(props:any){
        super(props);
        this.state ={
            errorEmail: false,
            errorPassword: false,
            errorMessage: ''
        }

        this.emailElement = React.createRef<HTMLInputElement>();
        this.passwordElement = React.createRef<HTMLInputElement>();
    }

    closeErrorMessage(){
        this.setState({errorEmail: false, errorPassword:false, errorMessage:"User does not exist"})

    }

    submitHandler = (event:any) =>{
        event.preventDefault();

        const email = this.emailElement.current?.value;
        const password = this.passwordElement.current?.value;

        if(email?.trim().length ===0 || password?.trim().length ===0){
            return;
        }

        axios({
            url: 'http://localhost:8080/graphql',
            method: 'POST',
            data: {
              query: `
              query login{
                login(email: "${email}" password: "${password}"){
                  userId
                  token
                  tokenExpiration
                }
              }
               
                `
            }
          })
          .then((res:any) =>{
                if(res.status !== 200 && res.status !== 201){
                    throw new Error('Failed');
                }
                return res.data;
            }).then((resdata:any) =>{
                if(resdata.errors){
                    //alert(resdata.errors[0].message);
                    // this.errorText=true;
                    let errorMessage = resdata.errors[0].message;
                    if(errorMessage.localeCompare("User does not exist")===0 ){
                        this.setState({errorEmail: true, errorPassword:false, errorMessage:"User does not exist"})

                    }
                    else{
                        this.setState({errorPassword: true, errorEmail:false, errorMessage:"Password is incorrect"})

                    }
                }
                else if(resdata.data.login.token){
                    this.context.login(resdata.data.login.token,resdata.data.login.userId, resdata.data.login.tokenExpiration);
                }
            })
            .catch((err:any)=>{
                alert(err);
            })

     
    }

    render(){

        return (
            <>
            <form className="auth-form" onSubmit={this.submitHandler} autoComplete="off">
                <div className="form-control">
                    <TextField
                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                        type="email" 
                        error = {this.state.errorEmail}
                        id="email" 
                        color="primary" 
                        label="Email" 

                        inputRef={this.emailElement} 
                        helperText={this.state.errorMessage}
                     />

                </div>
                <div className="form-control">
                    <TextField 
                        inputProps={{min: 0, style: { textAlign: 'center' }}}

                        type="password" id="password" color="primary"  
                        error = {this.state.errorPassword}
                        label="Password" 
                        inputRef={this.passwordElement} 
                        helperText={this.state.errorMessage}

                    />

                    
                </div>

                    <Button type="submit" variant="outlined" color="secondary">Login</Button>




                
            </form>
            <Collapse  className = "error-message" in={this.state.errorEmail || this.state.errorPassword}>
                <Alert severity="error"
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        this.closeErrorMessage();
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                >
                {this.state.errorMessage}
                </Alert>
            </Collapse>
            </>
            );
    }
}