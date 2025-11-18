// Create the floating "Translate" button
const button = document.createElement('button');
button.textContent = 'Translate';
Object.assign(button.style, {
    position: 'absolute',
    display: 'none',
    zIndex: 9999,
    padding: '10px 10px',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    color: '#f5f5f5',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    background: 'linear-gradient(145deg, #111, #1c1c1c)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    transform: "translateX(-50%)",
});
document.body.appendChild(button);

// Create the floating translation window
const popup = document.createElement('div');
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
    // opacity: 10,
    transform: 'translateY(-10px)',
});
document.body.appendChild(popup);

// shadow-dom
const host = document.createElement('div');
document.body.appendChild(host);
const shadow = host.attachShadow({ mode: 'open' });

// Listen for text selection
document.addEventListener('mouseup', (e) => {
    if (popup.contains(e.target) || button.contains(e.target) || host.contains(e.target)) return;

    const selection = window.getSelection();
    if (!selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        button.style.top = `${rect.top + window.scrollY - 40}px`;
        // button.style.left = `${rect.right + window.scrollX}px`;
        button.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`;
        shadow.appendChild(button);
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

    popup.innerHTML = await tryfun(selectedText);
    console.log(popup.innerHTML);
    shadow.appendChild(popup);

    // Position the popup near the button
    const rect = button.getBoundingClientRect();
    popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
    popup.style.left = `${rect.right + window.scrollX}px`;
    popup.style.display = 'block';
    button.style.display = 'none';
    popup.scrollTop = 0;

});

