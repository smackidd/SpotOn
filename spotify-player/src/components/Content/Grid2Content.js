import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Gym from '../../images/gym.jpg';
import Running from '../../images/running.jpg';
import Walking from '../../images/walking.jpg';
import Sleeping from '../../images/sleeping.jpg'

const useStyles = makeStyles((theme) => ({
    grid: {
        flexGrow: 1,
    },
    griditem: {
        flexGrow: 1,
        textAlign: "Center",
        margin: "0px 5px",
        padding: "10px 0px",
        boxShadow: "2px 2px lightgrey",
        borderRadius: "5px",
    },
    rootgrid: {
        marginTop: "5px",
    }
}));


export default function Grid2Content(props) {
    const classes = useStyles();

    return (
        <Grid container className={classes.rootgrid}>
            <Grid container className={classes.grid}>
                <Grid item className={classes.griditem}>
                    <div>
                        <div>
                            <img
                                src={props.image}
                                alt={props.imageName}
                                class="img-responsive"
                                height="100"
                                width="100"
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        {props.imageName}
                    </div>
                </Grid>
               
            </Grid>
        </Grid>
    );
}