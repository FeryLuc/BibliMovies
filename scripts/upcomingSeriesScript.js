import { config, options, addLanguageToUrl } from '../config.js';
const container = document.querySelector("#containerFlex");
const moreMovieBtn = document.getElementById('moreResult');

let page = 1;

function createSerieCard(serie, idx){
  const serieCard = document.createElement('div');
  const movieRateRounded = Math.round((serie[idx].vote_average) * 10) / 10;
  if (!serie[idx].poster_path) {
    serieCard.innerHTML = `
  <div class="movie-card-container">
    <div id="movie-card">
      <img id="movie-img" src="https://img.freepik.com/vecteurs-libre/conception-signe-degrade-sans-photo_23-2149288316.jpg?w=740&t=st=1705724257~exp=1705724857~hmac=0f35158eed0ac1dad2434264036423daa2a5a61a39edd6ac932049ed9074b8d4" alt="">
      <div id="movie-rate">${movieRateRounded}</div>
    </div>
    <p>${serie[idx].name}</p>
    </div>
  `;
  } else {
    serieCard.innerHTML = `
  <div class="movie-card-container">
    <div id="movie-card">
      <img id="movie-img" src="${config.imgBaseUrl+serie[idx].poster_path}" alt="">
      <div id="movie-rate">${movieRateRounded}</div>
    </div>
    <p>${serie[idx].name}</p>
    </div>
  `;
  }
  
    serieCard.addEventListener('click', function () {
        window.location.href = '../pages/movieDetails.html';
    } );
    container.appendChild(serieCard);
}

async function fetchTopRatedSerie(page = 1){
  try {
    let response = await fetch(addLanguageToUrl(config.upcomingSerieUrl)+`&page=${page}`, options);
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