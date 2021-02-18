import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';

import App from './components/App.jsx';
const store = new Store();

store.ready().then(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#root'),
  );
});
