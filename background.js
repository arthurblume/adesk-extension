chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Received message:', request);
    if (request.action === 'sendTabs') {
        console.log('Action is sendTabs, querying tabs...');
        chrome.tabs.query({}, (tabs) => {
            console.log('Tabs retrieved:', tabs);
            const tabsInfo = tabs.map(tab => ({
                title: tab.title,
                url: tab.url,
                favIconUrl: tab.favIconUrl
            }));

            tabs.forEach(tab => {
                if (tab.url.startsWith('http://localhost') || tab.url.startsWith('https://adesk.arthurblume.com')) {
                    console.log('Matching tab found:', tab);
                    const targetOrigin = tab.url.startsWith('http://localhost') ? 'http://localhost' : 'https://adesk.arthurblume.com';
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        func: (tabsInfo, targetOrigin) => {
                            console.log('Sending message to tab:', tabsInfo);
                            window.postMessage({ type: 'TABS_LIST', tabs: tabsInfo }, targetOrigin);
                        },
                        args: [tabsInfo, targetOrigin]
                    });
                }
            });
        });
    }
}); 