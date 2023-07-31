let movies = ["Comédie", "Thriller", "Action", "Horreur", "Science-fiction", "Fantastique", "Animation", "Documentaire", "Drame", "Biopic", "Romantique", "Historique", "Court-métrage", "Aventure"];

console.log(movies.sort());

//Click event
let trendsButton = document.getElementById("trendsBtn");
trendsButton.addEventListener("click", function(){
    console.log("J'affiche les tendances !");
    window.location.href = "./trends.html";
});


const allLinks = document.querySelectorAll("a");
console.log(allLinks);
//créer une variable dynamique dans l'url
allLinks.forEach(element => {
    element.href = "https://www.google.be";
});