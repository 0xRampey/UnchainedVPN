
  document.getElementById('enable-proxy').addEventListener('click', () => {
	const server = "kqfuap25bpc33cvn56g08shs4g.ingress.boxedcloud.net";
	const port = 31534;

	chrome.storage.sync.set({ server, port }, () => {
		chrome.runtime.sendMessage({ type: 'ENABLE_PROXY', server, port });
	  });
  });

  document.getElementById('disable-proxy').addEventListener('click', () => {
	chrome.runtime.sendMessage({ type: 'DISABLE_PROXY' });
  });

  function updateUI(proxyEnabled) {
	if (proxyEnabled) {
	//   document.getElementById("locked").style.display = "none";
	//   document.getElementById("unlocked").style.display = "block";
	  document.getElementById("status-text").innerText = "Connected!";
	} else {
	//   document.getElementById("locked").style.display = "block";
	//   document.getElementById("unlocked").style.display = "none";
	  document.getElementById("status-text").innerText = "Not Connected";
	}
  }

  chrome.storage.onChanged.addListener((changes, areaName) => {
	if (areaName === "sync" && changes.proxyEnabled) {
	  updateUI(changes.proxyEnabled.newValue);
	}
  });

  chrome.storage.sync.get("proxyEnabled", (data) => {
	updateUI(data.proxyEnabled);
  });