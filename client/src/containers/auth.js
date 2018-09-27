import React, { Component } from 'react';
import App from '../App';
import { AuthPage } from '../components';

class Auth extends Component {
  render() {
    return (
      <App>
        <AuthPage />
      </App>
    );
  }
}

export default Auth;
