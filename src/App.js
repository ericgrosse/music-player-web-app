import React, { useState, useEffect, useRef } from 'react';
import './App.scss';
import DrumControls from './components/DrumControls';
import DropzoneAudio from './components/DropzoneAudio';
import PlaybackControl from './components/PlaybackControl';

const App = () => {
  const [audioSrc, setAudioSrc] = useState('http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg');
  const [files, setFiles] = useState([]);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [audioContext, setAudioContext] = useState(new (window.AudioContext || window.webkitAudioContext)());
  const [noiseBuffer, setNoiseBuffer] = useState(null);
  const [attackTime, setAttackTime] = useState(0.01);
  const [decayTime, setDecayTime] = useState(0.3);
  const [pitch, setPitch] = useState(60);
  const [noiseLevel, setNoiseLevel] = useState(0.5);
  const [filterCutoff, setFilterCutoff] = useState(1000);

  const audioAreaRef = useRef(null);

  useEffect(() => {
    createNoiseBuffer();
  }, []);

  const createNoiseBuffer = () => {
    const bufferSize = audioContext.sampleRate * 2;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    setNoiseBuffer(buffer);
  };

  const handleDrop = (files) => {
    let file = files[0];

    if (file.type === 'audio/mpeg' || file.type === 'audio/x-m4a') {
      let reader = new FileReader();

      reader.onload = function (e) {
        audioAreaRef.current.src = reader.result;
        audioAreaRef.current.play();
      };

      reader.readAsDataURL(file);
    } else {
      audioAreaRef.current.src = 'http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg';
      console.log('audio not supported, switching to default song...');
    }
  };

  const changePlaybackRate = (e) => {
    const newPlaybackRate = parseFloat(e.target.value);
    audioAreaRef.current.playbackRate = newPlaybackRate;
    setPlaybackRate(newPlaybackRate);
  };

  const changeSetting = (setting, value) => {
    switch (setting) {
      case 'attackTime':
        setAttackTime(value);
        break;
      case 'decayTime':
        setDecayTime(value);
        break;
      case 'pitch':
        setPitch(value);
        break;
      case 'noiseLevel':
        setNoiseLevel(value);
        break;
      case 'filterCutoff':
        setFilterCutoff(value);
        break;
      default:
        break;
    }
  };

  const playDrumSound = () => {
    // Ensure audio context is resumed
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    // Implement drum sound logic using state values
    const envelope = audioContext.createGain();
    envelope.gain.setValueAtTime(0, audioContext.currentTime);
    envelope.gain.linearRampToValueAtTime(1, audioContext.currentTime + attackTime);
    envelope.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + attackTime + decayTime);
    envelope.connect(audioContext.destination);

    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(pitch, audioContext.currentTime);
    oscillator.connect(envelope);
    oscillator.start();

    const noiseSource = audioContext.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = audioContext.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(filterCutoff, audioContext.currentTime);

    const noiseEnvelope = audioContext.createGain();
    noiseEnvelope.gain.setValueAtTime(noiseLevel, audioContext.currentTime);
    noiseEnvelope.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + attackTime + decayTime);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseEnvelope);
    noiseEnvelope.connect(audioContext.destination);
    noiseSource.start();

    setTimeout(() => {
      oscillator.stop();
      noiseSource.stop();
    }, (attackTime + decayTime) * 1000);
  };

  return (
    <div className="App">
      <div className="container">
        <section>
          <h1>Music Player Web App</h1>
          <DropzoneAudio files={files} handleDrop={handleDrop} />
        </section>

        <section>
          <audio ref={audioAreaRef} src={audioSrc} controls />
          <PlaybackControl playbackRate={playbackRate} changePlaybackRate={changePlaybackRate} />
        </section>

        <section>
          <DrumControls
            attackTime={attackTime}
            decayTime={decayTime}
            pitch={pitch}
            noiseLevel={noiseLevel}
            filterCutoff={filterCutoff}
            changeSetting={changeSetting}
            playDrumSound={playDrumSound}
          />
        </section>
      </div>
    </div>
  );
};

export default App;
