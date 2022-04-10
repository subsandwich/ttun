
const domWalker = (domElement, executionFunction) => {


}

const strikeMich = (domElement) => {
    domElement.innerHTML = replaceMichStrings(domElement.innerHTML)
}

const replaceMichStrings = (innerString) => {
    innerString.replace(new RegExp("(?i)\bmichigan\b"), 'ttun');
    //innerString.replace('M', 'M̶');
    //innerString.replace('m', 'm̶');
    return innerString;
}


window.addEventListener('load', (event) => {
    console.log("Ready to party!");
    // Get top level node
    topElement = document.getElementsByTagName("body")[0];
    console.log(topElement);

});

