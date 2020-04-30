function readContents() {
    var file;
    var fileRoot;
    var fileName = "data/contents.txt";
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('title') & (window.location.pathname.toString().endsWith('/article.html'))) {
        return getArticle(urlParams.get("title"));
    }
    if (window.location.host == "127.0.0.1:5500") {
        file = '../' + fileName;
    } else {
        file = window.location.host + "/wstrn-music-site/" + fileName;
    }
    console.log(file);
    var rawFile = new XMLHttpRequest();
    var recieved;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if ((rawFile.readyState === 4) & (rawFile.status === 200 || rawFile.status == 0)) {
            var allText = rawFile.responseText;
            recieved = allText.toString();
        }
    }
    rawFile.send();
    getContentCards(recieved);
}

function getContentCards(body) {
    var cardParentDoc = document.getElementById("contents");
    var texts = body.split("\n");
    for (var i = 0; i < texts.length; i++) {
        var cardDoc = cardParentDoc.children[0].cloneNode(true);
        cardParentDoc.appendChild(buildCard(i+1, texts[i], body, cardDoc));
    }
    cardParentDoc.removeChild(cardParentDoc.children[0]);
}

function buildCard(id, header, content, widget) {

    var cardHead = widget.children[0];
    var cardBody = widget.children[1];

    cardHead.setAttribute("id", "content" + id.toString());
    cardHead.children[0].setAttribute("aria-controls", "collapser" + id.toString());
    cardHead.children[0].setAttribute("data-target", "#collapser" + id.toString());
    cardHead.children[0].innerHTML = id.toString() + ".\t" + header;

    cardBody.setAttribute("id", "collapser" + id.toString());
    cardBody.setAttribute("aria-labelledby", "content" + id.toString());
    cardBody.children[0].innerHTML = '<a href="/article.html?title=' + header + '">' + content + '</a>';

    return widget
}


function getArticle(title) {
    var titleElement = document.getElementById('title');
    titleElement.innerHTML = title;
}
