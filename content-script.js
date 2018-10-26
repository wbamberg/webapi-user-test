let openButton = document.querySelector('.codepen-button');
openButton.addEventListener('click', openCodePen);
openButton.style.boxSizing = 'border-box';

function openCodePen() {
    let codepenable = document.querySelector('.codepenable');

    let outputFrame = document.createElement('iframe');
    outputFrame.classList.add('codepen-frame');
    outputFrame.setAttribute('height', '600');
    outputFrame.setAttribute('name', 'codepen-frame');
    outputFrame.setAttribute('style', 'border: 2px solid black; max-width: calc(100%); width: calc(100%);box-sizing: border-box;');
    codepenable.appendChild(outputFrame);

    let openButtonStyles = window.getComputedStyle(openButton);
    console.log(`-${openButtonStyles.height}`)
    openButton.style.top = `-${openButtonStyles.height}`;
    openButton.textContent = 'Close CodePen';
    openButton.removeEventListener('click', openCodePen);
    openButton.addEventListener('click', closeCodePen);

    let jsCode = document.querySelector('.codepen-js');
    jsCode.setAttribute('style', 'display:none');

    let js = document.querySelector('.codepen-js').textContent;
    let css = document.querySelector('.codepen-css').textContent;
    let html = document.querySelector('.codepen-html').textContent;

    let data = {
        title              : "document.querySelector() demo",
        description        : "A WebAPI example from MDN",
        html               : html,
        css                : css,
        js                 : js,
        template           : true,
        layout             : "left",
        editors            : "001"
      };
  
    let json = 
        JSON.stringify(data)
        // Quotes will screw up the JSON
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
       
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('target', 'codepen-frame');
    form.setAttribute('action', 'https://codepen.io/pen/define');
    form.classList.add('hidden');

    let input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'data');
    input.setAttribute('value', json);

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
 }

 function closeCodePen() {
    openButton.style.top = '0';
    openButton.textContent = 'Open CodePen';
    openButton.removeEventListener('click', closeCodePen);
    openButton.addEventListener('click', openCodePen);

    let codepenFrame = document.querySelector('.codepen-frame');
    codepenFrame.parentNode.removeChild(codepenFrame);

    let jsCode = document.querySelector('.codepen-js');
    jsCode.setAttribute('style', 'display:block');
 }