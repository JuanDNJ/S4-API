import './style.css'

import { AcuditComponent, createImage } from './components';
import { getAcudit, addReportAcudit, getDateToISO, createReportAcudit, getCityIp, getApiCloud, geolocationPosition } from './utils';
import type { Url, ReportAcudits, Acudit, Score, Geolocation } from './types';

const URL: Url = 'https://icanhazdadjoke.com/';

let reportAcudits: ReportAcudits[] = [];

const nextJoke = document.querySelector<HTMLButtonElement>(".nextJoke");

const contentAcudit = document!.querySelector<HTMLElement>(".content-acudit")
const region = document.querySelector<HTMLElement>('.region');
const timezone = document.querySelector<HTMLElement>('.timezone');
const city = document.querySelector<HTMLElement>('.city');



geolocationPosition(
    async (geolocation: Geolocation) => {
        console.log(geolocation)
        const dataIpInfo = await getCityIp();
        city!.innerHTML = `${dataIpInfo.city}`
        region!.innerHTML = `${dataIpInfo.region}`
        timezone!.innerHTML = `${new Date(geolocation.timestamp).toLocaleDateString()}`
        geolocation && renderCloud(geolocation);
    },
    (error: any) => console.log(error)
)

const renderCloud = async (location: Geolocation) => {
    try {
        if (!location) throw new Error("No location")
        const position = { latitude: location.coords.latitude, longitude: location.coords.longitude }
        const cloud = await getApiCloud(position);
        cloud && console.log(cloud)
        const cloudImages = document.querySelector<HTMLElement>('.cloud-images');
        cloudImages!.innerHTML = createImage(cloud && cloud.data.values.weatherCode, "48", "48")
    } catch (error) {
        console.error(error)
    }
}


const render = async () => {
    const acudit: Acudit = await getAcudit(URL)
    contentAcudit!.innerHTML = /*html*/  AcuditComponent(acudit)
    const listBtnScore = [...document.querySelectorAll<HTMLButtonElement>(".score")];
    listBtnScore.forEach((score) => {

        score.addEventListener("click", (event: any) => {
            // console.log(event.target.dataset.score)

            const score: Score = event.target.dataset.score;
            const date: string = getDateToISO();
            const joke: string = acudit.joke;

            const newReportAcudit = createReportAcudit(joke, score, date)

            reportAcudits = addReportAcudit(reportAcudits, newReportAcudit);
        })
    })
    console.log({ acudit, reportAcudits: reportAcudits })
}

render();

nextJoke?.addEventListener("click", () => {
    render();
})
