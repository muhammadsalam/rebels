export const blockVerticalScrollApp = (isBlock: boolean) => {
    const offset = isBlock ? 100 : 0;

    document.body.style.marginTop = `${offset}px`;
    document.body.style.paddingBottom = `${offset}px`;
    document.body.style.height = window.innerHeight + offset + 'px';

    window.scrollTo(0, offset);
};