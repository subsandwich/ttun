const nonAllowElems = new Set(["SCRIPT", "STYLE"]);


const domWalker = (domElement) => {
    for (let i = 0; i < domElement.children.length; i++) {
        domWalker(domElement.children[i]);
    }

    if (!nonAllowElems.has(domElement.tagName)){
        manipulateNodes(domElement);
    }

}

const manipulateNodes = (elem) => {
    elem.childNodes.forEach(node => {
        if (node.nodeType === 3){
            node.nodeValue = node.nodeValue.replace(new RegExp("michigan", "i"), "TTUN");
            createStrikethroughs(node, elem);
        }
    });
}

const createStrikethroughs = (textNode, parentN) => {
    let mLoc = textNode.nodeValue.toLowerCase().indexOf('m');
    if (mLoc !== -1) {
        let rest = textNode.splitText(mLoc + 1);
        let del = document.createElement('del');
        del.appendChild(document.createTextNode(textNode.nodeValue[mLoc]));
        parentN.insertBefore(del, rest);
        textNode.nodeValue = textNode.nodeValue.substring(0, textNode.nodeValue.length - 1)
        createStrikethroughs(rest, parentN);
    }
}




window.addEventListener('load', (event) => {
    console.log("Ready to party!");
    chrome.storage.sync.get(['isEnabled']).then((result)=> {
        if (result.isEnabled === undefined){
            chrome.storage.sync.set({'isEnabled': false});
        } else if (result.isEnabled){
            console.log("starting");
            domWalker(document.getElementsByTagName("body")[0]);
        }
      });

});

