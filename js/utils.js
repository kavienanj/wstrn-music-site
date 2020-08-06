function readFile(fileName) {
    var rawFile = new XMLHttpRequest();
    var recieved;
    rawFile.open("GET", fileName, false);
    rawFile.onreadystatechange = function () {
        if ((rawFile.readyState === 4) & (rawFile.status === 200 || rawFile.status == 0)) {
            var allText = rawFile.responseText;
            recieved = allText.toString();
        }
    }
    rawFile.send();
    return recieved;
}

function getChapters() {
    return Object.keys(CHAPTERS);
}

function getSubTitleList() {
    var _chapters = getChapters();
    var titleList = [];
    for (var i = 0; i < _chapters.length; i++) {
        subList = CHAPTERS[_chapters[i]];
        subList.forEach(element => {
            titleList.push(Object.keys(element)[0]);
        });
    }
    return titleList;
}