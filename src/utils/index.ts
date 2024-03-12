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

export const getDateToISO = () => new Date().toISOString();

export const createReportAcudit = (joke: string, score: Score, date:string ): ReportAcudits => {
    return {
        joke, score, date
    };
}