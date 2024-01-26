import { config, options, addLanguageToUrl, formattingDate, titlePages } from '../config.js';
const urls = config;
const optns = options;
const urlWithLang = addLanguageToUrl;
const dateFormatting =  formattingDate;
const pagesTitle = titlePages;
const container = document.querySelector("#containerFlex");
const moreMovieBtn = document.getElementById('moreResult');
const titlePage = document.title;
const loader = document.querySelector('.loader');
let url;
let page = 1;

switch (titlePage) {
  case pagesTitle.topRatedMovie:
    url = urls.topRatedMovieUrl;
    break;

  case pagesTitle.popularMovie:
    url = urls.popularMovieUrl;
    break;

    case pagesTitle.cinemaMovie:
    url = urls.recentMovieUrl;
    break;

  case pagesTitle.upcomingMovie:
    url = urls.upcomingMovieUrl;
    fetchUpcomingDates().then(
      ([dateMin, dateMax]) => {
        doWithFetchDates(dateMin, dateMax);
      }
    )
    break;

    case pagesTitle.topRatedSerie:
    url = urls.topRatedSerieUrl;
    break;

  case pagesTitle.popularSerie:
    url = urls.popularSerieUrl;
    break;

    case pagesTitle.upcomingSerie:
    url = urls.upcomingSerieUrl;
    break;

  default:
    break;
}

function createCard(movie, idx){
  const movieCard = document.createElement('div');
  const movieRateRounded = Math.round((movie[idx].vote_average) * 10) / 10;
  let movieTitle = movie[idx].title;
  if (titlePage === pagesTitle.topRatedSerie || titlePage === pagesTitle.popularSerie || titlePage === pagesTitle.upcomingSerie) {
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
        <img id="movie-img" src="${urls.imgBaseUrl+movie[idx].poster_path}" alt="">
        <div id="movie-rate">${movieRateRounded}</div>
      </div>
      <p>${movieTitle}</p>
      </div>
    `;
  }
    movieCard.addEventListener('click', function () {
      if ('name' in movie[idx]) {
        const serieId = movie[idx].id;
        localStorage.setItem('serieId', JSON.stringify(serieId));
        console.log('serie');
        window.location.href = '../pages/movieDetails.html';
      } else {
        const movieId = movie[idx].id;
        localStorage.setItem('movieId', JSON.stringify(movieId));
        window.location.href = '../pages/movieDetails.html';
        console.log('film');
      }
    } );
    container.appendChild(movieCard);
}



async function fetchMovies(page, loader){
  try {
    loader.style.display = 'block';
    let response = await fetch(urlWithLang(url)+`&page=${page}`, optns);
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
function doWithFetchMovies(result, loader) {
    for (let index = 0; index < result.length; index++) {
      createCard(result, index);
      loader.style.display = 'none';
  }
}



async function fetchUpcomingDates(page = 1){
  try {
    let response = await fetch(urlWithLang(url)+`&page=${page}`, optns);
    if (!response.ok) {
      throw new Error("Network response not ok !");
    }
    let data = await response.json();
    console.log(data);
    let maxDate = data.dates.maximum;
    let minDate = data.dates.minimum;

    let [dateMin, dateMax] = dateFormatting(minDate, maxDate);

    return [dateMin, dateMax];
    } catch (error) {
      return Promise.reject(error);
    }
}
function doWithFetchDates(dateMin, dateMax) {
    const titlePage = document.getElementsByTagName('h1');
    titlePage[0].textContent = `Prochainement - ${dateMin} au ${dateMax}`;
}


fetchMovies(page, loader).then(
  result => {
    doWithFetchMovies(result, loader);
   }
  ).catch(error => {
    console.error(error);
  })


  
moreMovieBtn.addEventListener('click', function() {
  page++;
  fetchMovies(page, loader).then(
    result => {
      doWithFetchMovies(result, loader);
    })
    .catch(error => {
      console.error(error);
    })
});