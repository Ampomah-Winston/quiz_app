const gk_scoreList = document.getElementById('gk_scoreList');
const SciComp_scoreList = document.getElementById('SciComp_scoreList');
const sciNate_scoreList = document.getElementById('sciNate_scoreList');

const gk_highScores =  JSON.parse(localStorage.getItem("gk_highScores")) || [];
const SciNate_highScores =  JSON.parse(localStorage.getItem("SciNate_highScores")) || [];
const SciComp_highScores =  JSON.parse(localStorage.getItem("SciComp_highScores")) || [];

gk_scoreList.innerHTML = 
gk_highScores.map(score =>{return `<li class="high-score">${score.name}-${score.score}</li>`; }) .join("");  
   
sciNate_scoreList.innerHTML = 
SciNate_highScores.map(score =>{return `<li class="high-score">${score.name}-${score.score}</li>`; }) .join("");  
   
SciComp_scoreList.innerHTML = 
SciComp_highScores.map(score =>{return `<li class="high-score">${score.name}-${score.score}</li>`; }) .join("");  
   
