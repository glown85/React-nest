import React from 'react';
import './Users.css'
const axios = require('axios').default;

export default class EditUser extends React.Component{
    private nameElement:any;
    private emailElement:any;
    private passwordElement:any;

    private id: string;
    private name:string;
    private email:string;
    private password:string;
    constructor(props:any){
        super(props);
        this.nameElement = React.createRef<HTMLInputElement>();
        this.emailElement = React.createRef<HTMLInputElement>();
        this.passwordElement = React.createRef<HTMLInputElement>();

        this.id= props.location.state.id;
        this.name= props.location.state.name;
        this.email = props.location.state.email;
        this.password= props.location.state.value;

    }
    componentDidMount(){
        this.nameElement.current.value = this.name;
        this.emailElement.current.value = this.email;
        this.passwordElement.current.value = this.password;
    }

    submitHandler = (event:any) =>{
        event.preventDefault();

        const name = this.nameElement.current?.value;
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
                mutation editUser($id: String!, $name: String! $email: String! $password: String!){ 
                     editUser(id: $id, name: $name, email: $email, password: $password)
                 }
                `,
            variables:{
                id: this.id,
                name: name,
                email: email,
                password: password
            }
            },

          })
          .then((res:any) =>{
                if(res.status !== 200 && res.status !== 201){
                    throw new Error('Failed');
                }
                return res.data;
            }).then((resdata:any) =>{
                console.log(resdata.data);
            })
            .catch((err:any)=>{
                console.log(err)
            })

     
    }

    render(){

        return (
            <>
            <form className="auth-form" onSubmit={this.submitHandler}>
                <div className="form-control">
                    <label htmlFor="Name">Name:</label>
                    <input type="" id="name" ref={this.nameElement}/>
                </div>
                <div className="form-control">
                    <label htmlFor="email">e-mail:</label>
                    <input type="" id="email" ref={this.emailElement}/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">password:</label>
                    <input type="password" id="password" ref={this.passwordElement}/>
                </div>

                <div className="form-actions">
                    <button type="submit">submit</button>
                </div>
            </form>
            </>
            );
    }
}