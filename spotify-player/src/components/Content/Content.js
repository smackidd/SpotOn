import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grid1 from './Grid1';
import Grid2 from './Grid2/Grid2';
import Grid3 from './Grid3';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    griditem: {
        flexGrow: 1,
    }
}));

export default function SpacingGrid(
    {
        handleDisplay,
        isDisplayed,
        user,
        //showActivities, 
        //onShowActivities,
        //showGenres,
        //onShowGenres, 
        searchPlaylists, 
        songListPreview, 
        playSong, 
        clearPlaylist, 
        deleteTrackPreview, 
        addSong,
        transferSize,
        finalList,
        transferPlaylist,
        clearFinalPlaylist,
        deleteTrackFinal,
        savePlaylistToLibrary,
        saveSearchHistory
    }) {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        console.log("handleChange", panel, isExpanded);
        setExpanded(isExpanded ? panel : false);
    };

    
    
    const changeExpandedActivities = (panel) => {
        setExpanded(!expanded);
    }

    return (
        <div>
            <Grid 
                container 
                className={classes.root} 
                justify="center" 
                spacing={2}
                
                
                >
                
                <Grid item xs={12} sm={3} className={classes.griditem}>
                    <Grid1
                        //handleDisplay={(event) => handleDisplay(event)}
                        //isDisplayed={isDisplayed} 
                        //onShowActivities={onShowActivities}
                        //onShowGenres={onShowGenres} 
                        expanded={expanded}
                        handleChange={(event) => handleChange(event)}
                        //handleChangeGenres={() => changeExpandedGenres()}
                    />
                </Grid>
                <Grid item xs={12} sm={5} className={classes.griditem}>
                    <Grid2
                        user={user}
                        expanded={expanded}
                        setExpanded={(expanded) => setExpanded(expanded)} 
                        searchPlaylists={searchPlaylists}
                        handleChange={(event) => handleChange(event)}
                        songListPreview={songListPreview}
                        playSong={playSong} 
                        clearPlaylist={clearPlaylist}
                        deleteTrackPreview={deleteTrackPreview}
                        addSong={addSong}
                        transferSize={transferSize}
                        transferPlaylist={transferPlaylist}
                        saveSearchHistory={saveSearchHistory}
                    />
                </Grid>
                <Grid item xs={12} sm={4} className={classes.griditem}>
                    <Grid3 
                        name="Grid3"
                        playSong={playSong}
                        finalList={finalList}
                        clearFinalPlaylist={clearFinalPlaylist}
                        deleteTrackFinal={deleteTrackFinal}
                        savePlaylistToLibrary={savePlaylistToLibrary}
                    />
                </Grid>
            </Grid>
        </div >
    );
}
