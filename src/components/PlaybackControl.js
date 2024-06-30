import React from 'react';

const PlaybackControl = ({ playbackRate, changePlaybackRate }) => {
  return (
    <div className="playback-control-container">
      <input id="playbackControl" type="range" value={playbackRate} min="0.1" max="4" step="0.01" onInput={changePlaybackRate} />
      <p>Playback Rate <span id="currentPlaybackRate">{playbackRate}</span></p>
    </div>
  );
};

export default PlaybackControl;
