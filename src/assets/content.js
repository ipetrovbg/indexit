chrome.runtime.onMessage.addListener(function(message, sender, callback) {
  switch (message) {
    case 'get-url':
      callback({url: window.location ,title: window.document.title, description: window.document.title} );
      break;
  }
});
