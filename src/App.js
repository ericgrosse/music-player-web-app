import React, { Component } from 'react';
import './App.scss';
import DrumControls from './components/DrumControls';
import DropzoneAudio from './components/DropzoneAudio';
import PlaybackControl from './components/PlaybackControl';

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

  handleDrop = (files) => {
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

  changePlaybackRate = (e) => {
    const newPlaybackRate = parseFloat(e.target.value);
    this.audioArea.playbackRate = newPlaybackRate;
    this.setState({ playbackRate: newPlaybackRate });
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
            <DropzoneAudio files={state.files} handleDrop={this.handleDrop} />
          </section>

          <section>
            <audio ref={input => { this.audioArea = input; }} src={state.audioSrc} controls />
            <PlaybackControl playbackRate={state.playbackRate} changePlaybackRate={this.changePlaybackRate} />
          </section>

          <section>
            <DrumControls
              attackTime={state.attackTime}
              decayTime={state.decayTime}
              pitch={state.pitch}
              noiseLevel={state.noiseLevel}
              filterCutoff={state.filterCutoff}
              changeSetting={this.changeSetting}
              playDrumSound={this.playDrumSound}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default App;
