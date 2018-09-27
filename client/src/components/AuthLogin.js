import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AuthLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }
  static propTypes = {
    prop: PropTypes,
  };

  render() {
		const { showPassword } = this.state;
    return (
      <div>
        <div className="form-group">
          <label>Email</label>
          <input placeholder="E-mail" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            className="form-control"
          />
          <i
            onClick={() =>
              this.setState({ showPassword: !this.state.showPassword })
            }
            className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
          />
        </div>
      </div>
    );
  }
}
