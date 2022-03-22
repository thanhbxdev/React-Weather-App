import Instance from "./instance";
const API_KEY = '81174ed9a8be5ae7248f75fe0306b1af'
const getDataWeather = {
    getData(city,stateCode){
        const url = `?q=${city}&appid=${API_KEY}`
        return Instance.get(url)
    }
}
export default getDataWeather