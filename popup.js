
let isChecked = false;

let checkbox = document.getElementById("extension-enable");

const switchChecked = () => {
    isChecked = !isChecked;
    checkbox.checked = isChecked;
    console.log('switching');
    console.log(isChecked);
    chrome.storage.sync.set({'isEnabled': isChecked});
}

chrome.storage.sync.get(['isEnabled']).then((result) => {
    console.log("Popup");
    isChecked = result.isEnabled;
    checkbox.checked = isChecked;
  });

checkbox.addEventListener("change", async ()=>{
    switchChecked();
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: ()=>{
          console.log("refreshing");
          window.location.reload();
        },
    });
    console.log("executed");
});