import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MainFooter extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    return (
      <footer className="footer">
        The appilication is developed by Luong Ba Hop
      </footer>
    );
  }
}
