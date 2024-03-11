import './style.css'
import { getAcudit, render, initRender, onClickButton } from './utils';


const URL: string = 'https://icanhazdadjoke.com/';

render('#app', /*html*/initRender)

getAcudit(URL).then(res => {
    const {id, joke, status} = res
    render('.body', /*html*/ `
        <article class="content">
            <h1>Preparat per riure?</h1>
            <p class="text-joke" data-id="${id}">${status === 200 ?  joke : `Ups Error ${status}!`}</p>
        </article>
    `)
    console.log(res)
}).catch(err => console.error(err))


 onClickButton('.nextJoke', "nextJoke");

 globalThis?.addEventListener("onClickButton", (event: any) => {
    // console.log(event.detail)
    if(event.detail === "nextJoke"){
        getAcudit(URL).then(res => {
            render('.text-joke', /*html*/res.joke)
        }).catch(err => console.error(err))
    }
})

