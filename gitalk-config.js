var gitalk = new Gitalk({
  "clientID": "44979d2ff8cc5b4ed224",
  "clientSecret": "20d817e3f9bbdae3422b5c318c55e26da4574b78",
  "repo": "codezxw.github.io",
  "owner": "codezxw",
  "admin": ["codezxw"],
  "id": window.location.pathname,
  "distractionFreeMode": false
});
gitalk.render("gitalk-container");
