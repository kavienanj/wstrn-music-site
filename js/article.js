function article(title) {
    getArticlePage(title, readFile("pages/"+title+".html"));
}

function getArticlePage(title, body) {
    var titleElement = document.getElementById('title');
    var bodyElement = document.getElementById('contentBody');
    if (body != null && title != null) {
      titleElement.innerHTML = title;
      bodyElement.innerHTML = body;  
    } else {
      titleElement.innerHTML = "404 Not Found";
      bodyElement.innerHTML = "";
    }
}
