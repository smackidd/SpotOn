import React, { Component } from 'react';


import './App.css';
import Button from '@material-ui/core/Button';
import Spotify from 'spotify-web-api-js';
import axios from 'axios';

import Menu from './components/Menu/Menu';
import Content from './components/Content/Content';


const spotifyWebApi = new Spotify();



class App extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    
    
    this.state = {
      loggedIn: params.access_token ? true : false,
      token: params.access_token,
      display: false,
      showActivities: false,
      showGenres: false,
      transferSize: 50,
      maxTransferSize: 50,
      user: [],
      query: [],
      searchName: '',
      playlists: [
        {
          name: '', 
          id: '',
          numTracks: 0,
          image: ''
        }
      ],
      songListPreview: [],
      finalList: []
    }
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
    spotifyWebApi.getMe() 
      .then((response) => this.setState({
        user: {
          userID: response.id,
          email: response.email,
          displayName: response.display_name,
          image: response.images[0].url, 
          uri: response.uri
        }
      }))
    
  }

  
  componentDidUpdate(prevProps, prevState){
    if (prevState.searchName !== this.state.searchName){
      let data = {
        "userId": this.state.user.userID,
	      "searchString": this.state.query,
	      "searchQuery": this.state.searchName  
      }
      console.log(data);
      //axios.post("http://localhost:5005/searchhistory/add", data).then((res) => {
      axios.post("http://18.188.194.19:5005/searchhistory/add", data).then((res) => {
        console.log(res.data);
      })
      .then((res) => alert("Query has been saved to your search history"));
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  // getNowPlaying() {
  //   spotifyWebApi.getMyCurrentPlaybackState()
  //     .then((response) => {
  //       this.setState({
  //         nowPlaying: {
  //           name: response.item.name,
  //           image: response.item.album.images[0].url
  //         }
  //       })
  //     })
  // }


  // this grabs the activity name and posts it as a search query
  // it then grabs a list of 20 playlists
  // and calls the method get5RandomPlaylists()
  searchPlaylists = (query) => {
    this.setState({query: [...this.state.query, query]})
    
    spotifyWebApi.searchPlaylists(query, {limit: 20})
      .then((response) => {
        console.log(response.playlists.items);
        this.setState({playlists: []})
        
        response.playlists.items.map((playlist) => {
          this.setState({playlists: [...this.state.playlists, { 
            name: playlist.name, 
            id: playlist.id, 
            numTracks: playlist.tracks.total, 
            image: playlist.images[0].url}]})
        })
      })
      .then((response) => this.get5RandomPlaylists())
      .catch((err) => console.log("Error: " + err));
  }

  // this takes the list of 20 playlists and chooses 5 and random,
  // so the user gets a new set of songs each time they click the same activity.
  // It then loops through the 5 playlists, each time passing the id of the playlist
  // to getPlaylistSongs();
  get5RandomPlaylists = () => {
    console.log('here');
    let index = 0;
    let indexList = [];
    let duplicate = null
    for (let i = 0; i < 5; i++){
      index = Math.floor(Math.random() * 20);
      duplicate = indexList.filter((num) => num === index);
      console.log("duplicate", duplicate);
      if (duplicate.length === 0){
        indexList.push(index);
        this.getPlaylistSongs(this.state.playlists[index].id);
        console.log("index", index, "indexList", indexList, "i", i);
      }
      else {
        i--;
      } 
    }
  }

  // this takes the id of a playlist and grabs 50 sequential tracks from a random index within the playlist
  getPlaylistSongs = (id) => {
    console.log("id", id);
    let tracks = this.state.songListPreview;
    
    const playlist = this.state.playlists.filter((playlist) => playlist.id === id)
    let total = playlist[0].numTracks;
    console.log("total", total);
    const limit = 50;
    let offsetMax = 0;
    if (total > limit) {
      offsetMax = total - limit;
    }
    
    
    const offset = Math.floor(Math.random() * offsetMax)

    
    spotifyWebApi.getPlaylistTracks(id, { offset: offset, limit: limit })
      .then((response) => {
        console.log("response.items", response.items);
        //put ids into an array so that we can call for audio_features
        let songIds = [];
        response.items.map((song) => songIds.push(song.track.id))
        //get audio_features
        let audio_features = [];
        axios
          .get(`https://api.spotify.com/v1/audio-features?ids=${songIds}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.state.token}`
            },
          })
          .then((res) => audio_features = res.data)
          .then((res) => {
            
            //console.log("audio_features", audio_features);
            response.items.map((song) => {
              let artists = '';
              song.track.artists.map((artist, index) => {
                artists += artist.name + ', ';
              })
              let length = artists.length - 2;
              let allArtists = artists.slice(0,length);
              //filter song.id to matching audio_features id and pass to variable
              
              let song_af = audio_features.audio_features.filter((track) => track.id === song.track.id)

              const track = {
                name: song.track.name,
                artist: allArtists,
                id: song.track.uri,
                track: song.track,
                //push audio_features here
                audioFeatures: song_af  
              }
            tracks.push(track);
          })
          //.catch((err) => alert("Error: " + err))
        })
      })
      .then((response) => this.setState({songListPreview: tracks}, () => console.log("songListPreview updated", this.state.songListPreview)))
      
      
       
     
     
      
  }

  //toggles the display of the Activities in Column 2
  

  onShowActivities = () => {
    this.setState({showActivities: !this.state.showActivities})
  }

  onShowGenres = () => {
    this.setState({showGenres: !this.state.showGenres})
  }

  // this queues up the song that was clicked in the user's spotify queue list and then 
  // skips to the next track, essentially playing the song that was clicked.
  playSong = (id) => {
    console.log("id", id);
    spotifyWebApi.queue(id)
      .then((response) => spotifyWebApi.skipToNext())    
  }

  clearPlaylist = () => {
    this.setState({songListPreview: [], query: []},
      () => this.transferSize());
  }

  clearFinalPlaylist = () => {
    this.setState({finalList: []},
      () => this.transferSize());
  }

  deleteTrackPreview = (id) => {
    const deleted = this.state.songListPreview.filter((song) => song.id !== id);
    this.setState({songListPreview: deleted},
      () => this.transferSize()
    )
  }

  addSong = (id) => {
    const add = this.state.songListPreview.filter((song) => song.id === id);
    const duplicate = this.state.finalList.filter((song) => song.id === id);
    console.log("add", add, "duplicate", duplicate);
    if (duplicate.length === 0 && this.state.finalList.length < this.state.maxTransferSize){
      this.setState({
        finalList: [...this.state.finalList, add[0]]
      });
      const removed = this.state.songListPreview.filter((song) => song.id !== add[0].id)
      this.setState({songListPreview: removed}, () => this.transferSize())
    } 
    
  }

  deleteTrackFinal = (id) => {
    const deleted = this.state.finalList.filter((song) => song.id !== id);
    this.setState({finalList: deleted},
      () => this.transferSize()
    )
  }

  transferSize() {
    const {songListPreview, maxTransferSize, finalList} = this.state;
    const transferSize = maxTransferSize - finalList.length;
    if (transferSize > songListPreview.length) this.setState({transferSize: songListPreview.length});
    else this.setState({transferSize})
  }

  transferPlaylist = () => {
    const { songListPreview, maxTransferSize, finalList } = this.state;
    let index;
    let add = [];
    let removed = [];
    let duplicate = [];
    let fromList = songListPreview;
    let toList = finalList;
    while ((fromList.length > 0) && (toList.length < maxTransferSize)){
    //for (let i = 0; i < 5; i++){

    
      index = Math.floor(Math.random() * (fromList.length - 1));
      console.log("index", index);
      add = fromList.filter((song) => song.id === fromList[index].id);
      console.log("add", add);
      duplicate = toList.filter((song) => song.id === add[0].id);
      console.log("duplicate", duplicate);
      if (duplicate.length === 0){
        console.log("here");
        toList.push(add[0]);
        
      }
      removed = fromList.filter((song) => song.id !== add[0].id);
      
      fromList = removed;
      
      console.log("fromList", fromList, "toList", toList);
    }
    this.setState({songListPreview: fromList, finalList: toList}, () => this.transferSize());
  }

  savePlaylistToLibrary = (name) => {
    let playlistID = '';
    let songs = [];
    this.state.finalList.map((song) => {
      songs.push(song.id)
    })
    console.log("here", this.state.user.userID, name);
    spotifyWebApi.createPlaylist(this.state.user.userID, { name: name })
      .then((response) => { playlistID = response.id})
      .then((response) => {
        spotifyWebApi.addTracksToPlaylist(playlistID, songs)
          .then((response) => alert("playlist has been added to your Account"))
      })

  }

  saveSearchHistory = (searchName) => {
    this.setState({searchName: searchName})
  }



  render() {
    return (
      
      <div style={{ margin: "10px 10px", }}>
        <Menu 
          loggedIn={this.state.loggedIn} 
          userInfo={this.state.user.userID}
        />
        <br />
        <Content 
          handleDisplay={(event) => this.handleDisplay(event)}
          isDisplayed={this.state.display}
          user={this.state.user}
          //onShowActivities={this.onShowActivities}
          //showActivities={this.state.showActivities}
          //onShowGenres={this.onShowGenres}
          //showGenres={this.state.showGenres}
          searchPlaylists={this.searchPlaylists}
          songListPreview={this.state.songListPreview}
          playSong={this.playSong}
          clearPlaylist={this.clearPlaylist}
          deleteTrackPreview={this.deleteTrackPreview}
          addSong={this.addSong}
          transferSize={this.state.transferSize}
          finalList={this.state.finalList}
          transferPlaylist={this.transferPlaylist}
          clearFinalPlaylist={this.clearFinalPlaylist}
          deleteTrackFinal={this.deleteTrackFinal}
          savePlaylistToLibrary={this.savePlaylistToLibrary}
          saveSearchHistory={(name) => this.saveSearchHistory(name)}
        />
        
      

      </div>



      // <div className="App">

      //   <Button
      //     href="http://localhost:8888"
      //     variant="contained" 
      //     color="primary">
      //     LogIn
      //   </Button>
      //   <div>Now Playing: { this.state.nowPlaying.name }</div>
      //   <div>
      //     <img src = {this.state.nowPlaying.image} style={{width: 100}}/>
      //   </div>
      //   <Button 
      //     onClick={() => this.getNowPlaying()} 
      //     variant="contained"
      //     color="secondary">
      //       Check Now Playing
      //   </Button>
      // </div>
    );
  }
}

export default App;
