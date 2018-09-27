import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AuthRegister extends Component {
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
		console.log(this.props)
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
          <label>Full name</label>
          <input
						value={this.props.forms.fullname || ''}
						onChange={value => this.props.changeInputs(value, 'fullname')}
            placeholder="Full name"
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
        <div className="form-group">
          <label>Re-Password</label>
          <input
						value={this.props.forms.repassword || ''}
						onChange={value => this.props.changeInputs(value, 'repassword')}
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
