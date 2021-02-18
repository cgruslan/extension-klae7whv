import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <aside class="menu">
        <p class="menu-label">
          Find
        </p>
        <ul class="menu-list">
          <li>
            <Link to="/names-finder/">Companies</Link>
          </li>
          <li>
            <Link to="/details-finder/">Business details</Link>
          </li>
        </ul>

        <p class="menu-label">
          Utilities
        </p>
        <ul class="menu-list">
          <li>
            <Link to="/data/">Data</Link>
          </li>
        </ul>
      </aside>
    );
  }
}

export default Home;
