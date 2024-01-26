import { config, options, addLanguageToUrl, formattingDate, pages } from '../config.js';
const urls = config;
const optns = options
const urlWithLang = addLanguageToUrl;

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
        console.log(data);
        localStorage.clear();
    } catch (error) {
        console.error(error);
    }
}

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`Clé : ${key}, Valeur : ${value}`);
}