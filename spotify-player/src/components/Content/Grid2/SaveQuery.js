import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

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

export default function SaveQuery(props){
  const [saveSearch, setSaveSearch] = React.useState(false);
  const [searchName, submitName] = React.useState('');

  function handleSaveSearch(){
    setSaveSearch(!saveSearch);
  }
  

  const handleSavedSearches = (event) => {
    // setLoadSearch(event.target.value)
    // console.log("loadSearch", loadSearch);
    let search = props.searchHistory.filter((s) => s._id == event.target.value);
    console.log("search", search);
    let loadSearch = [];
    search[0].searchString.forEach((s) => {
        let sarray = s.split(" OR ");
        console.log("sarray", sarray);
        sarray.forEach((a) => {
            console.log("a",a);
            loadSearch.push(a);
        })
        console.log("loadSearch", loadSearch); 
    })
    console.log("loadSearch", loadSearch);
    loadSearch.forEach((s) => props.searchPlaylists(s));
  }

  const onSearchName = (event) => {
    submitName(event.target.value);
  }

  return (
    <div>
      <span>
          <Button 
              variant="contained"
              color="inherit"
              style={{margin: "10px"}}
              onClick={() => handleSaveSearch()}
          >Save Query</Button> 
          <FormControl >
              <InputLabel 
                  //htmlFor="select"
                  style={{marginLeft: "30px", fontSize: "15px"}}
                  >Saved Searches</InputLabel>
              <Select
                  native
                  id="select"
                  //value={loadSearch}
                  onChange={handleSavedSearches}
                  name="Saved Searches"
                  style={{marginLeft: "30px", minWidth: 200}}
                  >
                  <option aria-label="None" value="" />
                  {props.searchHistory.map((search) => (
                      <option 
                          value={search._id}
                          aria-label={search.searchQuery}
                      >{search.searchQuery}</option>
                  ))}
                  {/* <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option> */}
              </Select>
          </FormControl>   
      </span>
      <div>
        <span style={saveSearch ? {} : {display: 'none'}}>
            <TextField 
                    label='Playlist Name'
                    size="small"
                    color="secondary"
                    required
                    onChange={onSearchName}
                />
            <ButtonGroup variant="contained" size="small" style={{margin: 10}}>
                <Button 
                    color="primary"
                    onClick={() => props.saveSearchHistory(searchName)}
                >submit</Button>
                <Button 
                    color="inherit"
                    style={{color: "#333"}}
                    onClick={() => handleSaveSearch()}
                >cancel</Button> 
            </ButtonGroup>
        </span>
      </div>
    </div>
  );
}