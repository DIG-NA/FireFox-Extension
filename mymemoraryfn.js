// mymemorary function

async function mymemorytranslateText(text, targetLang = 'en', sourceLang = 'auto') {
  try {
    const params = new URLSearchParams({
      q: text,
      langpair: `zh|en`
    });

    const response = await fetch(`https://api.mymemory.translated.net/get?${params}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    return data.responseData.translatedText || '(No translation)';
  } catch (err) {
    console.error('Translation failed:', err);
    return '(Translation error)';
  }
}
