

function ingredientReduction(items) {
    const middle = new Set();

    for(let item of items) {
        middle.add(item.name);
    };

    let middleString = "";
    for(let entry of middle) {
        middleString += `${entry},`
    }

    
    const retString = middleString.substring(0, middleString.length - 1);
    console.log(retString);
    return retString;
};

module.exports = ingredientReduction;