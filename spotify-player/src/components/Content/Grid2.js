import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Grid from '@material-ui/core/Grid';
import Gym from '../../images/gym.jpg';
import Running from '../../images/running.jpg';
import Walking from '../../images/walking.jpg';
import Sleeping from '../../images/sleeping.jpg'
import Grid2Content from './Grid2Content';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
    },
    grid: {
        flexGrow: 1,
    },
    griditem: {
        flexGrow: 1,
        textAlign: "Center",
        margin: "0px 5px",
        padding: "10px 0px",
        boxShadow: "5px 5px lightgrey",
        borderRadius: "5px",
    },
    rootgrid: {
        marginTop: "5px",
    }
}));


export default function Grid2() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid2Content
                image1={Gym}
                image1name="Gym"
                image2={Running}
                image2name={"Running"}
                image3={Walking}
                image3name="Walking"
            />
            <Grid2Content
                image1={Sleeping}
                image1name="Sleeping"
                image2={Running}
                image2name={"Running"}
                image3={Walking}
                image3name="Walking"
            />
        </div>
    );
}

