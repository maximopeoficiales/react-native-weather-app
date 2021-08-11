
export const getWeatherByCityCountry = async (city: string, country: string) => {
    const api = "b7f1b9ab4273b3e46198b78fc13bfc91"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api}`
    try {
        let data = await (await fetch(url)).json()
        if (data.cod == 404) {
            return null;
        }
        return data;
    } catch (error) {
        return null;
        console.log(error);
    }
}