import { wrapStore } from 'webext-redux';
import store from './store';
import createListProcessor from './createListProcessor';

wrapStore(store);
window.listProcessor = createListProcessor();
