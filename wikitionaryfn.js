
// HTML fun
async function WikitionaryHtmlFn(text) {
    const link = `https://en.wiktionary.org/w/api.php?action=query&format=json&prop=extracts&titles=${text}`;

    try {

        const response = await fetch(link);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        // return data["query"]["pages"] || "no avalible data"
        const extract = findValueByKey(data, "extract");

        const parser = new DOMParser();
        const doc = parser.parseFromString(extract, 'text/html');
        const container = document.createElement('div');
        console.log("dom body innerhtml \n" + doc.body.innerHTML);
        // basicaly the error happens in the next line 
        // because some parts of the wikitionary provided html is broken, not full
        // so there's 3 solutions 
        // 1. sanitize it before passing it
        // the rest is in chatgpt 
        // container.innerHTML = doc.body.innerHTML;
        for (const node of doc.body.childNodes) {
        container.appendChild(node.cloneNode(true));
        }
        console.log('container:', container.innerHTML);

        // const textarea = document.createElement("textarea");
        // textarea.innerHTML= extract;
        // console.log("extract \n" + textarea.value);

        // const container = document.createElement("div");
        // container.innerHTML=textarea.value;
        // console.log("container \n" + textarea.value);

        cleaning(container);
        return container.innerHTML;
        
    } catch (error) {

        console.error("translation failed:", error);
        return "translation error";
    }
}


function cleaning (container) {

        // removing pronunciation list
        const removepronunciationlist = container.querySelector('h3[data-mw-anchor="Pronunciation"] + ul');
        if (removepronunciationlist) removepronunciationlist.remove();
        
        // removing pronunciation 
        const removepronunciation = container.querySelector('h3[data-mw-anchor="Pronunciation"]');
        if (removepronunciation) removepronunciation.remove();  
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
