// Listen for messages from the ADesk web page
window.addEventListener("message", (event) => {
  // Security check: make sure it's from the same window
  if (event.source !== window) return;

  // Only respond to the expected message type
  if (event.data.type === "CALL_FOR_TABS") {
    // Forward the request to the background script
    chrome.runtime.sendMessage({ action: "get-tabs" });
  }
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TABS_LIST") {
    // Send the tab data back into the page context
    window.postMessage(
      {
        type: "TABS_LIST",
        tabs: message.tabs,
      },
      "*"
    );
  }
});
