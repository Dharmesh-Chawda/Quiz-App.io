const highScorelist = document.getElementById("highscore-list");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScorelist.innerHTML = highScores.map(score => {
    return `<li class="high-score" >${score.name} - ${score.score}</li>`;
}).join("");
;
