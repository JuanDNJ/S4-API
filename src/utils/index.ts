import type { ReportAcudits, Url, Score, Position, CallBack } from '../types';

const API_KEY_TO_MORROOW_IO = import.meta.env.VITE_API_KEY_TO_MORROOW_IO || "5VmOowQ9mFGlbNE2tNaz4fN75aTbL4SC";
const URL_TO_MORROOW_IO = import.meta.env.VITE_URL_TO_MORROOW_IO || "https://api.tomorrow.io/v4/weather";
const URL_IPINFO_IO = import.meta.env.VITE_URL_IPINFO_IO || "https://ipinfo.io/json";
const URL_CHUCK_NORRIS = import.meta.env.VITE_URL_CHUCK_NORRIS || "https://api.chucknorris.io/jokes/random";

export const URL_ICAN_HAZ_DAD_JOKE = import.meta.env.VITE_URL_ICAN_HAZ_DAD_JOKE || "https://icanhazdadjoke.com";

export const $ = (nameElement: string): HTMLElement | null => {
    return document.querySelector<HTMLElement>(nameElement)
}
export const $all = (nameElement: string): HTMLElement[] | null => {
    return [...document.querySelectorAll<HTMLElement>(nameElement)]
}
export const suma = (a: number, b: number) => {
    return a + b
}

export const getAcudit = async (url: Url) => {
    try {
        const request = await fetch(url, { method: "GET", headers: { 'Accept': 'application/json' } });
        if (!request.ok) throw new Error(`${request.status}`)
        const obJson = await request.json();
        return obJson;
    } catch (error: any) {
        console.error(error.message)
    }
}
export const combineJoke = async () => {
    const dadJoke = await getAcudit(URL_ICAN_HAZ_DAD_JOKE);
  
    const chuckNorris = await getAcudit(URL_CHUCK_NORRIS);

    const newArr = [dadJoke.joke, chuckNorris.value];
    const random = Math.floor(Math.random() * 2)
    const randomJoke = newArr[random];
    return {
        randomJoke
    }
}
export const addReportAcudit = (acudits: ReportAcudits[], acudit: ReportAcudits): ReportAcudits[] => {

    const isExistReport = acudits.some(rec => rec.joke === acudit.joke);

    if (isExistReport) {
        acudits.map(rec => {
            if (rec.joke === acudit.joke) {
                rec.score = acudit.score
            }
            return rec
        })
    } else {
        acudits = [...acudits, { score: acudit.score, joke: acudit.joke, date: getDateToISO() }]
    }
    return acudits;
}

export const getDateToISO = () => new Date().toString();

export const createReportAcudit = (joke: string, score: Score, date: string): ReportAcudits => {
    return {
        joke, score, date
    };
}

export const geolocationPosition = (callback: CallBack, error: any) => {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            callback,
            error
        )
    } else {
        // El navegador no admite la geolocalización
        console.error("La geolocalización no está disponible en este navegador.");
    }
}

export const getApiCloud = async (position: Position) => {

    try {
        // Obtener nombre de la ciudad mediante geocodificación inversa (utilizando la API de Google Maps)
        const URL: Url = `${URL_TO_MORROOW_IO}/realtime?location=${String(position.latitude)}, ${String(position.longitude)}&apikey=${API_KEY_TO_MORROOW_IO}`
        const options = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }
        // Request API toMorrow.io
        const request = await fetch(URL, options);
        // On error 
        if (!request.ok) throw new Error(`${request.url} ${request.statusText} ${request.status}`);
        // Request API toMorrow.io
        const obJson = await request.json();
        // console.log(obJson)
        return obJson;
    } catch (error: any) {
        console.error(error.message);
    }
}
export const getCityIp = async () => {
    try {
        const request = await fetch(URL_IPINFO_IO, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
        const response = await request.json();
        const dataIp = {
            city: response.city,
            region: response.region,  
        }
        return dataIp
    } catch (error: any) {
        console.error(error.message);
    }
}