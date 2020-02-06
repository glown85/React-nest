import React from 'react';
import './Users.css';
import UserList from './UserList/UserList';
import usersContext from '../../context/users-context'
import editUser from './EditUser';
import { Route } from 'react-router-dom';

const axios = require('axios').default;

export default class ListUsers extends React.Component{
    setUsers(users:any){
        this.setState({users:users})
    }
    state={
        users: [],
        setUsers: this.setUsers
    }
    componentDidMount(){
        this.fetchUsers();
    }

    fetchUsers = () =>{
        axios({
            url: 'http://localhost:8080/graphql',
            method: 'POST',
            data: {
              query: `
                query{
                    getUsers{
                    id
                    name
                    email
                    }
                }
                `
            }
          })
          .then((res:any) =>{
                if(res.status !== 200 && res.status !== 201){
                    throw new Error('Failed');
                }
                // console.log(res);
                return res.data;
            }).then((resdata:any) =>{
                // console.log(resdata.data);
                // console.log(resdata.data.getUsers);
                this.setState({ users: resdata.data.getUsers} );

            })
            .catch((err:any)=>{
                console.log(err)
            })

     
    }

    deleteUser = (id:string):void =>{
        axios({
            url: 'http://localhost:8080/graphql',
            method: 'POST',
            data: {
              query: `
                mutation deleteUser($id: String!){ 
                    deleteUser(id: $id)
                 }
                `,
            variables:{
                id: id,

            }
            },

          })
          .then((res:any) =>{
                if(res.status !== 200 && res.status !== 201){
                    throw new Error('Failed');
                }
                console.log(res);
                //return res.data;
            }).then((resdata:any) =>{
                // this.setState({ users: [...this.state.users]} );
                this.fetchUsers();

            })
            .catch((err:any)=>{
                console.log(err)
            })

     
    }


    editUser = (id:string) =>{
        
        return (<Route path="/Edit" component={editUser}></Route>)
    }

    render(){

        return (
            <>
                <usersContext.Provider value={ {users:this.state.users, setUsers:this.setUsers, deleteUser:this.deleteUser, editUser:this.editUser  } } >
                    <UserList users={this.state.users}></UserList>
                </usersContext.Provider>
            </>
            );
    }
}