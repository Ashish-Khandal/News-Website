const API_KEY = "8b2a92ea4e5e4d779c32289fdaf6c3f7";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => fetchNews("India and World"));

function reload(){
  window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}
function bindData(articles) {
  const boxContainer = document.getElementById("box-container");
  const templateNewsBox = document.getElementById("template-news-box");

  boxContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = templateNewsBox.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    boxContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-image");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsDate = cardClone.querySelector("#news-date");
  const newsPara = cardClone.querySelector("#news-para");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsPara.innerHTML = article.description;
  const date = new Date(article.publishedAt).toLocaleString("en-us", {
    timeZone: "Asia/Jakarta",
  });
  newsDate.innerHTML = `${article.source.name} . ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}
let selectNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  selectNav?.classList.remove("active");
  selectNav = navItem;
  selectNav.classList.add("active");
}
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("input-search");
searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  selectNav?.classList.remove("active");
  selectNav = null;
});
