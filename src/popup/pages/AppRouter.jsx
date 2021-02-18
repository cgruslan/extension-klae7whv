import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './Home.jsx';
import NamesFinder from './NamesFinder.jsx';
import DetailsFinder from './DetailsFinder.jsx';
import Data from './Data.jsx';

function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/names-finder/" component={NamesFinder} />
      <Route path="/details-finder/" component={DetailsFinder} />
      <Route path="/data/" component={Data} />
    </Router>
  );
}

export default AppRouter;
