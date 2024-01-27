import { config, options, addLanguageToUrl, formattingDate, pages } from '../config.js';
const urls = config;
const optns = options
const urlWithLang = addLanguageToUrl;
const poster = document.getElementById('poster');
const backdrop = document.getElementById('backdrop');
const title = document.getElementById('title');
const tagline = document.getElementById('tagline');
const description = document.getElementById('desc');
const genresList = document.getElementById('genres');

if (localStorage.getItem('movieId') !== null) {
    const maDonnee = JSON.parse(localStorage.getItem('movieId'));
    console.log(maDonnee);
    fetchMovie(urls.movieIdUrl, maDonnee);
    
} else if (localStorage.getItem('serieId') !== null){
    const maDonnee = JSON.parse(localStorage.getItem('serieId'));
    console.log(maDonnee);
    fetchMovie(urls.serieIdUrl, maDonnee);
}

async function fetchMovie(url, id) {
    try {
        let response = await fetch(urlWithLang(url+id), optns);
        if (!response.ok) {
            throw new Error("Network response not ok !");
        }
        let data = await response.json();
        let genres = data.genres;
        console.log(data);
        doWithResult(data, genres);
        localStorage.clear();
    } catch (error) {
        console.error(error);
    }
}

function doWithResult(data, genres) {
    let movieTitle = data.title;
    if ('name' in data) {
        movieTitle = data.name;
    }
    backdrop.style.backgroundImage = `url(${urls.imgBaseUrl+data.backdrop_path})`;
    poster.src = urls.imgBaseUrl+data.poster_path;
    
    if (data.tagline !== "") {
        title.textContent = movieTitle+' - ';
        tagline.textContent = data.tagline;
    }else{
        title.textContent = movieTitle;
    }
    
    for (const genre of genres) {
        const genreItem = document.createElement('li');
        genreItem.textContent = genre.name;
        genresList.appendChild(genreItem);
    }
    

    description.textContent = data.overview;
}

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`Clé : ${key}, Valeur : ${value}`);
}