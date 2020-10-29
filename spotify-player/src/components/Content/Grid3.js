import React from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    paper: {
        height: 140,
        width: "100%",
        display: "block",
        color: "white",
        //border: "Black solid 1px",
        backgroundColor: "#555",
        boxShadow: "2px 2px lightgrey",
        textAlign: "center",
    },
}));

export default function Grid3(props) {
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.paper}>
                {props.name}
            </Paper>
        </div >
    );
}
