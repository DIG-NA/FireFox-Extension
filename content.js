// Create the floating "Translate" button
const button = document.createElement('button');
button.textContent = 'Translate';
Object.assign(button.style, {
    position: 'absolute',
    display: 'none',
    zIndex: 9999,
    padding: '10px 10px',
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
// Object.assign(popup.style, {
//     position: 'absolute',
//     display: 'none',
//     zIndex: 10000,
//     width: '500px',    
//     maxHeight: '300px',
//     padding: '17px',
//     borderRadius: '10px',
//     background: 'black',
//     boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
//     fontFamily: 'sans-serif',
//     fontSize: '14px',
//     lineHeight: '1.4',
//     overflowY: 'auto'
// });
Object.assign(popup.style, {
    position: 'absolute',
    display: 'none',
    zIndex: 10000,
    width: '450px',
    maxHeight: '320px',
    padding: '18px 22px',
    borderRadius: '14px',
    background: 'linear-gradient(145deg, #111, #1c1c1c)',
    color: '#f5f5f5',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
    fontFamily: `'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
    fontSize: '15px',
    lineHeight: '1.6',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: '#888 #1c1c1c',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    transition: 'opacity 0.25s ease, transform 0.25s ease',
    // opacity: 100,
    transform: 'translateY(-10px)',
});
document.body.appendChild(popup);

// Listen for text selection
document.addEventListener('mouseup', (e) => {
    if (popup.contains(e.target) || button.contains(e.target)) return;

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

    // mymemory translate fun
    //   const translated = await mymemorytranslateText(selectedText,"en");
    //   console.log(translated);

    popup.innerHTML= await tryfun(selectedText);

    // Position the popup near the button
    const rect = button.getBoundingClientRect();
    popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;
    popup.style.display = 'block';
    button.style.display ='none';
    popup.scrollTop = 0;

});

