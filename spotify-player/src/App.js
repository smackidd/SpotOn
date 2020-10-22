import React, { Component } from 'react';

import './App.css';
import Button from '@material-ui/core/Button';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(props){
    super(props);
    const params = this.getHashParams();
    this.state={
      loggedIn: params.access_token ? true : false,
      token: params.access_token,
      nowPlaying: {
        name: 'Not Checked',
        image: ''
      }
    }
    if (params.access_token){
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            image: response.item.album.images[0].url
          }
        })
      })
  }

  render() {
    return (
      <div className="App">
      
        <Button
          href="http://localhost:8888"
          variant="contained" 
          color="primary">
          LogIn
        </Button>
        <div>Now Playing: { this.state.nowPlaying.name }</div>
        <div>
          <img src = {this.state.nowPlaying.image} style={{width: 100}}/>
        </div>
        <Button 
          onClick={() => this.getNowPlaying()} 
          variant="contained"
          color="secondary">
            Check Now Playing
        </Button>
      </div>
    );
  }
}

export default App;
