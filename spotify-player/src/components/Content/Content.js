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

export default function SpacingGrid({showActivities, onShowActivities, searchPlaylists, songListPreview}) {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        console.log("handleChange");
        setExpanded(isExpanded ? panel : false);
    };
    
    const changeExpanded = (panel) => {
        setExpanded(!expanded);
    }

    return (
        <div>
            <Grid 
                container 
                className={classes.root} 
                justify="center" 
                spacing={1}
                
                
                >
                {/* {[0, 1, 2].map((value) => (
                    <Grid key={value} item>
                        <Paper className={classes.paper} />
                    </Grid>
                ))} */}
                <Grid item xs={12} sm={3} className={classes.griditem}>
                    <Grid1 
                        onShowActivities={onShowActivities} 
                        expanded={expanded}
                        handleChange={() => changeExpanded()}
                    />
                </Grid>
                <Grid item xs={12} sm={5} className={classes.griditem}>
                    <Grid2 
                        showActivities={showActivities}
                        onShowActivities={onShowActivities} 
                        searchPlaylists={searchPlaylists}
                        handleChange={() => changeExpanded()}
                        songListPreview={songListPreview}
                    />
                </Grid>
                <Grid item xs={12} sm={4} className={classes.griditem}>
                    <Grid3 name="Grid3" />
                </Grid>
            </Grid>
        </div >
    );
}
