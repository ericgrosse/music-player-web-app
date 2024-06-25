import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      audioSrc: 'http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg',
      audioType: 'audio/ogg',
      files: [],
      playbackRate: 1,
      audioContext: new (window.AudioContext || window.webkitAudioContext)(),
      noiseBuffer: null,
      attackTime: 0.01,  // Default attack time
      decayTime: 0.3,    // Default decay time
      pitch: 60,         // Default pitch (Hz)
      noiseLevel: 0.5,   // Default noise level
      filterCutoff: 1000 // Default filter cutoff frequency (Hz)
    };
  }

  componentDidMount() {
    this.createNoiseBuffer();
  }

  createNoiseBuffer = () => {
    const { audioContext } = this.state;
    const bufferSize = audioContext.sampleRate * 2;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    this.setState({ noiseBuffer: buffer });
  };

  onDrop = (files) => {
    const self = this;
    let file = files[0];

    if (file.type === 'audio/mpeg' || file.type === 'audio/x-m4a') {
      let reader = new FileReader();

      reader.onload = function (e) {
        self.audioArea.src = reader.result;
        self.audioArea.play();
      };

      reader.readAsDataURL(file);
    } else {
      self.audioArea.src = 'http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg';
      console.log('audio not supported, switching to default song...');
    }
  };

  changeSetting = (setting, value) => {
    this.setState({ [setting]: value });
  };

  playDrumSound = () => {
    const { audioContext, noiseBuffer, attackTime, decayTime, pitch, noiseLevel, filterCutoff } = this.state;

    // Create an envelope for amplitude
    const envelope = audioContext.createGain();
    envelope.gain.setValueAtTime(0, audioContext.currentTime);
    envelope.gain.linearRampToValueAtTime(1, audioContext.currentTime + attackTime);
    envelope.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + attackTime + decayTime);
    envelope.connect(audioContext.destination);

    // Create oscillators for the pitch
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(pitch, audioContext.currentTime);
    oscillator.connect(envelope);
    oscillator.start();

    // Create a noise source for the percussive element
    const noiseSource = audioContext.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // Filter to shape the noise
    const noiseFilter = audioContext.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(filterCutoff, audioContext.currentTime);

    // Create noise envelope
    const noiseEnvelope = audioContext.createGain();
    noiseEnvelope.gain.setValueAtTime(noiseLevel, audioContext.currentTime);
    noiseEnvelope.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + attackTime + decayTime);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseEnvelope);
    noiseEnvelope.connect(audioContext.destination);
    noiseSource.start();

    // Stop all sources after the decay time
    setTimeout(() => {
      oscillator.stop();
      noiseSource.stop();
    }, (attackTime + decayTime) * 1000);
  };

  render() {
    const { state } = this;

    return (
      <div className="App">
        <div className="container">
          <section>
            <h1>Music Player Web App</h1>
            <div className="dropzone">
              <Dropzone onDrop={this.onDrop}>
                <p>Try dropping some files here, or click to select files to upload.</p>
              </Dropzone>
            </div>

            <aside>
              <h2>Dropped files</h2>
              <ul>{this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)}</ul>
            </aside>
          </section>

          <section>
            <audio ref={input => { this.audioArea = input; }} src={state.audioSrc} controls playbackRate={2} />

            <div className="playback-control-container">
              <input id="playbackControl" type="range" value={state.playbackRate} min="0.1" max="4" step="0.01" onInput={this.changePlaybackRate} />
              <p>Playback Rate <span id="currentPlaybackRate">{state.playbackRate}</span></p>
            </div>
          </section>

          <section>
            <div className="drum-control">
              <label htmlFor="attackTime">Attack Time (s):</label>
              <input
                id="attackTime"
                type="range"
                min="0.01"
                max="1"
                step="0.01"
                value={state.attackTime}
                onChange={(e) => this.changeSetting('attackTime', parseFloat(e.target.value))}
              />
              <span>{state.attackTime}s</span>
            </div>

            <div className="drum-control">
              <label htmlFor="decayTime">Decay Time (s):</label>
              <input
                id="decayTime"
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={state.decayTime}
                onChange={(e) => this.changeSetting('decayTime', parseFloat(e.target.value))}
              />
              <span>{state.decayTime}s</span>
            </div>

            <div className="drum-control">
              <label htmlFor="pitch">Pitch (Hz):</label>
              <input
                id="pitch"
                type="range"
                min="30"
                max="100"
                step="1"
                value={state.pitch}
                onChange={(e) => this.changeSetting('pitch', parseFloat(e.target.value))}
              />
              <span>{state.pitch} Hz</span>
            </div>

            <div className="drum-control">
              <label htmlFor="noiseLevel">Noise Level:</label>
              <input
                id="noiseLevel"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={state.noiseLevel}
                onChange={(e) => this.changeSetting('noiseLevel', parseFloat(e.target.value))}
              />
              <span>{state.noiseLevel}</span>
            </div>

            <div className="drum-control">
              <label htmlFor="filterCutoff">Filter Cutoff (Hz):</label>
              <input
                id="filterCutoff"
                type="range"
                min="500"
                max="5000"
                step="100"
                value={state.filterCutoff}
                onChange={(e) => this.changeSetting('filterCutoff', parseFloat(e.target.value))}
              />
              <span>{state.filterCutoff} Hz</span>
            </div>

            <button onClick={this.playDrumSound}>Play Drum Sound</button>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
