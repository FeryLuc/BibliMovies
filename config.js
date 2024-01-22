const config = {
    apiKey: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzljZjQzY2QxMmY3NDA3MDZhOWQ4MGU2MWQyODc1ZCIsInN1YiI6IjYyMjA5ZTllZGQ4M2ZhMDA3MzFjZmRjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d8WcSEz0f3ZgwuRpinu3Xvdcz5On0gV8RIpfkKnjueE",
    topRatedMovieUrl: "https://api.themoviedb.org/3/movie/top_rated",
    popularMovieUrl: "https://api.themoviedb.org/3/movie/popular",
    upcomingMovieUrl: "https://api.themoviedb.org/3/movie/upcoming",
    recentMovieUrl: "https://api.themoviedb.org/3/movie/now_playing",
    imgBaseUrl: "http://image.tmdb.org/t/p/original",
    topRatedSerieUrl: "https://api.themoviedb.org/3/tv/top_rated",
    upcomingSerieUrl: "https://api.themoviedb.org/3/tv/on_the_air",
    popularSerieUrl: "https://api.themoviedb.org/3/tv/popular"


}
const titlePages = {
  cinemaMovie: "Films au cinéma - Cinépédia",
  topRatedMovie: "Films les mieux notés - Cinépédia",
  upcomingMovie: "Films à venir - Cinépédia",
  popularMovie: "Films populaires - Cinépédia",
  topRatedSerie: "Séries les mieux notées - Cinépédia",
  upcomingSerie: "Séries en diffusion - Cinépédia",
  popularSerie: "Séries populaires - Cinépédia"
}
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${config.apiKey}`
    }
};

const languageParam = "fr-FR"; 
const addLanguageToUrl = (url) => {
    return `${url}?api_key=${config.apiKey}&language=${languageParam}`;
};

const formattingDate = (date1, date2) => {
  // Date au format "2024-01-14"
const dateString1 = date1;
const dateString2 = date2;
// Création d'un objet Date à partir de la chaîne de caractères
const dateObject1 = new Date(dateString1);
const dateObject2 = new Date(dateString2);
// Obtention du jour et du mois
const day1 = dateObject1.getDate();
const month1 = dateObject1.getMonth() + 1; // Les mois commencent à partir de zéro
const day2 = dateObject2.getDate();
const month2 = dateObject2.getMonth() + 1;
// Formatage de la date en "JJ/MM"
const formattedDate1 = `${day1}/${month1 < 10 ? '0' : ''}${month1}`;
const formattedDate2 = `${day2}/${month2 < 10 ? '0' : ''}${month2}`;
return [formattedDate1, formattedDate2];
}

export { config, options, addLanguageToUrl, formattingDate, titlePages };