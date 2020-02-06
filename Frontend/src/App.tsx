import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import MainNavigation from './components/Navigation/MainNav';

import AuthPage from  './components/Auth';
import SignUpPage from  './components/Users/CreateUser';
import listUsersPage from  './components/Users/Users';
import homePage from  './components/Home';

import AuthContext from './context/auth-context'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';

class App extends React.Component{
  state = {
    token:null,
    userId:null,
    tokenExpiration:null
  }
  login = (token:string, userId:string, tokenExpiration:string) => {
    this.setState({token: token, userId:userId,tokenExpiration:tokenExpiration})
    }
  logout = () =>{
    this.setState({token: null, userId:null, tokenExpiration:null})

  }

  theme = createMuiTheme({
    palette: {
      primary:  {
        light: '#757ce8',
        main: '#323232',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: blueGrey,
      type: 'dark'
    },
    

  });

  render(){
    return (
      <BrowserRouter>
      <>
        <AuthContext.Provider value={ {token: this.state.token, userId: this.state.userId, login: this.login, logout:this.logout  } }>
        <ThemeProvider theme={this.theme}>

        <MainNavigation/>
          <main className = "main-content">
            <Switch>
              {!this.state.token && <Redirect from="/" to="/auth" exact/>}
              {!this.state.token && <Route path="/auth" component={AuthPage}></Route> }
              {this.state.token && <Redirect from="/auth" to="/home" exact/>}

              <Route path="/Signup" component={SignUpPage}></Route> */}
              <Route path="/list-users" component={listUsersPage}></Route> */}
              <Route path="/edit" component={SignUpPage}></Route> */}
              <Route path="/home" component={homePage}></Route> */}
  
            </Switch>
          </main>
        </ThemeProvider>
        </AuthContext.Provider>
      </>
      </BrowserRouter>
    );
  }

}

export default App;
