import React, { Component } from 'react';
import App from '../App';

import helpers from '../helpers';
import { API } from '../config.json';
import { images } from '../assets/images';
class Home extends Component {
  render() {
    return (
      <App>
				<h1>List products</h1>
        <ul className="list-product">
          <li>
            <img src={images.logo} alt="" />
            <h3>iphone 6s 64gb</h3>
						<h4>6.000.000 (vnd)</h4>
						<p>the best product ever the best product ever the best product ever</p>
          </li>
					<li>
            <img src={images.logo} alt="" />
            <h3>iphone 6s 64gb</h3>
						<h4>6.000.000 (vnd)</h4>
						<p>the best product ever the best product ever the best product ever</p>
          </li>
        </ul>
      </App>
    );
  }
}

export default Home;
