browser.runtime.onMessage.addListener(undoFrameResize);

function undoFrameResize() {
    let querying = browser.tabs.query({currentWindow: true, active: true});
    querying.then(sendResize);
}

function sendResize(tabs) {
    console.log(tabs[0].id);
    browser.tabs.sendMessage(tabs[0].id, "undo")
}