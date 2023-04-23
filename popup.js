document.getElementById('proxy-form').addEventListener('submit', (e) => {
	e.preventDefault();
	const server = document.getElementById('server').value;
	const port = parseInt(document.getElementById('port').value);
  
	if (server && port) {
	  chrome.storage.sync.set({ server, port }, () => {
		chrome.runtime.sendMessage({ type: 'SET_PROXY', server, port });
		window.close();
	  });
	}
  });

  document.getElementById('disable-proxy').addEventListener('click', () => {
	chrome.runtime.sendMessage({ type: 'DISABLE_PROXY' });
	window.close();
  });