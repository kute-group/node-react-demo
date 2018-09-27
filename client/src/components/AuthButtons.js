import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AuthRegister extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    return (
      <div className="form-group">
        <button
          onClick={() => this.props.onReset()}
          type="button"
          className="btn btn-danger"
        >
          Reset
        </button>
        <button
          onClick={() => this.props.onSubmit()}
          type="button"
          className="btn btn-primary"
        >
          Submit
        </button>
        {this.props.tab === 'LOGIN' && (
          <button
            type="button"
            className="btn btn-link pull-right"
            onClick={() => this.props.changeTab('REGISTER')}
          >
            Register a new account
          </button>
        )}
        {this.props.tab === 'REGISTER' && (
          <button
            type="button"
            className="btn btn-link pull-right"
            onClick={() => this.props.changeTab('LOGIN')}
          >
            Click here to login
          </button>
        )}
      </div>
    );
  }
}
