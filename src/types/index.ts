export type Url = string;

export type Score = 1 | 2 | 3 ;

export type ReportAcudits = {
    joke: string;
    score: Score;
    date: string;
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
export type Position = {latitude: number | null , longitude: number | null}

export type CallBack = (data: any) => void

export type DatIp = {
    city: string ;
    region: string ;
}