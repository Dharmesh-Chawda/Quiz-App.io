const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalscore = document.getElementById("finalscore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem('highScores'))|| [];

const MAX_HIGH_SCORES = 5;
finalscore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = (e) => {
    console.log("Clicked the Save ");
    e.preventDefault();

const rec =  {
    name : username.value,
    score : mostRecentScore
};
highScores.push(rec);
highScores.sort( (a,b) => (b.score - a.score));
highScores.splice(5);

localStorage.setItem('highScores', JSON.stringify(highScores));

window.location.assign('/');

};

