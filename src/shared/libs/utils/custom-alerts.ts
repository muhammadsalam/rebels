import { tgApp } from "./telegram-app";

export const showAlert = (text: string) => {
    const show = parseFloat(tgApp.version) > 6.2
        ? tgApp.showAlert
        : alert;

    show(text)
}

export const showConfirm = (text: string, callback: (answer: any) => void) => {
    if (parseFloat(tgApp.version) > 6.2) {
        return tgApp.showConfirm(text, callback);
    }

    const confirm = (text: string) => {
        const answer = confirm(text);
        callback(answer);
    }
}