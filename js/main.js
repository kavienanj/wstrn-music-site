function main() {
    urlRoute();
}

function urlRoute() {
    var path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);

    if (path.endsWith('/') || path.endsWith('/index.html')) {
        home();
    }

    else if (path.endsWith('/article.html')) {
        article(urlParams.get("title"));
    }

}
