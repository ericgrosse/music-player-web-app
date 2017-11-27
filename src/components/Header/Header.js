import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'components/Header/Header.scss'

class Header extends React.Component {
  render() {
    const {state, props} = this
    console.log(props)

    return (
          <div className="Header">
            <div className="gutter"/>

            <Link className="header home-button" to='/'>Home</Link>
            <Link className="header about-button" to='/about'>About</Link>
            <Link className="header services-button" to='/services'>Services</Link>
            <Link className="header portfolio-button" to='/portfolio'>Portfolio</Link>
            <Link className="header quote-request-button" to='/quote-request'>Quote Request</Link>
            <Link className="header quote-request-button" to='/contact'>Contact</Link>

            <div className="gutter"/>
          </div>
    )
  }
}

export default Header
