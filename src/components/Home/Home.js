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
              Sub 1
            </div>

            <div className="sub sub-2">
              Sub 2
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
