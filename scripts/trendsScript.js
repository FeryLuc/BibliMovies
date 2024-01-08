
const ApiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzljZjQzY2QxMmY3NDA3MDZhOWQ4MGU2MWQyODc1ZCIsInN1YiI6IjYyMjA5ZTllZGQ4M2ZhMDA3MzFjZmRjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d8WcSEz0f3ZgwuRpinu3Xvdcz5On0gV8RIpfkKnjueE";
const url = "https://api.themoviedb.org/3/movie/popular";
const container = document.querySelector("#containerFlex");
const logo = document.getElementById('logo');
const burgerMenu = document.getElementById('burgerMenu');

function createMovieCard(movie, idx){
    const movieCard = document.createElement('div');
    const movieRateRounded = Math.round((movie[idx].vote_average) * 10) / 10;
    movieCard.innerHTML = `
        <div id="movie-card">
            <img id="movie-img" src="https://img.freepik.com/vecteurs-libre/fond-rouge-aquarelle-valentine-rouge_1340-4006.jpg?w=740&t=st=1704686205~exp=1704686805~hmac=e7c749dd026efa770862781467977463e53ca379b9c71dc10ffff058fae9c4e1" alt="">
            <p id="movie-title">${movie[idx].title}</p>
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
      Authorization: `Bearer ${ApiKey}`
    }
};

async function fetchPopularMovie(){
    try {
      let response = await fetch(url, options);
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
  
fetchPopularMovie()
.then(
  result => {
    for (let index = 0; index < result.length; index++) {
      createMovieCard(result, index);
  }})
  .catch(error => {
    console.error(error);
  })

  logo.addEventListener('click', function() {
    window.location.href = '../index.html';
  });
  burgerMenu.addEventListener('click', function() {
    alert('feature on progress');
  });