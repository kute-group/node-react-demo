import React from 'react';
import io from 'socket.io-client';
import { API } from '../../config.json';

import './chat.css';
import helpers from '../../helpers';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: '',
      message: '',
      messages: [],
    };
    this.socket = io('localhost:3000');
    this.socket.on('RECEIVE_MESSAGE', function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      this.setState({ messages: [data, ...this.state.messages] });
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        author: this.state.nickname,
        message: this.state.message,
      });
      this.setState({ message: '' });
    };
  }
  async componentDidMount() {
    const chatList = await helpers.get(`${API}/chat`);
    this.setState({
      messages: chatList.list,
    });
  }
  async postMessage() {
    const body = {
      nickname: this.state.nickname,
      content: this.state.message,
    };
    const posted = await helpers.post(`${API}/chat`, body);
    this.setState({ message: '' });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Global Chat</div>
                <hr />
                <div className="messages">
                  {this.state.messages.map(message => {
                    return (
                      <div key={message._id}>
                        {message.nickname}: {message.content}
                      </div>
                    );
                  })}
                </div>
                <div className="footer">
                  <input
                    type="text"
                    placeholder="Username"
                    value={this.state.nickname}
                    onChange={ev =>
                      this.setState({ nickname: ev.target.value })
                    }
                    className="form-control"
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="Message"
                    className="form-control"
                    value={this.state.message}
                    onChange={ev => this.setState({ message: ev.target.value })}
                  />
                  <br />
                  <button
                    onClick={() => this.postMessage()}
                    className="btn btn-primary form-control"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
