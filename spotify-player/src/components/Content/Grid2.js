import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Road_Trip from '../../images/road_trip.jpg';
import Running from '../../images/running.jpg';
import Walking from '../../images/walking.jpg';
import Sleeping from '../../images/sleeping.jpg';
import Cooking from '../../images/cooking.jpg';
import Coding from '../../images/coding.jpg';
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
    list: {
        width: '25vw',
        marginLeft: 50
    },
    editButtons: {
        fontSize: 8,
        width: 40,
    },
    rootgrid: {
        marginTop: "5px",
    }
}));




export default function Grid2(props){
    const [edit, showEdit] = React.useState(false);
    
        
    const image = [{
        image: Road_Trip,
        imageName: "Road Trip"    
    },
    {
        image: Running,
        imageName: "Running"
    },
    {
        image: Walking,
        imageName: "Walking" 
    },
    {
        image: Sleeping,
        imageName: "Sleeping"
    },
    {
        image: Cooking,
        imageName: "Cooking"
    },
    {
        image: Coding,
        imageName: "Coding"
    }]

    function onHandleActivities(query) {
        props.handleChange();
        props.onShowActivities();
        props.searchPlaylists(query);
        
    }

    function editPlaylist() {
        showEdit(!edit);
    }


    const classes = useStyles();
    return (
        <Grid container justify="center" style={{ flexGrow: 1, }} spacing={1}>
            <GridList 
                cellHeight={160} 
                justify="center" 
                className={classes.root} 
                cols={3}
                style={props.showActivities ? {} : {display: 'none'}}
            >
                {image.map((pic) => (
                    <GridListTile 
                        key={pic.image} 
                        cols={pic.cols || 1}
                        //the image name is the search query to find a playlist
                        onClick={(event) => onHandleActivities(pic.imageName)}
                    >
                        <img src={pic.image} alt={pic.imageName} />
                        <GridListTileBar title={pic.imageName} />
                    </GridListTile>
                ))}
            </GridList >
            <div style={props.showActivities ? {display: 'none'} : {}}>
                <p>Preview List: {props.songListPreview.length} songs</p>
                <ButtonGroup variant="text" color="secondary">
                <Button onClick={() => props.transferPlaylist()}>Transfer {props.transferSize}</Button><br/>
                <Button onClick={() => editPlaylist()}>Edit</Button>
                <Button onClick={() => props.clearPlaylist()}>Clear</Button>
                </ButtonGroup>
                
                <div id="tempList">
                
                    {props.songListPreview.map((song) => {
                        return (
                        <ButtonGroup 
                            className="track" 
                            variant="outlined" 
                            
                            size="small"
                        >
                            <Button 
                            style={edit ? {} : {display: 'none'}}
                            className={classes.editButtons}
                            variant="contained" 
                            color="secondary"
                            onClick={() => props.deleteTrackPreview(song.id)}
                            >
                            Delete</Button>
                            <Button  
                            style={edit ? {} : {display: 'none'}}
                            className={classes.editButtons}
                            variant="contained" 
                            color="inherit"
                            onClick={() => props.addSong(song.id)}
                            >
                            Add</Button>
                            <Button  
                            key={song.id}
                            variant="outlined"
                            color="primary"
                            justify-content="center" 
                            className={classes.list}
                            //style={{ flexGrow: 1, width: '80%', marginLeft: 20}}
                            onClick={() => props.playSong(song.id)}
                            >
                            <div>{song.name} - {song.artist}</div>
                            </Button>
                        </ButtonGroup>
                        )
                    })}
                
                </div>
            </div>
        </Grid>

        // <div 
        //     className={classes.root}
        //     style={props.showActivities ? {} : {display: 'none'}}
        // >
        //     {image.map((pic) => {
        //         return (
        //             <Grid2Content
        //                 image={pic.image}
        //                 imageName={pic.imageName}    
        //             /> 
        //         )
                
        //     })}    
        // </div>
    );
    
    
}

