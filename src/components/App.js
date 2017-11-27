import React, { Component } from 'react'
import Header from 'components/Header/Header'
import MobileHeader from 'components/Header/MobileHeader'
import Routes from 'components/Routes'
import windowSize from 'react-window-size'
import http from 'http'
import 'styles/app.scss'

class App extends Component {
  componentDidMount() {
    // Ping the herokuapp url every 5 mins to prevent it from sleeping
    setInterval(function() {
      http.get('https://music-player-web-app.herokuapp.com/')
    }, 300000)
  }

  render() {
    const {props} = this;

    return (
      <div>
        {
          props.windowWidth >= 1000 ?
          <Header /> :
          <MobileHeader />
        }
        <Routes />
      </div>
    )
  }
}

export default windowSize(App)
