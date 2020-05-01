function main() {
    var file = "data/contents.txt";
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('title') & (window.location.pathname.toString().endsWith('/article.html'))) {
        return getArticlePage(urlParams.get("title"));
    }
    getContentCards(readFile(file));
}

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

function getContentCards(body) {
    var cardParentDoc = document.getElementById("contents");
    var texts = body.split("\n");
    var topicNo;
    var chapterNo = 0;
    for (var i = 0; i < texts.length; i++) {
        var cardDoc = cardParentDoc.children[0].cloneNode(true);
        text = texts[i];
        if (text[0] == '#') {
            chapterNo += 1;
            topicNo = 0;
            cardParentDoc.appendChild(buildTitleCard(text, cardDoc));
        } else {
            topicNo += 1;
            cardParentDoc.appendChild(buildSubTitleCard(chapterNo, topicNo, text, body, cardDoc));
        }
    }
    cardParentDoc.removeChild(cardParentDoc.children[0]);
}

function buildTitleCard(header, widget) {

    var cardHead = widget.children[0];
    var cardBody = widget.children[1];
    cardBody.remove();

    cardHead.setAttribute("id", "chapter" + header.split(' ')[1]);
    header = header.split('#')[1];
    cardHead.innerHTML = '<h4 class="py-2 text-center"><b>\t' + header + '</b></h4>';

    return widget;

}


function buildSubTitleCard(chapterNo, topicNo, header, content, widget) {

    var cardHead = widget.children[0];
    var cardBody = widget.children[1];
    var cardHeadId = "content" + topicNo.toString() + chapterNo.toString();
    var cardHeadControls = "collapser" + topicNo.toString() + chapterNo.toString();

    cardHead.setAttribute("id", cardHeadId);
    cardHead.children[0].setAttribute("aria-controls", cardHeadControls);
    cardHead.children[0].setAttribute("data-target", "#" + cardHeadControls);
    cardHead.children[0].innerHTML = topicNo.toString() + ".\t" + header;

    cardBody.setAttribute("id", cardHeadControls);
    cardBody.setAttribute("aria-labelledby", cardHeadId);
    cardBody.children[0].innerHTML = '<a href="article.html?title=' + header + '">' + content + '</a>';

    return widget
}


function getArticlePage(title) {
    var titleElement = document.getElementById('title');
    titleElement.innerHTML = title;
}
