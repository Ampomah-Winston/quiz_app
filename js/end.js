const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore_git');
const subject = localStorage.getItem('subject');

const gk_highScores =  JSON.parse(localStorage.getItem("gk_highScores")) || [];
const SciNate_highScores =  JSON.parse(localStorage.getItem("SciNate_highScores")) || [];
const SciComp_highScores =  JSON.parse(localStorage.getItem("SciComp_highScores")) || [];

finalScore.innerText = mostRecentScore;
username.addEventListener('keyup',e=>{  
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = (e) =>{
    e.preventDefault();    
    
    const score = {
        score:mostRecentScore,
        name:username.value
    };
    switch(subject){
        case "General Knowledge": 
            gk_highScores.push(score);
            console.log(gk_highScores);
            gk_highScores.sort((a,b) => b.score - a.score )    
            gk_highScores.splice(5); 
            localStorage.setItem("gk_highScores",JSON.stringify(gk_highScores));
            break;
        case "Computer Science":
            SciComp_highScores.push(score);
            console.log(SciComp_highScores);
            SciComp_highScores.sort((a,b) => b.score - a.score )    
            SciComp_highScores.splice(5); 
            localStorage.setItem("SciComp_highScores",JSON.stringify(SciComp_highScores));
            break;
        case "Science & Nature":
            SciNate_highScores.push(score);
            console.log(SciNate_highScores);
            SciNate_highScores.sort((a,b) => b.score - a.score )    
            SciNate_highScores.splice(5); 
            localStorage.setItem("SciNate_highScores",JSON.stringify(SciNate_highScores));
            break;
    }
    
    // window.location.assign("../html/highscores.html");
}