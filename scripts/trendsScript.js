const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzljZjQzY2QxMmY3NDA3MDZhOWQ4MGU2MWQyODc1ZCIsInN1YiI6IjYyMjA5ZTllZGQ4M2ZhMDA3MzFjZmRjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d8WcSEz0f3ZgwuRpinu3Xvdcz5On0gV8RIpfkKnjueE";
const url = "https://api.themoviedb.org/3/movie/popular";
const configUrl = "https://api.themoviedb.org/3/configuration";
const container = document.querySelector("#containerFlex");
const logo = document.getElementById('logo');
const burgerMenu = document.getElementById('burgerMenu');
const moreMovieBtn = document.getElementById('moreResult');

let page = 1;

function createMovieCard(movie, idx, imgUrl){
    const movieCard = document.createElement('div');
    const movieRateRounded = Math.round((movie[idx].vote_average) * 10) / 10;
    const completeImageUrl = imgUrl+'original'+movie[idx].poster_path
    ;
    movieCard.innerHTML = `
        <div id="movie-card">
            <img id="movie-img" src="${completeImageUrl}" alt="">
            <div id="movie-rate">${movieRateRounded}</div>
        </div>
    `;
    movieCard.addEventListener('click', function () {
        window.location.href = '../pages/movieDetails.html';
    } );
    container.appendChild(movieCard);
}

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
};

async function fetchImageBaseUrl(){
  try {
    let response = await fetch(configUrl, options);
    if (!response.ok) {
      throw new Error('Network response not ok!');
    }
    let data = await response.json();
    let result = data.images.base_url;
    console.log(data);
    console.log(result);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function fetchPopularMovie(page = 1){
    try {
      let response = await fetch(`${url}?page=${page}`, options);
      if (!response.ok) {
        throw new Error("Network response not ok !");
      }
      let data = await response.json();
      let result = data.results;
      
      console.log(data);
      console.log(result);
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
}

fetchPopularMovie().then(
    async result => {
      let baseUrl = await fetchImageBaseUrl();
      console.log(baseUrl);
      
      for (let index = 0; index < result.length; index++) {
        createMovieCard(result, index, baseUrl);
    }}
  ).catch(error => {
    console.error(error);
  })

  
logo.addEventListener('click', function() {
  window.location.href = '../index.html';
});
burgerMenu.addEventListener('click', function() {
  alert('feature on progress');
});
moreMovieBtn.addEventListener('click', function() {
  page++;
  fetchPopularMovie(page).then(
    async result => {
      let baseUrl = await fetchImageBaseUrl();
      console.log(baseUrl);
      
      for (let index = 0; index < result.length; index++) {
        createMovieCard(result, index, baseUrl);
    }})
    .catch(error => {
      console.error(error);
    })
});