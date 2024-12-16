export async function load({ fetch, parent, url, data }) {
    const search = url.search;
    const fetchGames = async () => {
        const response = await fetch(`/api/games${search}`);
        const data = await response.json();
        return data;
    };
    return {
        genres: data,
        games: await fetchGames()
    };
}
