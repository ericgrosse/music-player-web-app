import React from 'react';

const DrumControls = ({ attackTime, decayTime, pitch, noiseLevel, filterCutoff, changeSetting, playDrumSound }) => {
  return (
    <div>
      <div className="drum-control">
        <label htmlFor="attackTime">Attack Time (s):</label>
        <input
          id="attackTime"
          type="range"
          min="0.01"
          max="1"
          step="0.01"
          value={attackTime}
          onChange={(e) => changeSetting('attackTime', parseFloat(e.target.value))}
        />
        <span>{attackTime}s</span>
      </div>

      <div className="drum-control">
        <label htmlFor="decayTime">Decay Time (s):</label>
        <input
          id="decayTime"
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={decayTime}
          onChange={(e) => changeSetting('decayTime', parseFloat(e.target.value))}
        />
        <span>{decayTime}s</span>
      </div>

      <div className="drum-control">
        <label htmlFor="pitch">Pitch (Hz):</label>
        <input
          id="pitch"
          type="range"
          min="30"
          max="100"
          step="1"
          value={pitch}
          onChange={(e) => changeSetting('pitch', parseFloat(e.target.value))}
        />
        <span>{pitch} Hz</span>
      </div>

      <div className="drum-control">
        <label htmlFor="noiseLevel">Noise Level:</label>
        <input
          id="noiseLevel"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={noiseLevel}
          onChange={(e) => changeSetting('noiseLevel', parseFloat(e.target.value))}
        />
        <span>{noiseLevel}</span>
      </div>

      <div className="drum-control">
        <label htmlFor="filterCutoff">Filter Cutoff (Hz):</label>
        <input
          id="filterCutoff"
          type="range"
          min="500"
          max="5000"
          step="100"
          value={filterCutoff}
          onChange={(e) => changeSetting('filterCutoff', parseFloat(e.target.value))}
        />
        <span>{filterCutoff} Hz</span>
      </div>

      <button onClick={playDrumSound}>Play Drum Sound</button>
    </div>
  );
};

export default DrumControls;
