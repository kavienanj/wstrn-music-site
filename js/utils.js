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