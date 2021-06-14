import Axios from "axios";

export default async (req, res) => {

    const { url } = req.body

    if (req.method === "POST") {
        let responseFromStrapi = await Axios(url);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ data: responseFromStrapi.data }));

    }
}