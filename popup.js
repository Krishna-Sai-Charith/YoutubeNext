document.getElementById('saveSettings').addEventListener('click', () => {
    const timerValue = parseInt(document.getElementById('timer').value, 10);
    if (!isNaN(timerValue) && timerValue > 0) {
        chrome.storage.local.set({ autoplayTimer: timerValue });
    }
});

document.getElementById('toggleAutoplay').addEventListener('click', () => {
    chrome.storage.local.get('autoplayEnabled', (data) => {
        const newState = !data.autoplayEnabled;
        chrome.storage.local.set({ autoplayEnabled: newState });

        // Update button text based on state
        document.getElementById('toggleAutoplay').textContent = newState ? 'Stop Autoplay' : 'Start Autoplay';
    });
});

// Set initial button text and timer value
chrome.storage.local.get(['autoplayEnabled', 'autoplayTimer'], (data) => {
    document.getElementById('toggleAutoplay').textContent = data.autoplayEnabled ? 'Stop Autoplay' : 'Start Autoplay';
    document.getElementById('timer').value = data.autoplayTimer || 45;
});