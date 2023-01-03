import React, { Component } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import MusicListing from './components/MusicListing';
import MasterPlayer  from './components/MasterPlayer';


export default class App extends Component {
  constructor(props){
    super(props);
    let songs = [];
    for (let index = 1; index <= 5 ; index++) {
      const song = {
        id:`${index}`,
        name: 'My people come alive',
        cover: `/covers/${index}.jpg`,
        src: `/songs/${index}.mp3`,
        isPlaying: false,
      };
      songs.push(song);
    }
    this.state = {
      currentSong: 0,
      songs: songs,
      isPlaying: false,
      seekBarProgress: 0,
      volume: 2,
    };

    this.audio = new Audio();
    this.audio.src = songs[0].src;
    this.audio.volume = (this.state.volume / 10) ?? 2;
    this.audio.ontimeupdate = (event) =>{
      this.updateSeekBar();
    }
  }

  updateSeekBar(){
    const audioLength = this.audio.duration;
    const currentTime= this.audio.currentTime;
    let progress = (currentTime * 100) / audioLength;
    if(isNaN(progress)){
      progress = 0;
    }
    this.setState({
      seekBarProgress: progress,
    });    
  }

  handleClick(key){
    this.switchToSong(key);
  }

  seekAudio(e){
    this.audio.currentTime = this.getAudioResumePoint(e.target.value);
  }

  getAudioResumePoint(progress){
    const audioLength = this.audio.duration;
    const audioResumeTime= (progress * audioLength) / 100;
    return audioResumeTime;
  }

  changeVolume(e){
    this.audio.volume = (e.target.value / 10) ?? 2;
    this.setState({
      volume: e.target.value/10,
    })
  }

  masterPlay(){
    const isPlaying = this.state.isPlaying;
    const songs = this.state.songs.slice();
    songs[this.state.currentSong].isPlaying = !isPlaying;
    if(isPlaying) this.audio.pause();
    else this.audio.play();
    this.setState({
      songs: songs,
      isPlaying: !isPlaying,
    })
  }

  //switch to the ith song in songs
  //toggle if ith song is the current song
  switchToSong(i){
    const songs = this.state.songs.slice();
    
    //changing to next song
    if(i != this.state.currentSong){
      songs[i].isPlaying = true;
      songs.forEach((song, idx) => {
        if(idx != i ) song.isPlaying = false;
      });
      this.audio.src = songs[i].src;
      this.audio.play();
      this.setState({
        currentSong: i,
        songs: songs,
        isPlaying: true,
        seekBarProgress: 0,
      });
      return;
    }
    
    if(i === this.state.currentSong){
      const isPlaying = this.state.isPlaying;
      songs[i].isPlaying = !isPlaying;
      if(isPlaying) this.audio.pause();
      else this.audio.play();

      this.setState({
        songs:songs,
        isPlaying: !isPlaying,
      });
    }
  }

  nextTrack(){
    const len = this.state.songs.length;
    let trackNumber = this.state.currentSong;
    trackNumber = (trackNumber + 1) % len;
    this.switchToSong(trackNumber);
  }
  
  previousTrack(){
    const len = this.state.songs.length;
    let trackNumber = this.state.currentSong;
    trackNumber = (trackNumber + len - 1) % len;
    this.switchToSong(trackNumber);
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <MusicListing 
          songs = {this.state.songs}
          currentSong = {this.state.currentSong}
          handleClick = {(key) => this.handleClick(key)}
         />
        <MasterPlayer 
          name = {this.state.songs[this.state.currentSong].src}
          isPlaying = {this.state.isPlaying}
          seekbarProgress = {this.state.seekBarProgress}
          seekAudio = {(e) => this.seekAudio(e)}
          playPause = {() => this.masterPlay()}
          nextTrack = {() => this.nextTrack()}
          previousTrack = {() => this.previousTrack()}
          changeVolume = {(e) => this.changeVolume(e)}
        />
      </div>
    );
  }
}
