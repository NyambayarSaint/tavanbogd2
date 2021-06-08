import { returnLanguage } from "./parseCookies"

const FormatDate = (string, dotted) => {
    const lang = returnLanguage()
    if (dotted) {
        let date = new Date(string)
        date = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()
        return date
        return
    }
    if (lang === "mn") {
        let date = new Date(string)
        date = date.getFullYear() + ' оны ' + (date.getMonth() + 1) + ' сарын ' + date.getDate()
        return date
    }
    else {
        let date = new Date(string)
        date = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()
        return date
    }

}

export const FormatDateFull = (string) => {
    let date = new Date(string);
    return date.getFullYear() + ' оны ' + (date.getMonth() + 1) + ' сарын ' + date.getDate() + ' (' + date.getHours() + ':' + date.getMinutes() + ')';

}

export const FormatDateHourMinuteSecond = (string) => {
    const date = new Date(string);
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}

export default FormatDate