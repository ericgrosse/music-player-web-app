import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      audioSrc: 'http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg',
      audioType: 'audio/ogg',
      files: [],
      playbackRate: 1,
    }
  }

  onDrop = (files) => {
    let file = files[0]
    let musicType = /mp3.*/

    if (file.type.match(musicType)) {
      let reader = new FileReader()

      reader.onload = function(e) {
        this.audioArea.src = reader.result
        this.audioArea.play()
      }

      reader.onloadstart = function() {
        console.log('onloadstart')
      }

      reader.onprogress = function() {
        console.log('onprogress')
      }

      reader.onloadend = function() {
        console.log('onloadend')
      }

      reader.onabort = function() {
        console.log('onabort')
      }

      reader.onerror = function() {
        console.log('onerror')
      }

      reader.readAsDataURL(file)
    }
    else {
      this.audioArea.src = 'http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg'
      console.log('audio not supported, switching to default song...')
    }
  }

  changePlaybackRate = (e) => {
    this.audioArea.playbackRate = e.target.value
    this.setState({playbackRate: e.target.value})
  }

  render() {
    const {state} = this
    console.log(state)

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
            <audio ref={r => this.audioArea = r} src={state.audioSrc} controls playbackRate={2} />

            <div className="playback-control-container">
              <input id="playbackControl" type="range" value={state.playbackRate} min="0.5" max="4" step="0.01" onInput={this.changePlaybackRate} />
              <p>Playback Rate <span id="currentPlaybackRate">{state.playbackRate}</span></p>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default App
