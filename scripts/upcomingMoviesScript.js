import { config, options, addLanguageToUrl, formattingDate } from '../config.js';
const container = document.querySelector("#containerFlex");
const moreMovieBtn = document.getElementById('moreResult');
const titlePage = document.getElementsByTagName('h1');

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

async function fetchUpcomingMovie(page = 1){
  try {
    let response = await fetch(addLanguageToUrl(config.upcomingMovieUrl)+`&page=${page}`, options);
    if (!response.ok) {
      throw new Error("Network response not ok !");
    }
    let data = await response.json();
    let result = data.results;
    let maxDate = data.dates.maximum;
    let minDate = data.dates.minimum;

    let [dateMin, dateMax] = formattingDate(minDate, maxDate);

    return [result, dateMin, dateMax];
    } catch (error) {
      return Promise.reject(error);
    }
}

fetchUpcomingMovie().then(
    ([result, dateMin, dateMax]) => {
        titlePage[0].textContent = `Prochainement - ${dateMin} au ${dateMax}`;
    for (let index = 0; index < result.length; index++) {
      createMovieCard(result, index);
  }}
  ).catch(error => {
    console.error(error);
  })

moreMovieBtn.addEventListener('click', function() {
  page++;
  fetchUpcomingMovie(page).then(
    ([result, dateMin, dateMax]) => {
      for (let index = 0; index < result.length; index++) {
        createMovieCard(result, index);
    }})
    .catch(error => {
      console.error(error);
    })
});