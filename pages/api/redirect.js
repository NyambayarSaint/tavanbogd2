import Axios from "axios";

export default async (req, res) => {

    const { url } = req.body

    if (req.method === "POST") {
        console.log('Came!');
        let responseFromStrapi = await Axios(url);
        console.log(responseFromStrapi.data,'dataaaaa');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ data: responseFromStrapi.data }));

    }
}