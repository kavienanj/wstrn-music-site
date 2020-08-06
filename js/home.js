function home() {
    getContentCards();
}

function getContentCards() {
    var cardParentDoc = document.getElementById("contents");
    var _chapters = getChapters();
    for (var i = 0; i < _chapters.length; i++) {
        var cardDoc = cardParentDoc.children[0].cloneNode(true);
        cardParentDoc.appendChild(buildTitleCard(_chapters[i], cardDoc));
        var _contents = CHAPTERS[_chapters[i]];
        for (var j = 0; j < _contents.length; j++) {
            var cardDoc = cardParentDoc.children[0].cloneNode(true);
            var _header = Object.keys(_contents[j])[0];
            var _listSubTi = _contents[j][Object.keys(_contents[j])[0]];
            cardParentDoc.appendChild(buildSubTitleCard(i+1, j+1, _header, _listSubTi, cardDoc));
        }
    }
    cardParentDoc.removeChild(cardParentDoc.children[0]);
}

function buildTitleCard(header, widget) {
    var cardHead = widget.children[0];
    var cardBody = widget.children[1];
    cardBody.remove();
    cardHead.setAttribute("id", "chapter" + header.split(' ')[1]);
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
    var cardBodySubtitleContent = '<a class="ml-2" href="article.html?title='+header+'">'+'View Page</a><br/>';
    if (content.length > 0) {
        for (var i = 0; i < content.length; i++) {
            cardBodySubtitleContent += '<a class="ml-2" href="article.html?title='+header+'#'+content[i]+'">'
            +topicNo.toString()+"."+(i+1).toString()+"\t\t\t\t"+content[i]+'</a><br/>';
        }
    }
    cardBody.children[0].innerHTML = cardBodySubtitleContent;
    return widget
}
