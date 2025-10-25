// Create the floating "Translate" button
const button = document.createElement('button');
button.textContent = 'Translate';
Object.assign(button.style, {
    position: 'absolute',
    display: 'none',
    zIndex: 9999,
    padding: '6px 10px',
    border: 'none',
    borderRadius: '6px',
    background: '#0078ff',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
});
document.body.appendChild(button);

// Create the floating translation window
const popup = document.createElement('div');
Object.assign(popup.style, {
    position: 'absolute',
    display: 'none',
    zIndex: 10000,
    maxWidth: '350px',
    padding: '10px',
    borderRadius: '10px',
    background: 'black',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    lineHeight: '1.4',
});
popup.textContent = '';
document.body.appendChild(popup);

// Listen for text selection
document.addEventListener('mouseup', () => {
    const selection = window.getSelection();
    if (!selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        button.style.top = `${rect.top + window.scrollY - 35}px`;
        button.style.left = `${rect.left + window.scrollX}px`;
        button.style.display = 'block';
        popup.style.display = 'none'; // Hide popup when reselecting
    } else {
        button.style.display = 'none';
        popup.style.display = 'none';
    }
});

// When button is clicked → show translation popup
button.addEventListener('click', async () => {
    const selectedText = window.getSelection().toString().trim();
    if (!selectedText) return;

    // google translate fun
    //   const translated = await googletranslateText(selectedText,"en");
    //   console.log(translated);

    // mymemory translate fun
    //   const translated = await mymemorytranslateText(selectedText,"en");
    //   console.log(translated);

    //   const translated = await libretranslateText(selectedText, "en");
    //   console.log(translated);

    // const translated = await WikitionaryHtmlFn(selectedText);
    popup.innerHTML= await WikitionaryHtmlFn(selectedText);
    console.log(popup.innerHTML);
        // console.log(translated);


    // Position the popup near the button
    const rect = button.getBoundingClientRect();
    popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;
    // popup.textContent = translated || "No - Result";
    popup.style.display = 'block';
});

// Hide popup when clicking outside
document.addEventListener('click', (e) => {
    if (!button.contains(e.target) && !popup.contains(e.target)) {
        popup.style.display = 'none';
    }
});
