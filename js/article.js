function article(title) {
    if (title != null) {
        getArticlePage(title);
    } else {
        getArticlePage('404 Not Found');
    }
}

function getArticlePage(title) {
    var titleElement = document.getElementById('title');
    titleElement.innerHTML = title;
}
