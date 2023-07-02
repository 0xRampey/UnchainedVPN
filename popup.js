
document.getElementById('toggle-proxy').addEventListener('click', () => {
  const server = "7d1pbbm2jhe2lfl5vc5n0jla1k.ingress.boxedcloud.net";
  const port = 31833;
  chrome.storage.sync.get("proxyEnabled", (data) => {
    const newStatus = !data.proxyEnabled;
    if (newStatus) {
      chrome.runtime.sendMessage({ type: 'ENABLE_PROXY', server, port });
    } else {
      chrome.runtime.sendMessage({ type: 'DISABLE_PROXY' });
    }
  });
});

function updateUI(proxyEnabled) {
  const toggleProxyButton = document.getElementById("toggle-proxy");
  if (proxyEnabled) {
    //   document.getElementById("locked").style.display = "none";
    //   document.getElementById("unlocked").style.display = "block";
    document.getElementById("status-text").innerText = "Connected!";
    toggleProxyButton.innerText = "Disconnect";
    toggleProxyButton.classList.add("disable-proxy");
    toggleProxyButton.classList.remove("enable-proxy");

    document.getElementById("connected-animation").beginElement();
  } else {
    //   document.getElementById("locked").style.display = "block";
    //   document.getElementById("unlocked").style.display = "none";
    document.getElementById("status-text").innerText = "Not Connected";
    toggleProxyButton.innerText = "Connect now!";
    toggleProxyButton.classList.remove("disable-proxy");
    toggleProxyButton.classList.add("enable-proxy");

    document.getElementById("not-connected-animation").beginElement();
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
