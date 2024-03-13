import { Acudit } from "../types";

export const AcuditComponent = (acudit: Acudit) =>  /*html*/(`
    <p class="content-text flex-1 flex items-center text-xl text-center p-4 ">${acudit.joke}</p>
    <div class="scores flex justify-center gap-4 p-4 row-span-1">
        <button type="button" class="score py-2 px-4 text-4xl" data-score="1">☹️</button>
        <button type="button" class="score py-2 px-4 text-4xl" data-score="2">🙂</button>
        <button type="button" class="score py-2 px-4 text-4xl" data-score="3">🤣</button>
    </div>
`);

export const CloudComponent = (dataCloud: any) => {
    console.log(dataCloud)
    if(dataCloud) {
        return (`
       
            <div class="cloud-image flex items-center justify-between gap-2 text-sm font-bold">
                <img src="./cloud/${dataCloud.img}.svg" width="32" height="32" alt="Image Cloud" />
                <strong>${dataCloud.temperature}</strong>
            </div>
            <div class="flex items-center">
                <strong class="city text-sm"><span class="text-sm">en</span> ${dataCloud.city}, ${dataCloud.region === "Catalonia" && "Catalunya"}</strong>
            </div>
        
    `);
    }else{
        return (`
            <div class="cloud-image flex items-center justify-between gap-2 text-sm font-bold">
                <img src="./cloud/1000.svg" width="32" height="32" alt="Image Cloud" />
                <strong>15º</strong>
            </div>
            <div class="flex items-center">
                <strong class="city text-sm"><span class="text-sm">en</span> Badalona Catalonia</strong>
            </div>
        `);
    }
    
};