import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'components/Header/MobileHeader.scss'

class MobileHeader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showHeader: false
    }
  }

  toggleHeader = () => {
    this.setState({showHeader: !this.state.showHeader})
  }

  render () {
    const {state, props} = this;

    return (
      <div className="MobileHeader">
        <i className="fa fa-bars" onClick={this.toggleHeader}/>

        <div className={'header-content' + (state.showHeader ? ' expanded': '')}>
          <div className="gutter"/>

          <Link className="header home-button" to='/'>Home</Link>
          <Link className="header about-button" to='/about'>About</Link>
          <Link className="header services-button" to='/services'>Services</Link>
          <Link className="header portfolio-button" to='/portfolio'>Portfolio</Link>
          <Link className="header quote-request-button" to='/quote-request'>Quote Request</Link>
          <Link className="header quote-request-button" to='/contact'>Contact</Link>

          <div className="gutter"/>
        </div>
      </div>
    )
  }
}

export default MobileHeader
