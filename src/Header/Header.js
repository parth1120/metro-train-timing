import React from 'react';
import './Header.css'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Header() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <div variant="h6" className={classes.title}>
                        <img src="https://www.watsooexpress.com/img/Logo.png" style={{backgroundColor:'#fff'}} width="10%" alt="logo"></img>
                    </div>
                    <Button variant="contained" size={'small'} startIcon={<PowerSettingsNewIcon />} onClick={() => { alert('Logout') }}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
