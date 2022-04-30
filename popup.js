
let isEnabled = false;

const activateButton = document.getElementById("extension-enable");

const setColor = (isActivated) => {
  if (isActivated) {
    activateButton.innerText = "Turn Off";
    activateButton.style.backgroundColor = "#00274C";
  } else {
    activateButton.innerText = "Turn On";
    activateButton.style.backgroundColor = "#BB0000";
  }
}

const switchChecked = () => {
    isEnabled = !isEnabled;
    setColor(isEnabled);
    chrome.storage.sync.set({'isEnabled': isEnabled});
}

chrome.storage.sync.get(['isEnabled']).then((result) => {
    setColor(result.isEnabled);
    isEnabled = result.isEnabled;
  });

activateButton.addEventListener("click", async ()=>{
    switchChecked();
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: ()=>{
          window.location.reload();
        },
    });
});