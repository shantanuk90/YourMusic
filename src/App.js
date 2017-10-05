import React, {Component} from 'react'
import './App.css'
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import Profile from './Profile'
import Gallery from './gallery'

class App extends Component{
  constructor(props){
    super(props)
    this.state={
        query:'',
        artist:null,
        tracks:[]
    }
  }

  search(){
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/'
    console.log('fetch url' , FETCH_URL);
    var accessToken = 'BQBJbgiCyj2CZH4XrA3TTuWaIg4CcuDamaazxYzk5OafjWcxO_-7mehMW4Y3yBimJ1QQYMHvJfs8_Qxl_k02MDj9SV5jNYER5Riv2IhsKn3gBW8sKn0eKZ3gfdY9Dht4fcXM6vT9PvcWr4B1Jg1iFfgWN63xUB47';


    var myOptions = {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + accessToken},
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response =>response.json())
      .then(json =>{
          const artist = json.artists.items[0];
          this.setState({ artist });

          console.log('artist id', artist.id);
          FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
          fetch(FETCH_URL, myOptions)
              .then(response => response.json())
              .then(json => {
              console.log('artist\'s top tracks: ', json);
              const {tracks} = json;
              this.setState({ tracks });
          })
      })
  }

  render(){
    return(
      <div className="app">
        <div className="app-title"> Your Music - Your Own Music Library</div>
          <FormGroup>
              <InputGroup>
                  <FormControl type="text" placeholder="search for an Artist"
                  value={this.state.query}
                  onChange={event => {this.setState({query:event.target.value})}}
                  onKeyPress={event => {
                      if(event.key == 'Enter'){
                        this.search();
                      }
                  }}   />
                  <InputGroup.Addon onClick={()=>this.search()}>
                      <Glyphicon glyph="search"></Glyphicon>
                  </InputGroup.Addon>
              </InputGroup>
          </FormGroup>

          {
              this.state.artist !== null
              ?
              <div>
              <Profile
                  artist={this.state.artist}
               />

              <Gallery
                  tracks = {this.state.tracks}
              />
              </div>

              :<div></div>
          }

      </div>
    )

  }

}

export default App;
