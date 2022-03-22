import '../src/asset/style.sass'
import getDataWeather from "./services/api/weatherAPI";
import {useEffect, useState} from "react";

function App() {
    const [resWeather, setResWeather] = useState()
    const [loading, setLoading] = useState(false)
    const [q, setQ] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getDataWeather.getData("ha noi")
                console.log(data.data)
                if (data.data.cod === 200) {
                    setResWeather(data.data)
                } else {
                    setResWeather('')
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    const search = async (e) => {
        if (e.key === "Enter") {
            const {data: res} = await getDataWeather.getData(q, '')
            setResWeather(res)
        }
    }
    const getDateNow = new Date()
    const getDate = (date) => {
        const day = date.getDay()
        const month = date.getMonth()
        const y = date.getFullYear()
        const h = date.getHours()
        const mini = date.getMinutes()
        const s = date.getSeconds()
        return {
            d: day,
            m: month,
            y: y,
            h: h,
            mini: mini,
            s: s
        }
    }
    const date = getDate((getDateNow))
    return (
        <div className="container">
            {loading ? (
                <div>
                    Loading
                </div>
            ) : (
                <>
                    {resWeather ? (
                        <>
                            <div className="title">
                                Weather App
                            </div>
                            <div className="form">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    onChange={e => setQ(e.target.value)}
                                    value={q}
                                    onKeyPress={search}
                                />
                            </div>
                            <div className="show">
                                <div className="time">
                                    {date.h}:{date.mini}:{date.s}
                                </div>
                                <div className="date">
                                    {date.d}/{date.m}/{date.y}
                                </div>
                                <div className="city">
                                    {resWeather.name},{resWeather.sys.country}
                                </div>
                                <div className="main">
                                    <div className="temp">
                                        Nhiệt độ : {resWeather.main.temp}
                                    </div>
                                </div>
                                <div className="coord">
                                    <div className="lon">
                                        Kinh độ : {resWeather.coord.lon}
                                    </div>
                                    <div className="lat">
                                        Vĩ độ : {resWeather.coord.lat}
                                    </div>
                                </div>
                                <div className="visibility">
                                    Tầm nhìn {resWeather.visibility / 1000} km
                                </div>
                                <div className="wind">
                                    <div className="deg">
                                        Hướng gió : {resWeather.wind.deg}
                                    </div>
                                    <div className="speed">
                                        Tốc độ gió: {resWeather.wind.speed} m/s
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            No Data
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
