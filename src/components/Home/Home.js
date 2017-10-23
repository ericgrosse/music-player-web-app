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
    this.setState({files})
  }

  render() {
    const {state} = this;

    return (
      <div className="Home">
        <section>
          <div className="dropzone">
            <Dropzone onDrop={this.onDrop.bind(this)}>
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
          </div>

          <aside>
            <h2>Dropped files</h2>
            <ul>{this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)}</ul>
          </aside>
        </section>
      </div>
    );
  }
}

export default Home
