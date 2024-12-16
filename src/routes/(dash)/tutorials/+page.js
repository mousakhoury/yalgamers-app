// @ts-nocheck
export async function load({ fetch }) {
    const fetchCourse = async () => {
        const response = await fetch(`/api/courses`)
        const data = await response.json()
        return data
    }
    return ({
        courses: fetchCourse()
    })
}