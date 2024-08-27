import { tgApp } from "./telegram-app";

export const showAlert = (text: string) => {
    const show = parseFloat(tgApp.version) > 6.2
        ? tgApp.showAlert
        : alert;

    show(text)
}