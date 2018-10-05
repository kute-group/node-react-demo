import React, { Component } from 'react';

export default class AuthLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  render() {
    const { showPassword } = this.state;
    return (
      <div>
        <div className="form-group">
          <label>Email</label>
          <input
            value={this.props.forms.email || ''}
            onChange={value => this.props.changeInputs(value, 'email')}
            placeholder="E-mail"
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            value={this.props.forms.password || ''}
            onChange={value => this.props.changeInputs(value, 'password')}
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
