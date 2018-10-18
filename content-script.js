const main = 'https://developer.mozilla.org/en-US/docs/User:wbamberg/querySelectorExample';
const iframe = 'https://interactive-examples.mdn.mozilla.net/pages/webapi-tabbed/document-queryselector.html';

let href = document.location.href;

if (href === iframe) {
    console.log(href);

    runFrameScript();
} else {
    runMainScript();
}

function runFrameScript() {

    function undo() {
        // hide try it
        console.log('undo');
        tryit.style.display = 'none';
    
        // show the other bits we hid
        reset.style.display = 'block';
        tablist.style.display = 'block';
        outputLabel.style.display = 'block';
        consoleContainer.style.display = 'block';

        // restrict tab container width
        tabContainer.style.width = "60%";

        // undo overflow
        document.body.style.overflow = 'visible';

        // tell main script to undo iframe size
        browser.runtime.sendMessage("undo-iframe-sizing");
      }

    // create and add "Try it!"
    let tryit = document.createElement('button');
    tryit.classList.add('tryit');
    tryit.textContent = 'Try it!';
    tryit.style.float = 'none';
    tryit.style.marginLeft = '200px';
    tryit.addEventListener('click', undo)
    let header = document.querySelector('.output-header');
    header.appendChild(tryit);

    // hide various bits
    let reset = document.querySelector('.reset');
    let tablist = document.querySelector('#tablist');
    let outputLabel = document.querySelector('.output-label');
    let consoleContainer = document.querySelector('.console-container ');

    reset.style.display = 'none';
    tablist.style.display = 'none';
    outputLabel.style.display = 'none';
    consoleContainer.style.display = 'none';

    // editor needs 100% width
    let tabContainer = document.querySelector('#tab-container');
    tabContainer.style.width = "100%";

    // hide overflow
    document.body.style.overflow = 'hidden';
}

function runMainScript() {
    // resize iframe
    let frame = document.querySelector('.interactive');
    frame.style.width = "671px";
    frame.style.height = "380px";
}

browser.runtime.onMessage.addListener(undoFrameSize);

function undoFrameSize() {
    if (href === main) {
        // undo iframe sizing
        let frame = document.querySelector('.interactive');
        frame.style.width = "1000px";
        frame.style.height = "692px"; 
    }
}