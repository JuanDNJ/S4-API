import './style.css'

import { AcuditComponent, createImage } from './components';
import { getAcudit, addReportAcudit, getDateToISO, createReportAcudit,getCityIp, getApiCloud, geolocationPosition} from './utils';
import type {Url, ReportAcudits, Acudit, Score, Geolocation} from './types';

const URL: Url = 'https://icanhazdadjoke.com/';

let reportAcudits: ReportAcudits[] = [];

const nextJoke = document.querySelector<HTMLButtonElement>(".nextJoke");

const contentAcudit = document!.querySelector<HTMLElement>(".content-acudit")
const dataIpInfo = await getCityIp();

geolocationPosition(
    (res: Geolocation) => {
        console.log(res)
     
        
        const location = {latitude: res.coords.latitude, longitude: res.coords.longitude}
       
       const cloudImages = document.querySelector<HTMLElement>('.cloud-images');
       cloudImages!.innerHTML = `${dataIpInfo.city}`

        // getApiCloud(location).then(res => {
        // cloudImages!.innerHTML = `${res.data.time} ${res.data.value}`
        // }).catch();
    },
    (error: any) => console.log(error)
)
const renderCloudImage = async () => {
    // const cloud = await getApiCloud((res )=> res);
    // console.log(cloud)
    // getApiCloud((res: Geolocation) => {
    //     console.log(res);
    // })
    // const cloudImages = document.querySelector<HTMLElement>('.cloud-images');
    // cloudImages!.innerHTML = createImage(cloud.data.values.weatherCode)
}
renderCloudImage();

const render = async () => {
    const acudit: Acudit = await getAcudit(URL)
    
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
