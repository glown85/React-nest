import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    login: (token:string, userId:string, tokenExpiration:string)=>{},
    logout: ()=>{},
})