

export const suma = (a: number, b: number) => {
    return a + b
}

export const getAcudit = async (url: string) => {
    const request = await fetch(url, { method: "GET", headers: { 'Accept': 'application/json' } });
    const obJson = await request.json();
    return obJson;
}

export const domElement = (name: string) => {
    return document.querySelector<HTMLElement>(name)
}
export const domElements = (name: string) => {
    return [...document.querySelectorAll<HTMLElement>(name)]
}

