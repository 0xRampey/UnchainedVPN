chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === 'ENABLE_PROXY') {
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
	  // Setup proxy with Chrome API
	  chrome.proxy.settings.set({ value: config, scope: 'regular' }, () => {
		// Store proxy conenction status in storage
		chrome.storage.sync.set({ proxyEnabled: true });
		console.log(`Proxy enabled`);
	  });
	  
	} else if (message.type === 'DISABLE_PROXY') {
		chrome.proxy.settings.set({ value: { mode: 'direct' }, scope: 'regular' }, () => {
		// Store proxy conenction status in storage
		chrome.storage.sync.set({ proxyEnabled: false });
		  console.log('Proxy disabled.');
		});
		
	  }
  });