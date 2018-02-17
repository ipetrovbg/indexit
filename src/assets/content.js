chrome.runtime.onMessage.addListener(function(message, sender, callback) {
  switch (message.type) {
    case 'get-url':
      callback({url: window.location ,title: window.document.title, description: window.document.title} );
      break;
    case 'open-url':
      chrome.runtime.sendMessage({ message: "open_new_tab", url: message.data.url});
      callback(true);
      break;
    case 'validate':
      callback(window);
      break;
  }
});
