import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Chat, Auth, NotFound } from './containers';
import registerServiceWorker from './registerServiceWorker';

export default class Root extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/auth" component={Auth} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
