import { StorageManager } from '@/modules/storage';
import getFavicon from '@/utils/getFavicon';

export default defineBackground(() => {
    let favicon: string | undefined;
    browser.runtime.onMessage.addListener((message, _, sendResponse) => {
        console.log('Message from:', message);

        if (message.type === 'page-focused') {
            getFavicon(message.url).then((result) => {
                favicon = result;
                console.log('Favicon found:', favicon);
            });
            sendResponse({ status: `Page focused received` });
        } else if (message.type === 'page-unfocused') {
            StorageManager.savePageTime(message.url, message.time, favicon);
            favicon = undefined; //reset favicon so it doesn't get incorrectly saved to a different site
            sendResponse({ status: 'Page unfocused received' });
            console.log('Time spent on page:', message.time, message.url);

            setTimeout(() => {
                //testing only
                StorageManager.getAllStoredData().then((data) => {
                    console.log('Stored data:', data);
                });
            }, 3000);
        } else if (message.type === 'detect-idle') {
            console.log('idle dectection request received');
            if (chrome.idle) {
                chrome.idle.queryState(15, (idleState) => {
                    sendResponse({ status: idleState });
                });
            } else {
                sendResponse({ status: 'Error detecting idle state' });
            }
        } else {
            sendResponse({ status: 'Unknown message type' });
        }

        return true;
    });
});
