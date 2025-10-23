
// HTML fun
async function WikitionaryHtmlFn(text) {
    const link = `https://en.wiktionary.org/w/api.php?action=query&format=json&prop=extracts&titles=${text}`;

    try {

        const response = await fetch(link);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        // return data["query"]["pages"] || "no avalible data"
        const extract = findValueByKey(data, "extract");
        const textarea = document.createElement("textarea");
        textarea.innerHTML= extract;
        return textarea.value;

        // return findValueByKey(data, "extract")

    } catch (error) {

        console.error("translation failed:", error);
        return "translation error";
    }



}

// API fun
async function WikitionaryApiFn(text) {


}

function findValueByKey(obj, keyToFind) {
  if (obj.hasOwnProperty(keyToFind)) {
    return obj[keyToFind];
  }

  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "object" && value !== null) {
      const result = findValueByKey(value, keyToFind);
      if (result !== undefined) return result;
    }
  }
}
