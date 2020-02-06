import React from 'react';
import { NavLink } from 'react-router-dom'; //to not reload the page
import AuthContext from '../../context/auth-context'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


import { useTheme } from '@material-ui/core/styles';


import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    navitem:{
      color: 'white',
      textDecoration: 'none',
      "&:hover, &:focus":{
        color: '#fdda7f'
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function MainNavigation (){
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const classes = useStyles(useTheme);

    
      const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    return (
        <AuthContext.Consumer>
            {(context)=>{
                return (
                    <>
                        <div className={classes.root}>

                        <AppBar  position="static">
                            <Toolbar className="main-nav">
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                App
                            </Typography>
                            {!context.token && <NavLink className = {classes.navitem} to="/auth"><MenuItem onClick={handleClose}>Login</MenuItem></NavLink> }
                            <NavLink className = {classes.navitem} to="/signup"><MenuItem onClick={handleClose}>Sign-up</MenuItem></NavLink>
                            <NavLink className = {classes.navitem} to="/list-users"><MenuItem onClick={handleClose}>Users</MenuItem></NavLink>
                            {context.token && (
                                <div>
                                    
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >

                                    <NavLink className={classes.navitem} to={{pathname:"/edit", state:{id:context.userId}}} >
                                        <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
                                    </NavLink>
                                        <MenuItem className={classes.navitem} onClick={context.logout}>Logout</MenuItem>
                                    
                                </Menu>

                                </div>
                            )}
                            </Toolbar>
                        </AppBar>
                        </div>
                    </>
   
                )
            }}
            
        </AuthContext.Consumer>
    );
}