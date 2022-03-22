import axios from "axios";

const Instance = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/weather`,
    headers: {
        "Content-Type": "application/json"
    }
})
export default Instance