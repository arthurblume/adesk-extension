// Create a button element
const button = document.createElement('button');
button.textContent = 'Send Tabs to Excalidraw';
button.style.position = 'fixed';
button.style.bottom = '20px';
button.style.right = '20px';
button.style.padding = '10px 20px';
button.style.fontSize = '16px';
button.style.zIndex = '1000';

// Append the button to the body
document.body.appendChild(button);

// Add click event listener to the button
button.addEventListener('click', () => {
    console.log("Button clicked.");
    chrome.runtime.sendMessage({ action: 'sendTabs' });
});

// Add a message event listener to handle incoming messages
window.addEventListener('message', (event) => {
    // Validate the origin of the message
    if (event.origin === 'http://localhost' || event.origin === 'https://adesk.arthurblume.com') {
        console.log('Received message:', event.data);
    }
}); 