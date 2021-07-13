import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

const AUTH_PATH = process.env.REACT_APP_AUTH_PATH || "localhost";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        zIndex: 10
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    userButton: {
        color: 'white',
        marginLeft: 10,
        textTransform: 'capitalize',
        fontSize: '110%',
        fontWeight: 'Bold',
        borderRadius: '20px',
        backgroundColor: '#243ab0',
        padding: '0px 20px',
    }
}));

export default function UserMenu({loggedIn, userInfo}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const logout = (event) => {
        const PATH = process.env.REACT_APP_HOME_PATH || "localhost";
        document.location.href = `http://${PATH}:3000`;       
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <div>
            <Button 
                //href="http://localhost:8888"
                href={`http://${AUTH_PATH}:8888/`}
                variant="outlined"
                className={classes.userButton}
                style={loggedIn ? {display: 'none'} : {}}
            >
                Log In
            </Button>
            <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                style={loggedIn ? {} : { display: 'none' }}
                className={classes.userButton}
                variant="outlined"
            >
                {userInfo}
            </Button>
                
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={logout}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}