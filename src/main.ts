import './style.css'

import { getAcudit, render, initRender, onClickButton, myError } from './utils';


const URL: string = 'https://icanhazdadjoke.com/';

// generar un array anomenat reportAcudits
let reportAcudits: ReportAcudit[] = []

// Create type ReportAcuidit
type ReportAcudit = {
    joke: string;
    score: number;
    date: string;
}



render('#app', /*html*/initRender)

getAcudit(URL).then(res => {
    const { id, joke, status } = res
    render('.body', /*html*/ `
        <article class="content h-96 w-[100%] md:w-[50vw] bg-white shadow-2xl rounded-xl py-6 flex flex-col items-center justify-between">
            <h1 class="flex-1 text-2xl font-bold">Preparat per riure?</h1>
            <p class="text-joke px-4 text-xl  text-center text-pretty" data-id="${id}">${status === 200 ? joke : `Ups Error ${status}!`}</p>
            <aside class="flex py-6 items-center gap-4">
            <button class="report text-4xl" data-event="report" data-joke="${joke}" data-score="1">😓</button>
            <button class="report text-4xl" data-event="report" data-joke="${joke}" data-score="2">😐</button>
            <button class="report text-4xl" data-event="report" data-joke="${joke}" data-score="3">😆</button>
            </aside>
            <footer class="flex-1 flex flex-col items-cente justify-end py-4">
                <button data-event="nextJoke" class="nextJoke text-stone-100 bg-blue-500 active:text-stone-800 active:bg-stone-100 p-4 rounded-md  font-bold" data-click="onClickButton" >Següent acudit</button>
            </footer>
        </article>
    `)
    onClickButton('.report', "addReport", "all");
    onClickButton('.nextJoke', "nextJoke");
    console.log(res)
}).catch(err => console.error(err))




globalThis?.addEventListener("onClickButton", (event: any) => {
    // console.log(event.detail)
    try {
       
        if (!event.detail) throw myError("Falta el detalle");
        const { dataset } = event.detail

        if (dataset.event === "report") {
            console.log("report")
            reportAcudits = [...reportAcudits, {
                joke: dataset.joke,
                score: Number(dataset.score),
                date: new Date().toISOString()
            }]
        }
        if (dataset.event === "nextJoke") {
            console.log("nextJoke")
            getAcudit(URL).then(res => {
                render('.text-joke', /*html*/res.joke)
                console.log(res)
            }).catch(err => console.error(err))
        }
    } catch (error: any) {
        console.error(error.message)
    }

    console.log(reportAcudits)
})

