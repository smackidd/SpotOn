import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import UserMenu from './UserMenu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: '5px',
    },
    title: {
        flexGrow: 1,
        textAlign: 'Center',
    },
    user: {
        textDecoration: 'underline',
    }
}));

export default function MenuBar({loggedIn, userInfo}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Spiffy Spotify Playlists
                    </Typography>
                    {/* <Button color="inherit">Login</Button> */}
                    <Typography>
                        <UserMenu loggedIn={loggedIn} userInfo={userInfo}/>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
