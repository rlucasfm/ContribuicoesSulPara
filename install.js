
let myPrompt;
const pwAlert = document.querySelector(".pw_alert");
const btnPwa = document.querySelector(".pw_alert_btn");

console.log("carregou istall.js");

window.addEventListener('beforeinstallprompt',(e) => {
    e.preventDefault();
    
    console.log("Pronto pra instalar", e);
    
    myPrompt = e;
    
    pwAlert.style.display = "block"; //exibe botão se cumprir os requisitos
});

btnPwa.addEventListener('click', () =>{
    
    pwAlert.style.display = "none";
    myPrompt.prompt();
    myPrompt.userChoice
            .then((choiceResult) => {
                
                if(choiceResult === "acepted"){
                    
                    console.log("usuario instalou");
                    
                }else{
                    
                    console.log("usuario não aceitou");
                }
            });
    
});
