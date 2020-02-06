import React from 'react';

export default React.createContext({
    users: [],
    setUsers:(users:any)=>{},
    editUser:(id:string)=>{},
    deleteUser:(id:string)=>{}
})