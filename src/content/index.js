import * as methods from './methods';

import store from './store';

store.ready().then(() => {
  if (store.getState().currentTask === 'DETAILS') {
    methods.findDetails(document.location.pathname);
  }

  chrome.runtime.onMessage.addListener((request, sender) => {
    if (sender.tab) {
      return;
    }
  
    switch (request.type) {
      case 'CALL':
        const { method, args } = request;
        return methods[method](...args);
      
      default:
        return;
    }
  });
});
