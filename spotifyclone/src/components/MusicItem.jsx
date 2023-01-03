import React from 'react'

function MusicItem(props) {
  const song = props.info.song;
  let iconClass = 'fa-regular fa-2x ' + (song.isPlaying == true ? 'fa-circle-pause' : 'fa-circle-play');
  return (
    <div className='song-item'>
        <img src={song.cover} alt={song.id} />
        <span>{song.name}</span>
        <span className='music-item-control'>
          <i className={iconClass} onClick={props.onClick}></i>
        </span>
    </div>
  )
}

export default MusicItem