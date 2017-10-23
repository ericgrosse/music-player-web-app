import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'components/Home/Home.scss'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      organization: '',
      city: '',
      telephone: '',
      ext: '',
      emailAddress: '',
      projectDetails: '',
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const {state} = this;

    return (
      <div className="Home">
        <div className="wrapper">
          <div className="section banner">
            <div className="sub sub-1">
              <audio controls="controls">
                <source src="http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg" type="audio/ogg" />
                <source src="track.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
              </audio>
            </div>

            <div className="sub sub-2">
              <div id="columns">
                <div className="column" draggable="true"><header>A</header></div>
                <div className="column" draggable="true"><header>B</header></div>
                <div className="column" draggable="true"><header>C</header></div>
              </div>
            </div>

            <div className="sub sub-3">
              Sub 3
            </div>

            <div className="sub sub-4">
              Sub 4
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home
