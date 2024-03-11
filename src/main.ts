import './style.css'

import { getAcudit} from './utils';


const URL: string = 'https://icanhazdadjoke.com/';

let reportAcudits: any[] = [];

async function acudits () {
    const acudit = await getAcudit(URL)
    return acudit
};


const nextJoke = document.querySelector<HTMLButtonElement>(".nextJoke");

const contentAcudit = document!.querySelector<HTMLElement>(".content-acudit")

const render = async () => {
    const acudit = await getAcudit(URL)

    contentAcudit!.innerHTML = /*html*/  (`
        <p class="content-text flex-1 flex items-center text-xl text-center p-4 ">${acudit.joke}</p>
        <div class="scores flex justify-center gap-4 p-4 row-span-1">
        <button type="button" data-joke="${acudit.joke}" class="score py-2 px-4 text-4xl" data-score="1">☹️</button>
        <button type="button" data-joke="${acudit.joke}" class="score py-2 px-4 text-4xl" data-score="2">🙂</button>
        <button type="button" data-joke="${acudit.joke}" class="score py-2 px-4 text-4xl" data-score="3">🤣</button>
        </div>
    `);
    const listBtnScore = [...document.querySelectorAll<HTMLButtonElement>(".score")];
    listBtnScore.forEach((score) => {
     
        score.addEventListener("click", (event: any)=>{
            // console.log(event.target.dataset.score)
            const isExistReport = reportAcudits.some(rec => rec.joke === acudit.joke);
            if(isExistReport) {
                reportAcudits.map(rec => {
                    if(rec.joke === acudit.joke){
                        rec.score = event.target.dataset.score
                    }
                    return rec
                })
            }else{
                reportAcudits = [...reportAcudits, {score: parseInt(event.target.dataset.score),joke: event.target.dataset.joke, date: new Date().toISOString()}]
            }
           
           
        })
    })
    console.log({acudit,reportAcudits: reportAcudits})
}
render();
nextJoke?.addEventListener("click", async  (btn) =>{
    render();
})
