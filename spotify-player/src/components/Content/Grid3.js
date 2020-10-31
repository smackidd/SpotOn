import React from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    paper: {
        height: "70vh",
        width: "100%",
        display: "block",
        color: "white",
        //border: "Black solid 1px",
        backgroundColor: "#555",
        //boxShadow: "2px 2px 1px 1px #444",
        textAlign: "center",
    },
    list: {
        width: '25vw',
        color: 'white',
    },
    editButtons: {
        fontSize: 8,
        width: 40,
    },
}));

export default function Grid3(props) {
    const classes = useStyles();
    const [edit, showEdit] = React.useState(false);
    const [saveName, showSaveName] = React.useState(false);
    const [playlistName, submitName] = React.useState('');

    function editFinalPlaylist(){
        showEdit(!edit);
    }

    function saveFinalPlaylist(){
        showSaveName(!saveName);
    }

    function onPlaylistName(event){
        submitName(event.target.value);
    }

    return (
        <div>
            <Paper className={classes.paper}>
                <div>
                    <p>Final List: {props.finalList.length} songs</p>
                    <ButtonGroup variant="text" color="secondary">
                        <Button onClick={() => editFinalPlaylist()}>Edit</Button>
                        <Button onClick={() => props.clearFinalPlaylist()}>Clear</Button>
                        <Button 
                            onClick={() => saveFinalPlaylist()}
                            style={saveName ? {display: 'none'} : {}}
                        >Save
                        </Button>
                        

                        
                    </ButtonGroup>
                    <span style={saveName ? {} : {display: 'none'}}>
                    <TextField 
                            label='Playlist Name'
                            size="small"
                            color="secondary"
                            required
                            onChange={onPlaylistName}
                        />
                    <ButtonGroup variant="contained" size="small">
                        <Button 
                            color="primary"
                            onClick={() => props.savePlaylistToLibrary(playlistName)}
                        >submit</Button>
                        <Button 
                            color="inherit"
                            style={{color: "#333"}}
                            onClick={() => saveFinalPlaylist()}
                        >cancel</Button> 
                    </ButtonGroup>
                    </span>              
                    <div id="tempList">
                        
                        {props.finalList.map((song) => {
                        return (
                            <ButtonGroup className="track" variant="contained" size="xsmall">
                            <Button  
                                color="secondary"
                                className={classes.editButtons}
                                style={edit ? {} : {display: 'none'}}
                                onClick={() => props.deleteTrackFinal(song.id)}
                                >
                                Delete</Button>
                            
                            <Button  
                                key={song.id}
                                color="primary"
                                variant="text"
                                size="small"
                                className={classes.list}
                                onClick={() => props.playSong(song.id)}
                            >
                                <div>{song.name} - {song.artist}</div>
                            </Button>
                            </ButtonGroup>
                        )
                        })}
                    
                    </div>
                </div>
            </Paper>
        </div >
    );
}
