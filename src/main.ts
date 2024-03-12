import './style.css'

import { getAcudit, addReportAcudit, getDateToISO, createReportAcudit} from './utils';
import type {Url, ReportAcudits, Acudit, Score} from './types';

const URL: Url = 'https://icanhazdadjoke.com/';

let reportAcudits: ReportAcudits[] = [];

const nextJoke = document.querySelector<HTMLButtonElement>(".nextJoke");

const contentAcudit = document!.querySelector<HTMLElement>(".content-acudit")

const render = async () => {
    const acudit: Acudit = await getAcudit(URL)

    contentAcudit!.innerHTML = /*html*/  (`
        <p class="content-text flex-1 flex items-center text-xl text-center p-4 ">${acudit.joke}</p>
        <div class="scores flex justify-center gap-4 p-4 row-span-1">
            <button type="button" class="score py-2 px-4 text-4xl" data-score="1">☹️</button>
            <button type="button" class="score py-2 px-4 text-4xl" data-score="2">🙂</button>
            <button type="button" class="score py-2 px-4 text-4xl" data-score="3">🤣</button>
        </div>
    `);
    const listBtnScore = [...document.querySelectorAll<HTMLButtonElement>(".score")];
    listBtnScore.forEach((score) => {
     
        score.addEventListener("click", (event: any)=>{
            // console.log(event.target.dataset.score)

            const score: Score = event.target.dataset.score;
            const date: string =  getDateToISO();
            const joke: string = acudit.joke;

            const newReportAcudit = createReportAcudit(joke, score , date)

            reportAcudits = addReportAcudit(reportAcudits, newReportAcudit); 
        })
    })
    console.log({acudit,reportAcudits: reportAcudits})
}

render();

nextJoke?.addEventListener("click", () =>{
    render();
})
