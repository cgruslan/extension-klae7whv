import { compose, filter, map } from 'ramda';
import { sleep } from '../../utils';
import * as types from '../../background/constants/ActionTypes';
import store from '../store';

function getInnerText(element) {
  const innerText = element.innerText.trim();
  const result = innerText.match(/(?:at|@)\s+(.*)$/i);
  return result && result[1].toLowerCase();
}

function extractNames() {
  return compose(
    filter(Boolean),
    map(getInnerText),
  )(document.querySelectorAll('.search-result__info > P:first-of-type'));
}

async function scrollToLoad() {
  for (let i = 0; i <= 5; i++) {
    setTimeout(() => {
      window.scrollTo(0, i * 400);
    }, i * 200);
  }

  return sleep(1500);
}

function clickNextButton() {
  const nextBtn = document.querySelector('.artdeco-pagination__button--next');
  nextBtn && !nextBtn.disabled && nextBtn.click();
}

const namesFinder = (function () {
  let isRunning = false;

  async function start(times = 5) {
    if (isRunning) return;
    isRunning = true;

    while (times-- > 0) {
      if (!isRunning) break;
      await scrollToLoad();
      
      store.dispatch({
        type: types.ADD_BUSINESS_NAMES,
        names: extractNames(),
      });
      
      if (times > 0) {
        clickNextButton();
        await sleep(4000);
      } else {
        isRunning = false;
        store.dispatch({ type: types.SET_CURRENT_TASK, task: '' });
      }
    }
  }

  function stop() {
    isRunning = false;
  }

  function toggle(times) {
    isRunning ? stop() : start(times);
  }

  return {
    toggle,
  };
}());

export function toggleNamesFinder(times) {
  namesFinder.toggle(times);
}
