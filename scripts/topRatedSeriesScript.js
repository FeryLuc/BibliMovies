import { config, options, addLanguageToUrl } from '../config.js';
const container = document.querySelector("#containerFlex");
const moreMovieBtn = document.getElementById('moreResult');

let page = 1;

function createSerieCard(serie, idx){
  const serieCard = document.createElement('div');
  const movieRateRounded = Math.round((serie[idx].vote_average) * 10) / 10;
  serieCard.innerHTML = `
  <div class="movie-card-container">
    <div id="movie-card">
      <img id="movie-img" src="${config.imgBaseUrl+serie[idx].poster_path}" alt="">
      <div id="movie-rate">${movieRateRounded}</div>
    </div>
    <p>${serie[idx].name}</p>
    </div>
  `;
    serieCard.addEventListener('click', function () {
        window.location.href = '../pages/movieDetails.html';
    } );
    container.appendChild(serieCard);
}

async function fetchTopRatedSerie(page = 1){
  try {
    let response = await fetch(addLanguageToUrl(config.topRatedSerieUrl)+`&page=${page}`, options);
    if (!response.ok) {
      throw new Error("Network response not ok !");
    }
    let data = await response.json();
    let result = data.results;

    return result;
    } catch (error) {
      return Promise.reject(error);
    }
}

fetchTopRatedSerie().then(
  result => {
    for (let index = 0; index < result.length; index++) {
        createSerieCard(result, index);
  }}
  ).catch(error => {
    console.error(error);
  })

moreMovieBtn.addEventListener('click', function() {
  page++;
  fetchTopRatedSerie(page).then(
    result => {
      for (let index = 0; index < result.length; index++) {
        createSerieCard(result, index);
    }})
    .catch(error => {
      console.error(error);
    })
});