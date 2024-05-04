import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCityAdcode, getWeatherByCity} from '../request'
const useCityStore = defineStore('counter', () => {
  const inputCity = ref('') //输入的城市值
  const cityAdcode = ref('') //搜索的城市编码
  const cityWeather = ref('') //搜索后的城市天气
  const hascity = ref(true)

  const changeCity = async (city) => { //改变城市
    inputCity.value = city
    let res = await getCityAdcode(inputCity.value)
    if (res.status == 1) {
      if(localStorage.getItem('code')){
        localStorage.removeItem('code')
      }
      cityAdcode.value = ''
      cityAdcode.value = res.geocodes[0].adcode
      localStorage.setItem('code',cityAdcode.value)
      await getWeather()
    }
  }
  const getWeather = async () => { //获取天气
    let res = await getWeatherByCity(cityAdcode.value)
    if (res.status == 1) {
      cityWeather.value = res.lives[0]
    }
  }
  
  return {
    changeCity,
    inputCity,
    cityAdcode,
    cityWeather,
    hascity
  }
})
export { useCityStore }
