import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { images } from '../assets/images';

export default class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'LOGIN',
    };
  }
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    return (
      <header className="header">
        <div className="wrap">
          <div className="logo">
            <img src={images.logo} alt="" />
            <h1 className="App-title">Welcome to React</h1>
          </div>
          <ul className="main-menu">
            <li>
              <NavLink activeClassName="active" to="/home">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/chat">
                Chat
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/auth">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}
