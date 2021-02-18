export function sendMessage(message, cb) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, message, cb);
  });
}

export function call(method, ...args) {
  sendMessage({ type: 'CALL', method, args });
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
