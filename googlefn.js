// Google Translate function
const TRANSLATE_URL = 'https://translate.googleapis.com/translate_a/single';

// Translation function
async function googletranslateText(text, targetLang = 'es', sourceLang = 'auto') {
  try {
    const params = new URLSearchParams({
      client: 't',
      sl: sourceLang,
      tl: targetLang,
      dt: 't',
      q: text
    });

    const response = await fetch(`${TRANSLATE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    // Parse Google's response format
    if (data && data[0] && data[0][0]) {
      return {
        translatedText: data[0][0][0],
        detectedSourceLang: data[2] || sourceLang,
        confidence: data[0][0][2] || 1
      };
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Translation failed:', error);
    throw error;
  }
}

// Listen for messages from content scripts/popup
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'translate') {
    translateText(request.text, request.targetLang)
      .then(result => sendResponse({ success: true, ...result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep message channel open for async response
  }
});