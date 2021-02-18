import store from './store';
import * as types from './constants/ActionTypes';
import { sleep } from '../utils';

export default function createListProcessor() {
  const baseURL = 'https://example.com';
  let names = [];
  let currentCompany;

  function getResultsURL(name) {
    name = encodeURIComponent(name);
    return `${baseURL}/search/results/companies/?keywords=${name}`;
  }

  function getCompanyURL(id) {
    return `${baseURL}/company/${id}/about/`;
  }

  async function processList() {
    await sleep(1000);

    if (!names.length && !currentCompany) {
      return stop();
    }

    if (!currentCompany) {
      const name = names.shift();
      currentCompany = { name };
      chrome.tabs.update({ url: getResultsURL(name) });
    } else {
      const { id } = currentCompany;

      if (!id) {
        store.dispatch({
          type: types.ADD_BUSINESSES,
          businesses: [currentCompany],
        });
        currentCompany = null;
        return processList();
      }
      
      chrome.tabs.update({ url: getCompanyURL(id) });
    }
  }

  function start(list = []) {
    names = [...list];
    store.dispatch({ type: types.SET_CURRENT_TASK, task: 'DETAILS' });
    processList();
  }

  function stop() {
    names = [];
    currentCompany = null;
    store.dispatch({ type: types.SET_CURRENT_TASK, task: '' });
  }

  chrome.runtime.onMessage.addListener((request, sender) => {
    if (sender.tab && request.type === 'DETAILS') {
      if (typeof request.id === 'string') {
        currentCompany = { ...currentCompany, id: request.id };
        processList();
      } else {
        currentCompany = { ...currentCompany, ...request.company };
        store.dispatch({
          type: types.ADD_BUSINESSES,
          businesses: [currentCompany],
        });

        currentCompany = null;
        processList();
      }
    }
  });
  
  return {
    start,
    stop,
  };
}
