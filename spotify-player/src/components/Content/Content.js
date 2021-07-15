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
        getTracks, 
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

    const [active, setActive] = React.useState(false);
    const [expanded, setExpanded] = React.useState({
        panel1: false,
        panel2: false
    });
    const [filters, setFilters] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        //console.log("handleChange", panel, isExpanded);
        //const panel1 = this.state.filters.panel1;
        setExpanded(isExpanded ? {...expanded, [panel]: true} : false);
        setActive(panel);
    };

    
    
    // const changeExpandedActivities = (panel) => {
    //     setExpanded(!expanded);
    // }

    return (
        <div>
            <Grid 
                container 
                className={classes.root} 
                justify="center" 
                spacing={2}
                
                
                >
                
                <Grid item xs={12} sm={2} className={classes.griditem} >
                    <Grid1
                        //handleDisplay={(event) => handleDisplay(event)}
                        //isDisplayed={isDisplayed} 
                        //onShowActivities={onShowActivities}
                        //onShowGenres={onShowGenres} 
                        expanded={expanded}
                        handleChange={(event) => handleChange(event)}
                        filters={filters}
                        getTracks={getTracks}
                        //handleChangeGenres={() => changeExpandedGenres()}
                    />
                </Grid>
                <Grid item xs={12} sm={5} className={classes.griditem}>
                    <Grid2
                        user={user}
                        expanded={expanded}
                        active={active}
                        filters={filters}
                        setActive={setActive}
                        setFilters={setFilters}
                        setExpanded={(expanded) => setExpanded(expanded)} 
                        getTracks={getTracks}
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
                <Grid item xs={12} sm={5} className={classes.griditem}>
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
