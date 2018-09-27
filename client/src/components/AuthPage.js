import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import AuthLogin from './AuthLogin';
import AuthRegister from './AuthRegister';
import AuthButtons from './AuthButtons';
import helpers from '../helpers';
import { API } from '../config.json';

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'LOGIN',
      forms: {},
      loading: false,
    };
    this.noti = null;
  }
  fireNotification(noti) {
    if (!this.noti) {
      this.noti = null;
    }
    if (this.noti) {
      this.noti.addNotification(noti);
    }
  }
  componentDidMount() {
    this.noti = this.refs.notificationSystem;
  }
  async onSubmit() {
    this.setState({ loading: true });
    const body = {
      email: this.state.forms.email,
      username: this.state.forms.email,
      fullname: this.state.forms.fullname,
      password: this.state.forms.password,
      passwordConf: this.state.forms.repassword,
    };
    const result = await helpers.post(`${API}/auth/register`, body);
    if (result && result.status && result.status === 'success') {
      setTimeout(() => {
        this.fireNotification({
          message: 'Notification message',
          level: 'success',
        });
        this.setState({ forms: {}, tab: 'LOGIN', loading: false });
      }, 1000);
    } else {
			console.log('resultxxxxx', result);
      setTimeout(() => {
        this.fireNotification({
          message: `Error: ${result && result.message ? result.message : ''}`,
          level: 'error',
        });
        this.setState({ loading: false });
      }, 1000);
    }
  }
  onReset() {
    this.setState({ forms: {} });
  }
  changeTab(tab) {
    this.setState({ tab, form: {} });
  }
  changeInputs(value, field) {
    this.setState({
      forms: Object.assign({}, this.state.forms, {
        [field]: value.target.value,
      }),
    });
  }
  render() {
    const { tab } = this.state;
    let title;
    switch (tab) {
      case 'LOGIN':
        title = 'Login Form';
        break;
      case 'REGISTER':
        title = 'Register Form';
        break;
      default:
        title = 'Login Form';
        break;
    }
    console.log(this.state.forms);
    return (
      <div className="auth-page">
        <h2 onClick={this._addNotification}>{title}</h2>

        {this.state.loading && (
          <div className="loading">
            <div className="loader" />
          </div>
        )}
        <form action="">
          {tab === 'LOGIN' && (
            <AuthLogin
              forms={this.state.forms}
              changeInputs={(value, field) => this.changeInputs(value, field)}
            />
          )}
          {tab === 'REGISTER' && (
            <AuthRegister
              forms={this.state.forms}
              changeInputs={(value, field) => this.changeInputs(value, field)}
            />
          )}
          <AuthButtons
            tab={this.state.tab}
            onReset={() => this.onReset()}
            onSubmit={() => this.onSubmit()}
            changeTab={tab => this.changeTab(tab)}
          />
        </form>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}

export default AuthPage;
