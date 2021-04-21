const question = document.getElementById("question")
const choices =Array.from(document.getElementsByClassName('choice-text'))
const progressText = document.getElementById('progressText')
const scoreText = document.getElementById('score')
const progressBarFull = document.getElementById('progressBarFull')


let subject = localStorage.getItem("subject");
let difficulty = localStorage.getItem("difficulty");
let numOfQuest = localStorage.getItem("numOfQuest");
let CORRECT_BONUS = 0;

let questionApi = "";//holds the current api question query to trivia db

console.log("attr => "+ subject,difficulty,numOfQuest);

let currentQuestion = {};
let acceptAnswers =false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions =[];


function myApi (subjec,diffic,numberQuest) {
	console.log(diffic);
	let cat = "0";
	switch (subjec) {
		case "General Knowledge":
			cat = "9";
			break;
	
		case "Computer Science":
			cat = "18";
			break;

		case "Science & Nature":
				cat ="17";
			break;	
	}	

	switch (diffic) {
		case "easy":
			CORRECT_BONUS = 10;
			console.log(CORRECT_BONUS);
			break;
	
		case "medium":
			CORRECT_BONUS = 15;
			console.log(CORRECT_BONUS);
			break;

		case "hard":
			CORRECT_BONUS = 25;
			console.log(CORRECT_BONUS);
			break;	
		default:
			CORRECT_BONUS = 1;
			break;
	}	
	return `https://opentdb.com/api.php?amount=${numberQuest}&category=${cat}&difficulty=${diffic}&type=multiple`;
}
// "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
// load questions "../jsons/questions.json" | 
fetch(myApi(subject,difficulty.toLowerCase(),numOfQuest)).then(res=>{
	return res.json();
}).then(loadedQuestions=>{
	// console.log(loadedQuestions.results);
			questions  =  loadedQuestions.results.map( loadedQuestion =>{	
				// console.log(loadedQuestion.incorrect_answers);					
				const formattedQuestion = {
					question: loadedQuestion.question
				};

				const answerChoices = [...loadedQuestion.incorrect_answers];
									
				formattedQuestion.answer = Math.floor(Math.random() * 3)+1;
				console.log(formattedQuestion);	
				answerChoices.splice(
					formattedQuestion.answer - 1, 
					0, 
					loadedQuestion.correct_answer
				);
				answerChoices.forEach((choicea,index)=>{
					formattedQuestion ["choice" + (index+1)] = choicea;
					
				});
				return formattedQuestion;
			});
			startGame();
}).catch(eer=>{
	console.error(eer);
})


const MAX_QUESTIONS = numOfQuest;

var x =  document.getElementById("myAudio"); ;

function playAudio(arg) { 
	if(arg == 'default') {
		x = document.getElementById("myAudio"); 
		x.volume = 0.3;
		x.play(); 
	} else if(arg == 'dogBark'){
		x = document.getElementById("dogBark"); 
		x.volume = 0.3;
		x.play();
	}else{
		x = document.getElementById("applauds");
		x.volume = 0.3;
		x.play();
	}	
} 
function stopAudio() { 
	x.stop;
} 

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions]
	getNewQuestion();
	playAudio('default');
}

getNewQuestion = () => {
	if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
		localStorage.setItem(subject , score);
		return  window.location.assign("../html/end.html");
	}	
	questionCounter++;
	progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
	progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
	console.log(questionCounter / MAX_QUESTIONS);

	const questionIndex = Math.floor(Math.random()*availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	question.innerText = currentQuestion.question;

	choices.forEach(choice => {
		const number = choice.dataset["number"];
		choice.innerText = currentQuestion["choice" + number];
	});

	availableQuestions.splice(questionIndex, 1);
	acceptAnswers =true;
	stopAudio();
}
	choices.forEach(choice => {
		choice.addEventListener('click',e =>{
			if(!acceptAnswers) return;

			acceptAnswers =false;
			const selectedChoice = e.target;
			const selectAnswer = selectedChoice.dataset["number"];

			const classToApply = selectAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

			selectedChoice.parentElement.classList.add(classToApply);
			
				if(classToApply == 'correct'){
					playAudio('applauds')
					console.log(CORRECT_BONUS);
					increment(CORRECT_BONUS);					
				}else if(classToApply == 'incorrect'){
					playAudio('dogBark')					
				}			

			setTimeout(()=>{
				selectedChoice.parentElement.classList.remove(classToApply);
				if(classToApply == 'correct'){					
					getNewQuestion();
				}else if(classToApply == 'incorrect'){					
					getNewQuestion();
				}				
			}, 900);

			
		})
	});

	increment = num => {
		score += num;
		scoreText.innerText = score;
	}