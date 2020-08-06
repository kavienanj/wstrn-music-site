function article(title) {
    getArticlePage(title, readFile("pages/"+title+".html"));
}

function getArticlePage(title, body) {
    var titleElement = document.getElementById('title');
    var bodyElement = document.getElementById('contentBody');
    var navBtns = document.getElementsByClassName('btn-nav');
    var subTitles = getSubTitleList();
    var next_nav = subTitles.indexOf(title)+1;
    var previous_nav = next_nav-2;
    for (var btn of navBtns) {
      console.log(btn.innerHTML);
      if (btn.innerHTML[0] == "&") {
        console.log(next_nav);
        if (previous_nav < 0) {
          btn.removeAttribute("href");
          btn.setAttribute("style", "color:#2D2D2D");
        } else {
          btn.setAttribute("href", `article.html?title=${subTitles[previous_nav]}`);
        }
      } else {
        if (next_nav >= subTitles.length) {
          btn.removeAttribute("href");
          btn.setAttribute("style", "color:#2D2D2D");
        } else {
          btn.setAttribute("href", `article.html?title=${subTitles[next_nav]}`);
        }
      }
    };
    if (body != null && title != null) {
      titleElement.innerHTML = title;
      bodyElement.innerHTML = body;  
    } else {
      titleElement.innerHTML = "404 Not Found";
      bodyElement.innerHTML = "";
    }
}
