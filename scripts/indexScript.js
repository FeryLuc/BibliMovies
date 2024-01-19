import { config, options, addLanguageToUrl, formattingDate } from '../config.js';

  //Main content
  const topRatedContainer = document.getElementById('top-rated-movies');
  const upcomingContainer = document.getElementById('upcoming-movies');
  const recentContainer = document.getElementById('recent-movies');

  function createMovieCard(movie, idx, container) {
    const movieCard = document.createElement('div');
    
    movieCard.innerHTML = `
      <div class="movie-card-container">
        <div class="movie-card">
          <img id="picture" src="${config.imgBaseUrl+movie[idx].poster_path}">
        </div>
      <p>${movie[idx].title}</p>
      </div>
    `;

    container.appendChild(movieCard);
  }

  async function fetchTopRatedMovie() {
    let response = await fetch(addLanguageToUrl(config.topRatedUrl), options);
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
        createMovieCard(result, index, topRatedContainer);
        
      }
    }
  )

  async function fetchUpcomingMovie() {
    let response = await fetch(addLanguageToUrl(config.upcomingUrl), options);
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
        createMovieCard(result, index, upcomingContainer);        
      }
    }
  )

  async function fetchRecentMovie() {
    let response = await fetch(addLanguageToUrl(config.recentUrl), options);
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
        createMovieCard(result, index, recentContainer);        
      }
    }
  )

const prevButtons = document.getElementsByClassName('prevBtn');
const nextButtons = document.getElementsByClassName('nextBtn');


prevButtons[0].addEventListener('click', function() {
  topRatedContainer.scrollLeft -= 1400;
});
console.log(prevButtons[1]);
nextButtons[0].addEventListener('click', function() {
  topRatedContainer.scrollLeft += 1400;
});

prevButtons[1].addEventListener('click', function() {
  upcomingContainer.scrollLeft -= 1400;
});
console.log(prevButtons[1]);
nextButtons[1].addEventListener('click', function() {
  upcomingContainer.scrollLeft += 1400;
});

prevButtons[2].addEventListener('click', function() {
  recentContainer.scrollLeft -= 1400;
});
console.log(prevButtons[1]);
nextButtons[2].addEventListener('click', function() {
  recentContainer.scrollLeft += 1400;
});