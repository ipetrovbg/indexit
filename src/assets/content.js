chrome.runtime.onMessage.addListener(function(message, sender, callback) {
  switch (message.type) {
    case 'get-url':
      callback({url: window.location ,title: window.document.title, description: window.document.title} );
      break;
    case 'open-url':
      window.open(message.data.url);
      callback(true);
      break;
  }
});
