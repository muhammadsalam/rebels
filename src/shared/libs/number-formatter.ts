const formatter = (locale: string = 'ru-Ru') => new Intl.NumberFormat(locale, {
    style: 'decimal',
    useGrouping: true
});

export const formatNumber = (t: number, l: string | undefined = 'ru-Ru') => formatter(l).format(t);