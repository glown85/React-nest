import React from 'react';
import UserItem from './UserItem/UserItem'
import usersContext from '../../../context/users-context'


interface User{
    id: string,
    name: string,
    email: string,
}

class UserList extends React.Component<{ users: User[] }>{
    private ulList =[];
    

    listItens = (props:any, context:any)=>{
        this.ulList = props.users.map((user:User) =>{
            return <UserItem ctx={context} key= {user.id} id={ user.id } name={user.name} email={ user.email}></UserItem>
        })
        return this.ulList;
    }
    
    constructor(props:any){
        super(props);
        this.state={
            users: this.props.users
        }
    }
    
    render(){
        return(
            <usersContext.Consumer>
                {(context)=>{
                        return (
                            <ul className="user__list">
                                {this.listItens(this.props, context)}
                            </ul>
                        )
                    }
                }
            </usersContext.Consumer>
            
        );
    }
}

export default UserList;
