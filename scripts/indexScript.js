import { config, options } from '../config.js';
//header
const logo = document.getElementById('logo');
const burgerMenu = document.getElementById('burgerMenu');

logo.addEventListener('click', function() {
    window.location.href = '../pages/trends.html';
  });
  burgerMenu.addEventListener('click', function() {
    alert('feature on progress');
  });

  //Main content
  const topRatedContainer = document.getElementById('top-rated-movies');
  const upcomingContainer = document.getElementById('upcoming-movies');
  const recentContainer = document.getElementById('recent-movies');

  function createMovieCard(movie, idx, container) {
    const movieCard = document.createElement('div');
    
    movieCard.innerHTML = `
      <div class="movie-card">
        <img id="picture" src="${config.imgBaseUrl+movie[idx].poster_path}">
      </div>
    `;

    container.appendChild(movieCard);
  }

  async function fetchTopRatedMovie() {
    let response = await fetch(`${config.topRatedUrl}`, options);
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
      for (let index = 0; index < 10; index++) {
        createMovieCard(result, index, topRatedContainer);
        
      }
    }
  )

  async function fetchUpcomingMovie() {
    let response = await fetch(`${config.upcomingUrl}`, options);
    if (!response.ok) {
      throw new Error("Network response not ok !");
    }
    let data = await response.json();
    console.log(data);
    let result = data.results;
    console.log(result);
    return result
  }
  fetchUpcomingMovie().then(
    result => {
      for (let index = 0; index < 10; index++) {
        createMovieCard(result, index, upcomingContainer);        
      }
    }
  )

  async function fetchRecentMovie() {
    let response = await fetch(`${config.recentUrl}`, options);
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
      for (let index = 0; index < 10; index++) {
        createMovieCard(result, index, recentContainer);        
      }
    }
  )

const prevButtons = document.getElementsByClassName('prevBtn');
const nextButtons = document.getElementsByClassName('nextBtn');


prevButtons[0].addEventListener('click', function() {
  topRatedContainer.scrollLeft -= 300;
});
console.log(prevButtons[1]);
nextButtons[0].addEventListener('click', function() {
  topRatedContainer.scrollLeft += 300;
});

prevButtons[1].addEventListener('click', function() {
  upcomingContainer.scrollLeft -= 300;
});
console.log(prevButtons[1]);
nextButtons[1].addEventListener('click', function() {
  upcomingContainer.scrollLeft += 300;
});

prevButtons[2].addEventListener('click', function() {
  recentContainer.scrollLeft -= 300;
});
console.log(prevButtons[1]);
nextButtons[2].addEventListener('click', function() {
  recentContainer.scrollLeft += 300;
});