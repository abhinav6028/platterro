"use server"


export default async function getData(url: any) {

    const A = "https://pappad.intertoons.com/api/03879045/"

    const headers = {
        'Authorization': 'Bearer akhil@intertoons.com',
        'Content-Type': 'application/json'

    };

    const res = await fetch(`${A + url}`, { headers: headers })

    return res.json()
}
