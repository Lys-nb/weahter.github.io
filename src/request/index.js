import axios from 'axios'
/* 响应拦截 */
axios.interceptors.response.use(res => {
    return res.data;
})
const MapUrl = 'https://restapi.amap.com/v3'
const key = import.meta.env.VITE_KEY;
const getCityByIp = () => { //获取当前ip下的城市信息
    return axios({
        method: "get",
        baseURL: MapUrl,
        url: `/ip?key=${key}`
    })
}
const getWeatherByCity = (adcode)=>{ //根据城市adcode获取天气
    return axios({
        method: "get",
        baseURL: MapUrl,
        url: `/weather/weatherInfo?city=${adcode}&key=${key}`
    })
}
const getAllCityInfo = ()=>{ //获取热门城市和所有城市的信息
    return axios({
        method: "get",
        url: 'http://39.103.151.139:8000/city'
    })
}

const getCityAdcode = (inputvalue) =>{ //获取城市地理编码
    return axios({
        method: "get",
        baseURL: MapUrl,
        url: `/geocode/geo?address=${inputvalue}&key=${key}`
    })
}
const getLnglat = (adcode) => { //获取城市位置
    return axios({
        method: "get",
        url: `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}.json`
    })
}
const getWeatherAll = (adcode) => { //获取天气预报
    return axios({
        method: "get",
        baseURL: MapUrl,
        url: `/weather/weatherInfo?city=${adcode}&key=${key}&extensions=all`
    })
}


export{getCityByIp ,getWeatherByCity,getAllCityInfo,getCityAdcode,getLnglat,getWeatherAll}