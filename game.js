const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text') );
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressbarfull = document.getElementById("progressbarfull");

const loader = document.getElementById("loader");
const game = document.getElementById("game");


let currentQuestion = {};
let acceptingAnswers = false;
let score =0;
let questionCounter =0;
let availableQuestions =[];

let questions = [];

// fetch("question.json").then(res => {
//                     return res.json();
//     })
//     .then(loadedQuestions => {
//                     // console.log("loadedQuestions");
//                     questions = loadedQuestions;
//                     startGame();
//     })
//     .catch(err => {
//         console.log(err);
//     })

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple").then(res => {
        return res.json();
})
    .then(loadedQuestions => {
        // console.log("loadedQuestions");
        // console.log(loadedQuestions);
        // console.log(loadedQuestions.results);

            // loadedQuestions is the content loaded from the external link
            questions = loadedQuestions.results.map(loadedQuestions => {
            const formattedQuestion = {
                question : loadedQuestions.question
            };
            //  formattedQuestion.answers shows random index from 0 to 3
            const answerChoices = [...loadedQuestions.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(formattedQuestion.answer - 1 , 0 , loadedQuestions.correct_answer);

            answerChoices.forEach((choice, index) => {
       
                // console.log(choice , index);
                formattedQuestion["choice" + (index + 1 )] = choice;
            });
            return formattedQuestion;
        });
        startGame();
})
    .catch(err => {
console.log(err);
})

//CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

function startGame()
{
    questionCounter = 0;
    availableQuestions = [...questions];
    score = 0;
    console.log(availableQuestions);   
    getNewQuestion(); 
    game.classList.remove("hidden");
    loader.classList.add("hidden");
}

function getNewQuestion()
{
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS)
    {
        localStorage.setItem("mostRecentScore",score);
  
        // go to end page
        return window.location.assign('/end.html');
    }

    questionCounter++;
    // questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    progressText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;

    // update the progressbar
    progressbarfull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;
    
    

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    
    question.innerText = currentQuestion.question;

    choices.forEach(choice =>{

        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + number]; 
        // it puts current question ka choice1/2/3/4 into innertext 
    });

    availableQuestions.splice(questionIndex,1);
    acceptingAnswers = true;

};

choices.forEach(choice =>{
    choice.addEventListener("click", e=>{
        if(!acceptingAnswers) return;


        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";  
        if (classToApply === "correct")
        {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(()=> {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },500)

    });
});


incrementScore = num => {
    score += num;
    scoreText.innerText = score;
    };

