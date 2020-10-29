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
        //width: '100%',
        maxWidth: 360,
    },
    grid: {
        //flexGrow: 1,
    },
    griditem: {
        //flexGrow: 1,
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




export default function Grid2(props){
    
        
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
            </GridList>
            <p>Preview List: {props.songListPreview.length} songs</p>
            <ButtonGroup variant="text" color="secondary">
            <Button /*onClick={() => this.transferPlaylist()}*/>Transfer {/*this.state.transferSize*/}</Button><br/>
            <Button /*onClick={() => this.editPlaylist()}*/>Edit</Button>
            <Button /*onClick={() => this.clearPlaylist()}*/>Clear</Button>
            </ButtonGroup>
              
            <div id="tempList" style={props.showActivities ? {display: 'none'} : {}}>
            
                {props.songListPreview.map((song) => {
                    return (
                    <ButtonGroup className="track" variant="outlined" size="small">
                        {/* <Button 
                        disabled={this.state.edit} 
                        color="secondary"
                        onClick={() => this.deleteTrackPreview(song.id)}
                        >
                        Delete</Button>
                        <Button  
                        disabled={this.state.edit} 
                        color="inherit"
                        onClick={() => this.addSong(song.id)}
                        >
                        Add</Button> */}
                        <Button  
                        key={song.id}
                        variant="contained"
                        color="primary"
                        
                        onClick={() => this.playSong(song.id)}
                        >
                        <div>{song.name} - {song.artist}</div>
                        </Button>
                    </ButtonGroup>
                    )
                })}
            
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

