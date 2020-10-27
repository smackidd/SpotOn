import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grid1 from './Grid1';
import Grid2 from './Grid2';
import Grid3 from './Grid3';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    griditem: {
        flexGrow: 1,
    }
}));

export default function SpacingGrid() {
    const classes = useStyles();

    return (
        <div>
            <Grid container className={classes.root} justify="center" spacing={2}>
                {/* {[0, 1, 2].map((value) => (
                    <Grid key={value} item>
                        <Paper className={classes.paper} />
                    </Grid>
                ))} */}
                <Grid item className={classes.griditem}>
                    <Grid1 />
                </Grid>
                <Grid item className={classes.griditem}>
                    <Grid container justify="center" style={{ flexGrow: 1, }} spacing={2}>
                        <Grid2 />
                    </Grid>
                </Grid>
                <Grid item className={classes.griditem}>
                    <Grid3 name="Grid3" />
                </Grid>
            </Grid>
        </div >
    );
}
