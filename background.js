chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
    if (info.status === "complete") {
      chrome.scripting.executeScript({
        target: { tabId },
        files: ["content.js"],
      });
    }
  });
});
