export type Url = string;

export type Score = 1 | 2 | 3 ;

export type ReportAcudits = {
    joke: string;
    score: Score;
    date: string;
}

export type Acudit = {
    joke: string;
    id: string;
    status: number;
}
