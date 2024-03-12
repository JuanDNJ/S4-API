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
export type Geolocation = {
    coords: {
        accuracy: number | null
        altitude: number | null
        altitudeAccuracy: number | null
        latitude: number | null
        heading: number | null
        longitude: number | null
        speed: number | null
    },
    timestamp: number
}