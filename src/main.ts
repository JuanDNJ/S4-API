import './style.css'
import type { ReportAcudits, Score, Geolocation, Position } from './types';
import { AcuditComponent, CloudComponent } from './components';
import Fondo from './assets/fondo-chistes.png'
import {
    $,
    $all,
    addReportAcudit,
    getDateToISO,
    createReportAcudit,
    getCityIp,
    getApiCloud,
    geolocationPosition,
    combineJoke
} from './utils';

let reportAcudits: ReportAcudits[] = [];

const nextJoke = $(".nextJoke");
const contentAcudit = $(".content-acudit")
const cloudRender = $('.cloud');
const sectionBody = $(".body") || null;
sectionBody!.style.backgroundImage = `url(${Fondo})`;
const renderCloud = async () => {
    try {
        geolocationPosition(
            async (geolocation: Geolocation) => {

                const dataIpInfo = await getCityIp();
                const position: Position = { latitude: geolocation.coords.latitude, longitude: geolocation.coords.longitude }
                const cloud = await getApiCloud(position);

                const data = {
                    img: cloud.data.values.weatherCode,
                    city: dataIpInfo!.city,
                    region: dataIpInfo!.region,
                    temperature: cloud.data.values.temperature
                }
                cloudRender!.innerHTML = CloudComponent(data);
            },
            (error: any) => console.log(error)
        )
    } catch (error) {
        console.error(error)
    }
}


const render = async () => {
    const acudit = await combineJoke();
    console.log(acudit)
    contentAcudit!.innerHTML = /*html*/  AcuditComponent(acudit.randomJoke)
    const listBtnScore = $all(".score");
    listBtnScore!.forEach((score) => {

        score.addEventListener("click", (event: any) => {

            const score: Score = event.target.dataset.score;
            const date: string = getDateToISO();
            const joke: string = acudit.randomJoke;

            const newReportAcudit = createReportAcudit(joke, score, date)

            reportAcudits = addReportAcudit(reportAcudits, newReportAcudit);
        })
    })
    console.log({ acudit, reportAcudits: reportAcudits })
}

render();
renderCloud();

nextJoke?.addEventListener("click", () => {
    render();
})
