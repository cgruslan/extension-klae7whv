import { compose, split, splitEvery, fromPairs } from 'ramda';
import { sleep } from '../../utils';

const summaryTemplate = {
  'Specialties': '-',
};

function filterPhoneFields(list) {
  const phonePos = list.indexOf('Phone');
  return phonePos === -1
    ? [...list]
    : [...list.slice(0, phonePos), ...list.slice(phonePos + 3)];
}

export async function findDetails(pathname) {
  await sleep(4000);

  if (pathname === '/results/companies/') {
    const resultLink = document.querySelector('.result__info > A');
    const companyId = (resultLink && resultLink.href.replace(/\D/g, '')) || '';

    chrome.runtime.sendMessage({
      type: 'DETAILS',
      id: companyId,
    });
  }

  if (pathname.match(/^\/(company|school)\/.+\/about\/$/)) {
    const titleEl = document.querySelector('.org-summary__title');
    const title = (titleEl || { innerText: '' }).innerText;

    const taglineEl = document.querySelector('.org__content > P');
    const tagline = (taglineEl || { innerText: '-' }).innerText;

    const employeesEl = document.querySelector('[data-name="all_employees"]');
    const employees = (employeesEl || { innerText: '' }).innerText.replace(/\D/g, '');
    
    const summary = compose(
      fromPairs,
      splitEvery(2),
      filterPhoneFields,
      split('\n'),
    )((document.querySelector('DL') || { innerText: '' }).innerText);

    const company = {
      title,
      employees,
      tagline,
      ...summaryTemplate,
      ...summary,
    };

    chrome.runtime.sendMessage({
      type: 'DETAILS',
      company,
    });
  }
}
