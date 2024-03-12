import type { ReportAcudits, Url, Score, Geolocation, Position } from '../types';

const API_KEY_TO_MORROOW_IO = import.meta.env.VITE_API_KEY_TO_MORROOW_IO;
const URL_TO_MORROOW_IO = import.meta.env.VITE_URL_TO_MORROOW_IO;
const URL_IPINFO_IO = import.meta.env.VITE_URL_IPINFO_IO;
export const suma = (a: number, b: number) => {
    return a + b
}

export const getAcudit = async (url: Url) => {
    const request = await fetch(url, { method: "GET", headers: { 'Accept': 'application/json' } });
    const obJson = await request.json();
    return obJson;
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

export const geolocationPosition = (callback: (posi:Geolocation) => void, error: any ) => {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            callback, 
            error
        )      
    }else{
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
        if(!request.ok) throw new Error(`${request.url} ${request.statusText} ${request.status}`);
        // Request API toMorrow.io
        const obJson = await request.json();
        console.log(obJson)
        return obJson;
    } catch (error: any) {
        console.error(error.message);
    }
}
export const getCityIp = async () => {
    const data = await fetch(URL_IPINFO_IO)
    const response = await data.json()
    return response
  }