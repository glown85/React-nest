import React from 'react';
import './Users.css'
import { TextField, Button } from '@material-ui/core';
const axios = require('axios').default;

export default class CreateUser extends React.Component{
    private nameElement:any;
    private emailElement:any;
    private passwordElement:any;
    private id?:string|null;
    state ={
        name:'',
        email: '',
        password: ''
    }
    constructor(props:any){
        super(props);
        this.state = {
            name:'',
            email: '',
            password: ''
        }
        this.nameElement = React.createRef<HTMLInputElement>();
        this.emailElement = React.createRef<HTMLInputElement>();
        this.passwordElement = React.createRef<HTMLInputElement>();


        this.id = null;
        if(props.location.state){
            this.id=props.location.state.id;
        }
        if(this.id!=null){
            this.fetchUserData();
        }
    }
    clearInputValues(){
        this.nameElement.current.value = ''
        this.emailElement.current.value = ''
        this.passwordElement.current.value = ''
        this.setState({
            name:'',
            email:'',
            password:'',
        })

    }

    handleNameChange = (event:any) => {
        this.setState({
          name: event.target.value,
        });
      };
      handleEmailChange = (event:any) => {
        this.setState({
          email: event.target.value,
        });
      };
      handlePasswordChange = (event:any) => {
        this.setState({
          password: event.target.value,
        });
      };

    fetchUserData = () =>{

        axios({
            url: 'http://localhost:8080/graphql',
            method: 'POST',
            data: {
              query: `
                query getUserByid($id: String!){ 
                    getUserByid(id: $id){
                        name
                        email
                        password
                     }
                 }
                `,
            variables:{
                id: this.id,         
            }
            },

          })
          .then((res:any) =>{
                if(res.status !== 200 && res.status !== 201){
                    throw new Error('Failed');
                }

                return res.data;
            }).then((resdata:any) =>{

                this.setState({
                    name:resdata.data.getUserByid.name,
                    email:resdata.data.getUserByid.email,
                    password:resdata.data.getUserByid.password,
                })
            })
            .catch((err:any)=>{
                console.log(err)
            })

     
    }

    submitHandler = (event:any) =>{
        event.preventDefault();

        const name = this.nameElement.current?.value;
        const email = this.emailElement.current?.value;
        const password = this.passwordElement.current?.value;

        let data;

        if(this.id==null){
            data = {
                query: `
                  mutation createUser($name: String! $email: String! $password: String!){ 
                       createUser(name: $name, email: $email, password: $password)
                   }
                  `,
                variables:{
                    name: name,
                    email: email,
                    password: password
                }
            }
        }
        else{
            data = {
                query: `
                  mutation editUser($id: String!, $name: String! $email: String!){ 
                        editUser(id: $id, name: $name, email: $email)
                   }
                  `,
                variables:{
                    id: this.id,
                    name: name,
                    email: email,
                    // password: password //have to add this
                }
            }
        }

       

        if(email?.trim().length ===0 || password?.trim().length ===0){
            return;
        }

        axios({
            url: 'http://localhost:8080/graphql',
            method: 'POST',
            data: data,

          })
          .then((res:any) =>{
                if(res.status !== 200 && res.status !== 201){
                    throw new Error('Failed');
                }

                return res.data;
            }).then((resdata:any) =>{
                if(!this.id){
                    this.clearInputValues();
                }
            })
            .catch((err:any)=>{
                console.log(err)
            })

     
    }

    render(){

        return (
            <>
            <form className="auth-form" onSubmit={this.submitHandler} autoComplete="off">
                <div className="form-control">

                    <TextField 
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    type="name"
                     id="name" 
                     color="primary"  
                     label="Name" 
                     inputRef={this.nameElement} 
                     value= {this.state.name}
                     onChange={this.handleNameChange}
                     />

                </div>
                <div className="form-control">

                    <TextField
                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                        type="email" 
                        id="email"
                         color="primary" 
                          label="Email"
                           inputRef={this.emailElement} 
                           value= {this.state.email}
                           onChange={this.handleEmailChange}


                           />

                </div>
                <div className="form-control">
 
                    <TextField 
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    type="password" 
                    id="password" 
                    color="primary"  
                    label="Password" 
                    inputRef={this.passwordElement} 
                    value= {this.state.password}
                    onChange={this.handlePasswordChange}


                    />

                </div>

                <div >
                    <Button type="submit" variant="outlined" color="secondary">{this.id ? "Save": "submit" }</Button>

                </div>
            </form>
            </>
            );
    }
}