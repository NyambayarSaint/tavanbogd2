import parseCookies from '@/miscs/parseCookies';
import Axios from "axios";


const checkLanguage = async (queryString, server) => {
    const cookies = parseCookies(server);

    // const httpObject = { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: `query ${queryString}` }) }
    return new Promise(async (resolve, reject) => {
        if (cookies['tblang'] === "en") {
            const res = await fetch(process.env.serverUrlEnglish + queryString);
            const pageData = await res.json();
            return resolve({ data: pageData });
        }
        else {
            const res = await fetch(process.env.serverUrl + queryString);
            const pageData = await res.json();
            return resolve({ data: pageData });
        }
    });


    // return new Promise(async(resolve, reject)=>{
    //   if(cookies['tblang'] === "en"){
    //       const res = await fetch(process.env.serverUrl+'/graphql', httpObject)
    //       const pageData = await res.json()
    //       return resolve({data: pageData.data});
    //   }
    //   else{
    //       const res = await fetch(process.env.serverUrl+'/graphql', httpObject)
    //       const pageData = await res.json()
    //       return resolve({data: pageData.data});
    //   }
    // })

}

export default checkLanguage