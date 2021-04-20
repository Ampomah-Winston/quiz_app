const question = document.getElementById("question")
const choices =Array.from(document.getElementsByClassName('choice-text'))
const progressText = document.getElementById('progressText')
const scoreText = document.getElementById('score')
const progressBarFull = document.getElementById('progressBarFull')

let currentQuestion = {};
let acceptAnswers =false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

/*audio settings*/
var x = document.getElementById("myAudio"); 
x.volume = 0.3;
var dogBark = document.getElementById("dogBark");
dogBark.volume = 0.3;
var applauds = document.getElementById("applauds");
applauds.volume = 0.3;

function playAudio(arg) { 
	if(arg == 'default') {
		x.play(); 
	} else if(arg == 'dogBark'){
		dogBark.play();
	}else{
		applauds.play();
	}	
} 
function stopAudio() { 
	x.stop();
} 

let questions = [  
	{
		question:" Which Command is used to show limited number of commits?",
		choice1:  "git fetch" ,
		choice2: "git log -n ",
		choice3: "git config" ,
		choice4: "git status",
		answer: 2,
	},
	{	question: "Which command defines the author email to be used for all commits by the current user.",	
		choice1: "git clean -f ",
		choice2: "git config --global user.email" ,
		choice3: "git merge --no-ff", 
		choice4: "git email--amend",
		answer:2,
	},
	{
		question:" ____________ command is useful for getting a high-level overview of the project history.", 		
		choice1: "git log --oneline",
		choice2: "git reset --hard",
		choice3: "git log --author=''",
		choice4: "git rebase",
		answer:1,
	},
	{
		question:" ___________________ removes untracked files from your working directory",
		choice1: "git commit",
		choice2: "git clean -f",
		choice3: "git clean",
		choice4: "git reset",
		answer:3,
	},
	{
		question:" Which command creates an empty Git repository in the specified directory?",
		choice1: "git reset ",
		choice2: "git log ..",
		choice3: "git init", 
		choice4: "git init --bare", 
		answer:3,
	},
	{
		question: "Command to download all the objects and references from a specified repository",
		choice1:" git config --list",
		choice2: "git help ",
		choice3: "git fetch" ,
		choice4: "git log -n" ,
		answer:3,
	},
	{
		question: "Git command to compare two specified branches",
		choice1: "git diff ...",
		choice2: "git merge", 
		choice3: "git blame -L",
		choice4: "git push --tags",
		answer:1,
	},
	{
		question: "_____________ command renames the current branch to <branch>",
		choice1: "git remote rm", 
		choice2: "git branch -m", 
		choice3:"git branch -D (CAPS)",
		choice4: "git rebase",
		answer:2,
	},
	{	question: "Which Git command displays the patch representing each commit.",
		choice1: "git branch",
		choice2: "git remote -v",
		choice3: "git log -p",
		choice4: "git log",
		answer:3,
	},	
	{
		question: "Which of the following command line environment is used for interacting with Git ?",
		choice1: "Git Bash",
		choice2: "GitHub",
		choice3: "Git Boot",
		choice4: "Git Lab",
		answer:1,
	},
	{
		question: "In Git, if you want to make your local repository reflect changes that have been made in a remote (tracked) repository, you should run the pull command",
		choice1: "True",
		choice2: "False",
		choice3: "Maybe",
		choice4: "Neither",
		answer:1,
	},
	{
		question: "If you want to make radical changes to your team’s project and don’t want to impact the rest of the team, you should implement your changes in -",
		choice1: "the root",
		choice2: "a tag",
		choice3: "the trunk",
		choice4: "None of the above",
		answer:4,
	},
	{
		question: "The Git clone command does which of the following?",
		choice1: "Makes a local copy of the repository",
		choice2: "Creates a working directory",
		choice3: "Commits a new branch",
		choice4: "Both 1 & 2",
		answer:4,
	},
	{
		question: "Which one of the following is not part of the data structure of a Git repository?",
		choice1: "Branch pointer",
		choice2: "Body element",
		choice3: "Commit object",
		choice4: "Head pointer",
		answer:2,
	},
	{
		question: "Which of these Git client commands creates a copy of the repository and a working directory in the client’s workspace.",
		choice1: "checkout",
		choice2: "clone",
		choice3: "import",
		choice4: "update",
		answer:2,
	},
	{
		question: "Git is a .................... Version Control tool.",
		choice1: "Decentralized",
		choice2: "Centralized",
		choice3: "Emphasized",
		choice4: "Customized",
		answer:1,
	},
	{
		question:" GIT belongs to the............. generation of Version Control tools",
		choice1: "2nd",
		choice2: "3rd",
		choice3: "4th",
		choice4: "5th",
		answer:2,
	},
	{
		question: "The main objectives of Git are -",
		choice1: "speed",
		choice2: "data integrity",
		choice3: "support for distributed non-linear workflows",
		choice4: "All of the above",
		answer:4,
	},
	{
		question: "What language is used in Git?",
		choice1: "C",
		choice2: "HTML",
		choice3: "PHP",
		choice4: "C++",
		answer:3,
	},
	{
		question: "Git command .................... used to give tags to the specified commit.",
		choice1: "git checkout [branch name]",
		choice2: "git show [commit]",
		choice3: "git tag [commitID]",
		choice4: "git rm [file]",
		answer:3,
	},
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS =3;

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions]
	getNewQuestion();
	playAudio('default');
}

getNewQuestion = () => {
	if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
		localStorage.setItem('mostRecentScore_git' , score);
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

startGame();