function home() {
    var file = "data/contents.txt";
    getContentCards(readFile(file))
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
            var title = text.split('|')[0];
            var subtitles = text.split('|')[1].split(',');
            cardParentDoc.appendChild(buildSubTitleCard(chapterNo, topicNo, title, subtitles, cardDoc));
        }
    }
    cardParentDoc.removeChild(cardParentDoc.children[0]);
}

function buildTitleCard(header, widget) {

    var cardHead = widget.children[0];
    var cardBody = widget.children[1];
    cardBody.remove();

    cardHead.setAttribute("id", "chapter" + header.split(' ')[1]);
    cardHead.innerHTML = '<h4 class="py-2 text-center"><b>\t' + header.split('#')[1] + '</b></h4>';

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
    var cardBodySubtitleContent = '<a class="ml-2" href="article.html?title='+header+'">'+'View Page</a><br/>';
    if (content[0].length > 0) {
        for (var i = 0; i < content.length; i++) {
            cardBodySubtitleContent += '<a class="ml-2" href="article.html?title='+header+'#'+content[i]+'">'
            +topicNo.toString()+"."+(i+1).toString()+"\t\t\t\t"+content[i]+'</a><br/>';
        }
    }
    cardBody.children[0].innerHTML = cardBodySubtitleContent;

    return widget
}
