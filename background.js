chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "get-tabs") {
    chrome.tabs.query({}, (tabs) => {
      const simplified = tabs.map(tab => ({
        title: tab.title,
        url: tab.url,
        favIconUrl: tab.favIconUrl,
      }));

      // Send the result to all tabs that have content.js injected
      tabs.forEach(tab => {
        if (
          tab.url &&
          (tab.url.startsWith("http://localhost") ||
           tab.url.startsWith("https://adesk.arthurblume.com"))
        ) {
          chrome.tabs.sendMessage(tab.id, {
            type: "TABS_LIST",
            tabs: simplified,
          });
        }
      });
    });
  }
});
