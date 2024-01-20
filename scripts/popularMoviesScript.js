import { config, options, addLanguageToUrl } from '../config.js';
const container = document.querySelector("#containerFlex");
const moreMovieBtn = document.getElementById('moreResult');

let page = 1;

function createMovieCard(movie, idx){
  const movieCard = document.createElement('div');
  const movieRateRounded = Math.round((movie[idx].vote_average) * 10) / 10;
  movieCard.innerHTML = `
  <div class="movie-card-container">
    <div id="movie-card">
      <img id="movie-img" src="${config.imgBaseUrl+movie[idx].poster_path}" alt="">
      <div id="movie-rate">${movieRateRounded}</div>
    </div>
    <p>${movie[idx].title}</p>
    </div>
  `;
    movieCard.addEventListener('click', function () {
        window.location.href = '../pages/movieDetails.html';
    } );
    container.appendChild(movieCard);
}

async function fetchPopularMovie(page = 1){
  try {
    let response = await fetch(addLanguageToUrl(config.popularMovieUrl)+`?page=${page}`, options);
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

fetchPopularMovie().then(
  result => {
    for (let index = 0; index < result.length; index++) {
      createMovieCard(result, index);
  }}
  ).catch(error => {
    console.error(error);
  })

moreMovieBtn.addEventListener('click', function() {
  page++;
  fetchPopularMovie(page).then(
    result => {
      for (let index = 0; index < result.length; index++) {
        createMovieCard(result, index);
    }})
    .catch(error => {
      console.error(error);
    })
});