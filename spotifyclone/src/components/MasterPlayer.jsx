import React from 'react'

function MasterPlayer(props) {
  const iconClass = 'fa-regular fa-2x ' +
    (props.isPlaying === true ? 'fa-circle-pause' : 
    'fa-circle-play');
  return (
    <div className='master-player'>
      <input type="range" min={0} max={100} value={props.seekbarProgress} 
        className='seek-bar'
        onChange={props.seekAudio}
      />
      <div className="song-info">
        <span className="song-name">{props.name}</span>
        <input type="range" 
          className="volume-control" min={0} max={10}
          value={props.volume} onChange={props.changeVolume}
        />
      </div>
      <div className="icons">
        <i className="fa-solid fa-2x fa-backward" onClick={props.previousTrack}></i>
        <i className={iconClass} onClick={props.playPause}></i>
        <i className="fa-solid fa-2x fa-forward" onClick={props.nextTrack}></i>
      </div>
      <span className="a">1</span>
    </div>
  )
}

export default MasterPlayer