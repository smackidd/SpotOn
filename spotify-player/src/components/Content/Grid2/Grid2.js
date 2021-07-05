import React, { Component } from 'react';
import axios from 'axios';
import SaveQuery from '../Grid2/SaveQuery';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


import Road_Trip from '../../../images/road_trip.jpg';
import Running from '../../../images/running.jpg';
import Walking from '../../../images/walking.jpg';
import Sleeping from '../../../images/sleeping.jpg';
import Cooking from '../../../images/cooking.jpg';
import Coding from '../../../images/coding.jpg';
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
    const [genres, setGenres] = React.useState({
        Rock: false,
        Jazz: false,
        Electronica: false,
        Pop: false,
        Classical: false,
        Reggae: false,
        HipHop: false,
        RandB: false,
        Chill: false,
        LoFi: false,
      });
    const [queries, setQueries] = React.useState([]);
    const [searchHistory, setSearchHistory] = React.useState([]);
    
    //const [loadSearch, setLoadSearch] = React.useState([]);

    React.useEffect(() => {
        //axios.get("http://localhost:5005/searchhistory")
        axios.get("http://3.135.199.139:5005/searchhistory")
            .then((res) => {
                console.log("props.user.userID", props.user.userID, "res.data", res.data[0].userId);
                const search = res.data.filter((id) => id.userId == props.user.userID);
                setSearchHistory(search);
            })
            .catch((err) => console.log(err));
    }, [props.user]);

        
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
        console.log("onHandleActivities", props);
        props.setExpanded(false);
        
        props.searchPlaylists(query);
        
    }

    function onHandleGenres(){
        props.setExpanded(false);
        let searchTerm = '';
        queries.forEach((query) => {
            searchTerm = searchTerm + query + " OR ";
        })
        const index = searchTerm.lastIndexOf(" OR ");
        searchTerm = searchTerm.slice(0,index);
        props.searchPlaylists(searchTerm);
        console.log(genres, queries);
    }

    function editPlaylist() {
        showEdit(!edit);
    }

    const handleChange = (event) => {
        if (event.target.checked == true) setQueries([...queries, event.target.value]);
        else {
            
            let array = [...queries];
            let newArray = array.filter((query) => query != event.target.value);
            console.log(event.target.value, newArray);
            setQueries(newArray);  
        }
        setGenres({ ...genres, [event.target.name]: event.target.checked });
    };

    const { Rock, 
            Jazz, 
            Electronica, 
            Pop, 
            Classical,
            Reggae,
            HipHop,
            RandB,
            Chill,
            LoFi } = genres;

    const error = [
        Rock, 
        Jazz, 
        Electronica, 
        Pop, 
        Classical,
        Reggae,
        HipHop,
        RandB,
        Chill,
        LoFi
    ].filter((v) => v).length > 3;

    

    

    

    const classes = useStyles();
    
    return (
        <Grid container justify="center" style={{ flexGrow: 1, }} spacing={1}>

            {/*This displays the Activities*/}

            <GridList 
                cellHeight={160} 
                justify="center" 
                className={classes.root} 
                cols={3}
                style={props.expanded === 'panel1' ? {} : {display: 'none'}}
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

            {/*this displays the genres*/}

            <GridList
                cellHeight={500}
                justify="center" 
                className={classes.root}
                style={props.expanded === 'panel2' ? {} : {display: 'none'}}
            >
                <FormControl error={error} component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Pick Up to Three Genres</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={Rock} onChange={handleChange} name="Rock" value="Rock" />}
                            label="Rock"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={Jazz} onChange={handleChange} name="Jazz" value="Jazz" />}
                            label="Jazz"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={Electronica} onChange={handleChange} name="Electronica" value="Electronica" />}
                            label="Electronica"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={Pop} onChange={handleChange} name="Pop" value="Pop"/>}
                            label="Pop"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={Classical} onChange={handleChange} name="Classical" value="Classical" />}
                            label="Classical"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={Reggae} onChange={handleChange} name="Reggae" value="Reggae" />}
                            label="Reggae"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={HipHop} onChange={handleChange} name="HipHop" value="Hip-hop"/>}
                            label="Hip-Hop"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={RandB} onChange={handleChange} name="RandB" value="R&B" />}
                            label="R&B"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={Chill} onChange={handleChange} name="Chill" value="Chill" />}
                            label="Chill"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={LoFi} onChange={handleChange} name="LoFi" value="LoFi" />}
                            label="LoFi"
                        />
                    </FormGroup>
                    <FormHelperText style={error ? {} : {display: 'none'}}>Choose 3 or less</FormHelperText>
                    <Button 
                        disabled={error}
                        variant="contained" 
                        size="small" 
                        color="primary"
                        type="Submit"
                        onClick={() => onHandleGenres()}
                    >Apply</Button>
                </FormControl>
                
            </GridList>
            <div style={props.expanded === false ? {} : {display: 'none'}}>
                <p>Preview List: {props.songListPreview.length} songs</p>
                <ButtonGroup variant="text" color="secondary">
                    <Button  onClick={() => props.transferPlaylist()}>Transfer {props.transferSize}</Button><br/>
                    <Button onClick={() => editPlaylist()}>Edit</Button>
                    <Button onClick={() => props.clearPlaylist()}>Clear</Button>
                </ButtonGroup>
                <SaveQuery 
                    searchHistory={searchHistory}
                    saveSearchHistory={props.saveSearchHistory}
                    searchPlaylists={props.searchPlaylists}
                ></SaveQuery>
                
                
                 
                
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

