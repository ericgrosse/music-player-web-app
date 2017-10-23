import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Dropzone from 'react-dropzone'

import 'components/Home/Home.scss'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      audioSrc: 'http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg',
      audioType: 'audio/ogg',
      files: [],
    }
  }

  onDrop = (files) => {
    let file = files[0]
    let musicType = /mp3.*/

    if (file.type.match(musicType)) {
      let reader = new FileReader()

      reader.onload = function(e) {
        audioArea.src = reader.result
        audioArea.play()
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
      audioArea.src = 'http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg'
      console.log('audio not supported, switching to default song...')
    }
  }

  render() {
    const {state} = this;
    console.log(state)

    return (
      <div className="Home">
        <section>
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
          <audio id="audioArea" src={state.audioSrc} controls />
        </section>
      </div>
    );
  }
}

export default Home
