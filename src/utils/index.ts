import type {ReportAcudits, Url, Score} from '../types';

export const suma = (a: number, b: number) => {
    return a + b
}

export const getAcudit = async (url: Url) => {
    const request = await fetch(url, { method: "GET", headers: { 'Accept': 'application/json' } });
    const obJson = await request.json();
    return obJson;
}

export const addReportAcudit = (acudits: ReportAcudits[], acudit:ReportAcudits ): ReportAcudits[]=> {

    const isExistReport = acudits.some(rec => rec.joke === acudit.joke);

    if(isExistReport) {
        acudits.map(rec => {
            if(rec.joke === acudit.joke){
                rec.score = acudit.score
            }
            return rec
        })
    }else{
        acudits = [...acudits, {score: acudit.score,joke: acudit.joke, date: getDateToISO()}]
    }
    return acudits;
}

export const getDateToISO = () => new Date().toString();

export const createReportAcudit = (joke: string, score: Score, date:string ): ReportAcudits => {
    return {
        joke, score, date
    };
}
export const getApiCloud = async () => {
    const request = await fetch("https://api.tomorrow.io/v4/weather/realtime?location=41.402569483918874, 2.1943067686275497&apikey=5VmOowQ9mFGlbNE2tNaz4fN75aTbL4SC", {
        method: "GET",
        headers : {
            "Accept": "application/json"
        }
    })
    const obJson = await request.json();
    return obJson;
}
