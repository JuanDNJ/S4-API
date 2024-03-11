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

export const render = (elemntId: string, html: string) => {
    const element = domElement(elemntId)
    element!.innerHTML = /*html*/ html;
}

export const initRender: string = /*html*/ `
    <header>
        <h2>Avui: Parcialment ennuvolat</h2>
    </header>
    <section class="body"></section>
  
`;

export const onClickButton = (name: string, detail: string) => {
    const button = domElement(name)
    const newEvent = new CustomEvent("onClickButton", {
        composed: true,
        bubbles: true,
        detail: detail
    })
    button?.addEventListener("click", () => {
        globalThis.dispatchEvent(newEvent)
    })
}