import type { NewError } from "../types";

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
export const render = (elemntId: string, html: string) => {
    const element  = domElement(elemntId)
    element!.innerHTML = /*html*/ html;
}

export const initRender: string = /*html*/ `
    <header class="flex items-center px-4 row-auto">
        <h2 class="text-xl font-bold">Avui: Parcialment ennuvolat</h2>
    </header>
    <section class="body px-4 row-span-12 flex flex-col items-center justify-center md:justify-start md:mt-40"></section>
  
`;

export const onClickButton = (name: string, type?: String) => {
    if(type === "all") {
        const  buttons = domElements(name);
        buttons.forEach(btn => {
            btn?.addEventListener("click", (eve) => {
                globalThis.dispatchEvent(newEvent("onClickButton", eve.target))
            }) 
        })
    }else{
        const button = domElement(name)
        button?.addEventListener("click", (eve) => {
            globalThis.dispatchEvent(newEvent("onClickButton", eve.target ))
        })
    }
    
}

const newEvent = (nameEvent: string, data: any) =>  new CustomEvent(nameEvent, {
    composed: true,
    bubbles: true,
    detail: data
})

export const myError = (message:string): NewError => new Error(`${message}`);