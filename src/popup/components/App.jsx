import React, { Component } from 'react';

import AppRouter from '../pages/AppRouter.jsx';

class App extends Component {
  render() {
    return (
      <div className="container" style={{ margin: '10px 15px' }}>
        <AppRouter />
      </div>
    );
  }
}

export default App;
