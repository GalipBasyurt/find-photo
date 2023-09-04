const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrap = document.querySelector(".button-wrapper");
const searchbtn = document.querySelector("#search-button");
const clearBtn = document.querySelector("#clear-button");
const imageListWrap = document.querySelector(".imageList-wrapper");

runEventListeners();
function runEventListeners() {
  form.addEventListener("submit", search);
  clearBtn.addEventListener("click", remove);
}

function search(e) {
  let value = searchInput.value.trim();
  fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
    method: "GET",
    headers: {
      Authorization: "Client-ID TJJlnlRLKQACs_DZRfN-OsT50jvP3qvKKGABjDX5qW0",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      Array.from(data.results).forEach((image) => {
        getImageToUI(image.urls.small);
        console.log(image.urls.small);
      });
    })
    .catch((err) => console.log(err));

  e.preventDefault();
}

function getImageToUI(url) {
  let card = `  <div class="card">
                 <img src="${url}" alt="">
                </div>`;

  imageListWrap.insertAdjacentHTML("beforeend", card);
}

function remove() {
  searchInput.value = "";
  imageListWrap.textContent = "";
}
