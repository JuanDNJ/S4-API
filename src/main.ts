import './style.css'

import type { Url, ReportAcudits, Acudit, Score, Geolocation, Position } from './types';
import { AcuditComponent, createImage } from './components';
import {
    URL,
    $,
    $all,
    getAcudit,
    addReportAcudit,
    getDateToISO,
    createReportAcudit,
    getCityIp,
    getApiCloud,
    geolocationPosition
} from './utils';

let reportAcudits: ReportAcudits[] = [];

const nextJoke = $(".nextJoke");
const contentAcudit = $(".content-acudit")
const region = $('.region');
const city = $('.city');

geolocationPosition(
    async (geolocation: Geolocation) => {
        console.log(geolocation)
        const dataIpInfo = await getCityIp();
        city!.innerHTML = `${dataIpInfo.city}`
        region!.innerHTML = `${dataIpInfo.region}`
        geolocation && renderCloud(geolocation);
    },
    (error: any) => console.log(error)
)

const renderCloud = async (location: Geolocation) => {
    try {
        if (!location) throw new Error("No location")
        const position: Position = { latitude: location.coords.latitude, longitude: location.coords.longitude }
        // const cloud = await getApiCloud(position);
        cloud && console.log(cloud)
        const cloudImages = $('.cloud-images');
        cloudImages!.innerHTML = createImage(cloud && cloud.data.values.weatherCode, "48", "48")
    } catch (error) {
        console.error(error)
    }
}


const render = async () => {
    const acudit: Acudit = await getAcudit(URL)
    contentAcudit!.innerHTML = /*html*/  AcuditComponent(acudit)
    const listBtnScore = $all(".score");
    listBtnScore!.forEach((score) => {

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
