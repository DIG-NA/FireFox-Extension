// LibreTranslate function

// async function libretranslateText(text, targetLang = 'en', sourceLang = 'auto') {
//   try {
//     const response = await fetch('https://libretranslate.com/translate', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         q: text,
//         source: sourceLang,
//         target: targetLang
//       })
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}`);
//     }

//     const data = await response.json();

//     return data.translatedText || '(No translation result)';
//   } catch (error) {
//     console.error('Translation failed:', error);
//     return '(Translation error)';
//   }
// }


async function libretranslateText(text, targetLang = 'en', sourceLang = 'auto') {
  try {
    const response = await fetch('https://libretranslate.com/translate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text'
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP ${response.status} - ${errText}`);
    }

    const data = await response.json();

    if (data && data.translatedText) {
      return data.translatedText;
    } else {
      throw new Error('Invalid response format');
    }

  } catch (error) {
    console.error('Translation failed:', error);
    return '(Translation error)';
  }
}
