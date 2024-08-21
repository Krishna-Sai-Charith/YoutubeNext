function isShortsPage() {
    return window.location.pathname.includes('/shorts/');
}

function autoplayShorts() {
    chrome.storage.local.get('autoplayEnabled', (data) => {
        if (data.autoplayEnabled && isShortsPage()) {
            chrome.storage.local.get('autoplayTimer', (data) => {
                const timer = data.autoplayTimer || 45;
                const nextButtonSelector = 'button[aria-label="Next video"]';
                const nextButton = document.querySelector(nextButtonSelector);

                if (nextButton) {
                    nextButton.click();
                }
            });
        }
    });
}

// Set an interval if autoplay is enabled
chrome.storage.local.get('autoplayEnabled', (data) => {
    if (data.autoplayEnabled) {
        chrome.storage.local.get('autoplayTimer', (data) => {
            const timer = data.autoplayTimer || 45;
            setInterval(autoplayShorts, timer * 1000);
        });
    }
});

// Handle changes in storage for autoplay state
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.autoplayEnabled) {
        if (changes.autoplayEnabled.newValue) {
            chrome.storage.local.get('autoplayTimer', (data) => {
                const timer = data.autoplayTimer || 45;
                setInterval(autoplayShorts, timer * 1000);
            });
        } else {
            // Clear existing intervals if autoplay is disabled
            clearInterval();
        }
    }
});