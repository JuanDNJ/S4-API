import './style.css'

import { AcuditComponent } from './utils/componets';
import { getAcudit, addReportAcudit, getDateToISO, createReportAcudit, getApiCloud} from './utils';
import type {Url, ReportAcudits, Acudit, Score} from './types';

const URL: Url = 'https://icanhazdadjoke.com/';

let reportAcudits: ReportAcudits[] = [];

const nextJoke = document.querySelector<HTMLButtonElement>(".nextJoke");

const contentAcudit = document!.querySelector<HTMLElement>(".content-acudit")

const render = async () => {
    const acudit: Acudit = await getAcudit(URL)
    const cloud = await getApiCloud();
    console.log(cloud)

    contentAcudit!.innerHTML = /*html*/  AcuditComponent(acudit)
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
