import React from 'react'
import MusicItem from './MusicItem'

function MusicListing(props) {
  return (
    <div className='music-listing'>
        {
          props.songs.map((song, _) => (
            renderSong(song, props, _)
          ))
        }
    </div>
  )
}

function renderSong(song, props, key){
  return (
    <MusicItem 
      info={{song: song}} 
      onClick = {() => props.handleClick(key)}
      key={song.id}
    />
  );
}

export default MusicListing