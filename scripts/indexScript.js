import { config, options, addLanguageToUrl, formattingDate } from '../config.js';

  //Main content
  const topRatedContainer = document.getElementById('top-rated-movies');
  const popularMovieContainer = document.getElementById('popular-movies');
  const upcomingContainer = document.getElementById('upcoming-movies');
  const recentContainer = document.getElementById('recent-movies');
  const topRatedSeriesContainer = document.getElementById('top-rated-series');
  const upcomingSeriesContainer = document.getElementById('upcoming-series');
  const popularSeriesContainer = document.getElementById('popular-series');

  function createMovieCard(movie, idx) {
    const movieCard = document.createElement('div');
    
    movieCard.innerHTML = `
      <div class="movie-card-container">
        <div class="movie-card">
          <img id="picture" src="${config.imgBaseUrl+movie[idx].poster_path}">
        </div>
      <p>${movie[idx].title}</p>
      </div>
    `;
    return movieCard;
    // container.appendChild(movieCard);
  }
  function createSerieCard(serie, idx) {
    const serieCard = document.createElement('div');
    if (!serie[idx].poster_path) {
      serieCard.innerHTML = `
      <div class="movie-card-container">
        <div class="movie-card">
          <img id="picture" src="https://img.freepik.com/vecteurs-libre/conception-signe-degrade-sans-photo_23-2149288316.jpg?w=740&t=st=1705724257~exp=1705724857~hmac=0f35158eed0ac1dad2434264036423daa2a5a61a39edd6ac932049ed9074b8d4">
        </div>
      <p>${serie[idx].name}</p>
      </div>
    `;
    return serieCard;
    } else {
      serieCard.innerHTML = `
      <div class="movie-card-container">
        <div class="movie-card">
          <img id="picture" src="${config.imgBaseUrl+serie[idx].poster_path}">
        </div>
      <p>${serie[idx].name}</p>
      </div>
    `;
    return serieCard;
    }
    // container.appendChild(serieCard);
  }

  async function fetchTopRatedMovie() {
    let response = await fetch(addLanguageToUrl(config.topRatedMovieUrl), options);
    if (!response.ok) {
      throw new Error("Network response not ok !");
    }
    let data = await response.json();
    console.log(data);
    let result = data.results;
    console.log(result);
    return result;
  }
  fetchTopRatedMovie().then(
    result => {
      for (let index = 0; index < result.length; index++) {
        const movieCard = createMovieCard(result, index, topRatedContainer);
        movieCard.addEventListener('click', function() {
          console.log('works');
        });
        topRatedContainer.appendChild(movieCard);
      }
    }
  )

  async function fetchPopularMovie() {
    let response = await fetch(addLanguageToUrl(config.popularMovieUrl), options);
    if (!response.ok) {
      throw new Error("Network response not ok !");
    }
    let data = await response.json();
    console.log(data);
    let result = data.results;
    console.log(result);
    return result;
  }
  fetchPopularMovie().then(
    result => {
      for (let index = 0; index < result.length; index++) {
        const movieCard = createMovieCard(result, index, popularMovieContainer);
        movieCard.addEventListener('click', function() {
          console.log('works');
        });
        popularMovieContainer.appendChild(movieCard);
        
      }
    }
  )

  async function fetchUpcomingMovie() {
    let response = await fetch(addLanguageToUrl(config.upcomingMovieUrl), options);
    if (!response.ok) {
      throw new Error("Network response not ok !");
    }
    let data = await response.json();
    let maxDate = data.dates.maximum;
    let minDate = data.dates.minimum;
    
    let [dateMin, dateMax] = formattingDate(minDate, maxDate);

    console.log(data);
    let result = data.results;
    console.log(result);
    return [result, dateMin, dateMax];
  }
  fetchUpcomingMovie().then(
    ([result, dateMin, dateMax]) => {
      let upcomingTitle = document.querySelector('.upcomingTitle');
      upcomingTitle.textContent = `À venir - ${dateMin} au ${dateMax}`;
      for (let index = 0; index < result.length; index++) {
        const movieCard = createMovieCard(result, index, upcomingContainer);
        movieCard.addEventListener('click', function() {
          console.log('works');
        });
        upcomingContainer.appendChild(movieCard);     
      }
    }
  )

  async function fetchRecentMovie() {
    let response = await fetch(addLanguageToUrl(config.recentMovieUrl), options);
    if (!response.ok) {
      throw new Error("Network response not ok !");
    }
    let data = await response.json();
    console.log(data);
    let result = data.results;
    console.log(result);
    return result
  }
  fetchRecentMovie().then(
    result => {
      for (let index = 0; index < result.length; index++) {
        const movieCard = createMovieCard(result, index, recentContainer);
        movieCard.addEventListener('click', function() {
          console.log('works');
        });
        recentContainer.appendChild(movieCard);        
      }
    }
  )

async function fetchTopRatedSeries() {
  let response = await fetch(addLanguageToUrl(config.topRatedSerieUrl), options);
  if (!response.ok) {
    throw new Error("Network response not ok !");
  }
  let data = await response.json();
  console.log(data);
  let result = data.results;
  console.log(result);
  return result;
}
fetchTopRatedSeries().then(
  result => {
    for (let index = 0; index < result.length; index++) {
      const serieCard = createSerieCard(result, index, topRatedSeriesContainer);
      serieCard.addEventListener('click', function() {
        console.log('works');
      });
      topRatedSeriesContainer.appendChild(serieCard);
    }
  }
)

async function fetchUpcomingSeries() {
  let response = await fetch(addLanguageToUrl(config.upcomingSerieUrl), options);
  if (!response.ok) {
    throw new Error("Network response not ok !");
  }
  let data = await response.json();
  console.log(data);
  let result = data.results;
  console.log(result);
  return result;
}
fetchUpcomingSeries().then(
  result => {
    for (let index = 0; index < result.length; index++) {
      const serieCard = createSerieCard(result, index, upcomingSeriesContainer);
      serieCard.addEventListener('click', function() {
        console.log('works');
      });
      upcomingSeriesContainer.appendChild(serieCard);
    }
  }
)

async function fetchPopularSeries() {
  let response = await fetch(addLanguageToUrl(config.popularSerieUrl), options);
  if (!response.ok) {
    throw new Error("Network response not ok !");
  }
  let data = await response.json();
  console.log(data);
  let result = data.results;
  console.log(result);
  return result;
}
fetchPopularSeries().then(
  result => {
    for (let index = 0; index < result.length; index++) {
      const serieCard = createSerieCard(result, index, popularSeriesContainer);
      serieCard.addEventListener('click', function() {
        console.log('works');
      });
      popularSeriesContainer.appendChild(serieCard);
    }
  }
)

const prevButtons = document.getElementsByClassName('prevBtn');
const nextButtons = document.getElementsByClassName('nextBtn');
console.log(prevButtons);

prevButtons[0].addEventListener('click', function() {
  topRatedContainer.scrollLeft -= 1400;
});
nextButtons[0].addEventListener('click', function() {
  topRatedContainer.scrollLeft += 1400;
});

prevButtons[1].addEventListener('click', function() {
  popularMovieContainer.scrollLeft -= 1400;
});
nextButtons[1].addEventListener('click', function() {
  popularMovieContainer.scrollLeft += 1400;
});

prevButtons[2].addEventListener('click', function() {
  recentContainer.scrollLeft -= 1400;
});
nextButtons[2].addEventListener('click', function() {
  recentContainer.scrollLeft += 1400;
});

prevButtons[3].addEventListener('click', function() {
  upcomingContainer.scrollLeft -= 1400;
});
nextButtons[3].addEventListener('click', function() {
  upcomingContainer.scrollLeft += 1400;
});

prevButtons[4].addEventListener('click', function() {
  topRatedSeriesContainer.scrollLeft -= 1400;
});
nextButtons[4].addEventListener('click', function() {
  topRatedSeriesContainer.scrollLeft += 1400;
});

prevButtons[5].addEventListener('click', function() {
  popularSeriesContainer.scrollLeft -= 1400;
});
nextButtons[5].addEventListener('click', function() {
  popularSeriesContainer.scrollLeft += 1400;
});

prevButtons[6].addEventListener('click', function() {
  upcomingSeriesContainer.scrollLeft -= 1400;
});
nextButtons[6].addEventListener('click', function() {
  upcomingSeriesContainer.scrollLeft += 1400;
});

const viewMoreBtn = document.getElementsByClassName('view-more');

viewMoreBtn[0].addEventListener('click', function() {
  window.location.href = '../pages/topRatedMovies.html';
});
viewMoreBtn[1].addEventListener('click', function() {
  window.location.href = '../pages/popularMovies.html';
});
viewMoreBtn[2].addEventListener('click', function() {
  window.location.href = '../pages/cinemaMovies.html';
});
viewMoreBtn[3].addEventListener('click', function() {
  window.location.href = '../pages/upcomingMovies.html';
});
viewMoreBtn[4].addEventListener('click', function() {
  window.location.href = '../pages/topRatedSeries.html';
});
viewMoreBtn[5].addEventListener('click', function() {
  window.location.href = '../pages/popularSeries.html';
});
viewMoreBtn[6].addEventListener('click', function() {
  window.location.href = '../pages/upcomingSeries.html';
});