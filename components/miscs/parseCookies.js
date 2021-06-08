import cookie from 'cookie'
import Cookie from "js-cookie"

export const returnLanguage = (req) => {
    if (req) {
        const { tblang } = cookie.parse(req.headers.cookie);
        if (tblang === "en") return "en";
        else return "mn";
    }
    else {
        const { tblang } = cookie.parse(document.cookie);
        if (tblang === "en") return "en";
        else return "mn";
    }
}

export const changeLang = () => {
    let variableName = "tblang";
    if (Cookie.get(variableName) === "en") {
        Cookie.set(variableName, "mn");
        return location.reload();
    }
    else {
        Cookie.set(variableName, "en");
        return location.reload();
    }
};

export default function parseCookies(req) {
    if (req) return cookie.parse(req.headers.cookie);
    else return cookie.parse(document.cookie);
}

