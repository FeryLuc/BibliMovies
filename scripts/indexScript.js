import { config, options, addLanguageToUrl, formattingDate, pages } from '../config.js';

const containers = document.getElementsByClassName('container-content');
const loaders = document.getElementsByClassName('loader');
let url;
let container;
let loader;

function createCard(movie, idx, currentContainer) {
    const card = document.createElement('div');
    let movieTitle = movie[idx].title;
    if (currentContainer === containers[4] || currentContainer === containers[5] || currentContainer === containers[6]) {
    movieTitle = movie[idx].name;
  }
  if (!movie[idx].poster_path) {
    card.innerHTML = `
    <div class="movie-card-container">
      <div class="movie-card">
        <img id="picture" src="https://img.freepik.com/vecteurs-libre/conception-signe-degrade-sans-photo_23-2149288316.jpg?w=740&t=st=1705724257~exp=1705724857~hmac=0f35158eed0ac1dad2434264036423daa2a5a61a39edd6ac932049ed9074b8d4" alt="No poster available"> 
      </div>
    <p>${movieTitle}</p>
    </div>
    `;
  } else {
    card.innerHTML = `
    <div class="movie-card-container">
      <div class="movie-card">
        <img id="picture" src="${config.imgBaseUrl+movie[idx].poster_path}" alt="">
      </div>
    <p>${movieTitle}</p>
    </div>
    `;
  }
    card.addEventListener('click', function () {
        window.location.href = '../pages/movieDetails.html';
    } );
    return card;
}

async function fetchMoviesAndProcess(url, container, loader) {
    try {
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        loader.style.display = 'block';

        let response = await fetch(addLanguageToUrl(url), options);
        if (!response.ok) {
            throw new Error("Network response not ok !");
        }
    
        let data = await response.json();
        let result = data.results;
        
       doWithFetchMovies(result, container, loader);
    } catch (error) {
        console.error(error);
    }
}
function doWithFetchMovies(result, container, loader) {
    for (let index = 0; index < result.length; index++) {
      const card = createCard(result, index,container);
      container.appendChild(card);
      container.style.justifyContent = 'flex-start';
      container.style.alignItems = 'stretch';
      loader.style.display = 'none';
  }
}

for (const el of containers) {

    switch (el.id) {
        case containers[0].id:
            url = config.topRatedMovieUrl;
            container = document.getElementById(el.id);
            loader = loaders[0];
            console.log(container, loader);
            fetchMoviesAndProcess(url, container, loader);
            break;
        case containers[1].id:
            url = config.popularMovieUrl;
            container = document.getElementById(el.id);
            loader = loaders[1];
            fetchMoviesAndProcess(url, container, loader);
            break;
        case containers[2].id:
            url = config.recentMovieUrl;
            container = document.getElementById(el.id);
            loader = loaders[2];
            fetchMoviesAndProcess(url, container, loader);
        break;
        case containers[3].id:
            url = config.upcomingMovieUrl;
            container = document.getElementById(el.id);
            loader = loaders[3];
            fetchMoviesAndProcess(url, container, loader);
            break;
        case containers[4].id:
            url = config.topRatedSerieUrl;
            container = document.getElementById(el.id);
            loader = loaders[4];
            fetchMoviesAndProcess(url, container, loader);
            break;
        case containers[5].id:
            url = config.popularSerieUrl;
            container = document.getElementById(el.id);
            loader = loaders[5];
            fetchMoviesAndProcess(url, container, loader);
            break;
        case containers[6].id:
            url = config.upcomingSerieUrl;
            container = document.getElementById(el.id);
            loader = loaders[6];
            fetchMoviesAndProcess(url, container, loader);
            break;
    
        default:
            break;
    }
    console.log(`${url}\n${container}\n${loader}`);
}

const prevButtons = document.getElementsByClassName('prevBtn');
const nextButtons = document.getElementsByClassName('nextBtn');
const viewMoreBtn = document.getElementsByClassName('view-more');
function minusScroll(container) {
  container.scrollLeft -= 1400;
}
function plusScroll(container) {
  container.scrollLeft += 1400;
}
function toPage(page) {
  window.location.href = page;
}

for (let index = 0; index < prevButtons.length; index++) {
  prevButtons[index].addEventListener('click', () => {
    minusScroll(containers[index]);
  });
}
for (let index = 0; index < prevButtons.length; index++) {
  nextButtons[index].addEventListener('click', () => {
    plusScroll(containers[index]);
  });
}
for (let index = 0; index < viewMoreBtn.length; index++) {
  viewMoreBtn[index].addEventListener('click', () => {
    toPage(pages[index]);
  });
}