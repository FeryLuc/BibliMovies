import { config, options, addLanguageToUrl, formattingDate, titlePages } from '../config.js';
const container = document.querySelector("#containerFlex");
const moreMovieBtn = document.getElementById('moreResult');
const titlePage = document.title;
let url;
let page = 1;

switch (titlePage) {
  case titlePages.topRatedMovie:
    url = config.topRatedMovieUrl;
    break;

  case titlePages.popularMovie:
    url = config.popularMovieUrl;
    break;

    case titlePages.cinemaMovie:
    url = config.recentMovieUrl;
    break;

  case titlePages.upcomingMovie:
    url = config.upcomingMovieUrl;
    fetchUpcomingDates().then(
      ([dateMin, dateMax]) => {
        doWithFetchDates(dateMin, dateMax);
      }
    )
    break;

    case titlePages.topRatedSerie:
    url = config.topRatedSerieUrl;
    break;

  case titlePages.popularSerie:
    url = config.popularSerieUrl;
    break;

    case titlePages.upcomingSerie:
    url = config.upcomingSerieUrl;
    break;

  default:
    break;
}

function createCard(movie, idx){
  const movieCard = document.createElement('div');
  const movieRateRounded = Math.round((movie[idx].vote_average) * 10) / 10;
  let movieTitle = movie[idx].title;
  if (titlePage === titlePages.topRatedSerie || titlePage === titlePages.popularSerie || titlePage === titlePages.upcomingSerie) {
   movieTitle = movie[idx].name;
  }
  if (!movie[idx].poster_path) {
    movieCard.innerHTML = `
    <div class="movie-card-container">
      <div id="movie-card">
        <img id="movie-img" src="https://img.freepik.com/vecteurs-libre/conception-signe-degrade-sans-photo_23-2149288316.jpg?w=740&t=st=1705724257~exp=1705724857~hmac=0f35158eed0ac1dad2434264036423daa2a5a61a39edd6ac932049ed9074b8d4" alt="No poster available">
        <div id="movie-rate">${movieRateRounded}</div>
      </div>
      <p>${movieTitle}</p>
      </div>
    `;
  } else {
    movieCard.innerHTML = `
    <div class="movie-card-container">
      <div id="movie-card">
        <img id="movie-img" src="${config.imgBaseUrl+movie[idx].poster_path}" alt="">
        <div id="movie-rate">${movieRateRounded}</div>
      </div>
      <p>${movieTitle}</p>
      </div>
    `;
  }
    movieCard.addEventListener('click', function () {
        window.location.href = '../pages/movieDetails.html';
    } );
    container.appendChild(movieCard);
}



async function fetchMovies(page = 1){
  try {
    let response = await fetch(addLanguageToUrl(url)+`&page=${page}`, options);
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
function doWithFetchMovies(result) {
    for (let index = 0; index < result.length; index++) {
      createCard(result, index);
  }
}



async function fetchUpcomingDates(page = 1){
  try {
    let response = await fetch(addLanguageToUrl(url)+`&page=${page}`, options);
    if (!response.ok) {
      throw new Error("Network response not ok !");
    }
    let data = await response.json();
    console.log(data);
    let maxDate = data.dates.maximum;
    let minDate = data.dates.minimum;

    let [dateMin, dateMax] = formattingDate(minDate, maxDate);

    return [dateMin, dateMax];
    } catch (error) {
      return Promise.reject(error);
    }
}
function doWithFetchDates(dateMin, dateMax) {
    const titlePage = document.getElementsByTagName('h1');
    titlePage[0].textContent = `Prochainement - ${dateMin} au ${dateMax}`;
}


fetchMovies().then(
  result => {
    doWithFetchMovies(result);
   }
  ).catch(error => {
    console.error(error);
  })


  
moreMovieBtn.addEventListener('click', function() {
  page++;
  fetchMovies(page).then(
    result => {
      for (let index = 0; index < result.length; index++) {
        createCard(result, index);
    }})
    .catch(error => {
      console.error(error);
    })
});