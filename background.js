chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === 'SET_PROXY') {
	  const { server, port } = message;
  
	  const config = {
		mode: 'fixed_servers',
		rules: {
		  singleProxy: {
			scheme: 'http',
			host: server,
			port: port
		  },
		  bypassList: ['localhost']
		}
	  };
  
	  chrome.proxy.settings.set({ value: config, scope: 'regular' }, () => {
		console.log(`Proxy set to: http://${server}:${port}`);
	  });
	} else if (message.type === 'DISABLE_PROXY') {
		chrome.proxy.settings.set({ value: { mode: 'direct' }, scope: 'regular' }, () => {
		  console.log('Proxy disabled.');
		});
	  }
  });