import { Acudit } from "../types";

export const AcuditComponent = (acudit: Acudit) =>  /*html*/(`
    <p class="content-text flex-1 flex items-center text-xl text-center p-4 ">${acudit.joke}</p>
    <div class="scores flex justify-center gap-4 p-4 row-span-1">
        <button type="button" class="score py-2 px-4 text-4xl" data-score="1">☹️</button>
        <button type="button" class="score py-2 px-4 text-4xl" data-score="2">🙂</button>
        <button type="button" class="score py-2 px-4 text-4xl" data-score="3">🤣</button>
    </div>
`);
export const createImage = (code: string, width: string, height: string) => {
    if(typeof code !== "string") return '';
    if(!code) return '';
    return `<img src="./cloud/${code}.svg" width="${width}" height="${height}"  alt="Image Clud" />`;
};