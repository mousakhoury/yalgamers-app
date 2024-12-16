import { json } from '@sveltejs/kit'
import { env } from '$env/dynamic/public'

export async function GET(event) {
    const response = await fetch(`${env.PUBLIC_BASE_URL}/api/collections/news/records/${event.params.newsid}`, {
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    // console.log(data)
    return json(data)
}