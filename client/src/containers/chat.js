import React, { Component } from 'react';
import App from '../App';
import { ChatPage } from '../components';
export default class Chat extends Component {
  render() {
    return (
      <App>
        <ChatPage />
      </App>
    );
  }
}
