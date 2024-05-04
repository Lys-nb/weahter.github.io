<template>
  <div class="nav-bar">
    <div class="back-home" @click="backtoCity">
      <i class="fa-solid fa-sun"></i>
      <p>磨叽天气网</p>
    </div>
    <div class="current-w">
      <p>{{ currentCity.city }}</p>
      <span>实时天气：{{ ipcityWeather.weather }}</span>
      <span>温度：{{ ipcityWeather.temperature_float }}°C</span>
      <span
        >风向：{{ ipcityWeather.winddirection }}风 <span>{{ ipcityWeather.windpower }}</span
        >级</span
      >
    </div>
    <input
      type="text"
      placeholder="请输入城市名称"
      v-model="inputValue"
      :class="{ focused: isfocused }"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.enter="searchCity()"
      v-if="!isshow"
    />
    <div class="hot" v-else>
      <button @click="findHotCity">热门城市</button>
    </div>
    <div class="detail">
      <i class="fa-solid fa-circle-info" @click="howUse"></i>
      <i class="fa-solid fa-plus" @click="addCity" v-if="isadd"></i>
    </div>
    <div class="citycom" v-show="mycomponent">
      <component :is="mycomponent" @closeComponent="closeComponent"></component>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, toRefs, onMounted, inject, shallowRef } from 'vue'
import { useCityStore } from '../../../stores/counter'
import { getLnglat, getCityByIp, getWeatherByCity } from '@/request/index'
import { useCreatIcon } from '@/hooks/useCreateIcon.js'
import { useCreatePopup } from '../../../hooks/useCreatePoup'
import CityBar from '@/components/CityBar.vue'
import HowTouse from '@/components/HowTouse.vue'
const { createIcon } = useCreatIcon()
const { createPopup } = useCreatePopup()
const store = useCityStore()
const $router = useRouter()
const isshow = useRoute().query.isshow
let isadd = ref(useRoute().query.isadd)
const { cityAdcode, cityWeather, inputCity, hascity} = toRefs(store)
const isfocused = ref(false)
const inputValue = ref('')
const currentCity = ref({}) //当前ip下的城市信息
const ipcityWeather = ref({}) //当前ip下的城市天气信息
const mycomponent = shallowRef(null)

let map
onMounted(async () => {
  map = inject('$map')
  //1.当获取本地ip的时候对地图进行操作
  let res = await getCityByIp()
  currentCity.value = res
  let _res = await getWeatherByCity(currentCity.value.adcode)
  ipcityWeather.value = _res.lives[0]
  //飞行和要素加载
  let res2 = await getLnglat(currentCity.value.adcode)
  if (map) {
    flyToCity(res2)
  }
  let codeArr = JSON.parse(localStorage.getItem('codeArr')) || []
  const code = localStorage.getItem('code')
  if (codeArr.includes(code)) {
    isadd.value = false
  }
})
const searchCity = async () => {
  hascity.value = false
  //1.搜索
  await store.changeCity(inputValue.value)
  //2.搜索有结果，就把adcode拿来发请求获得经纬度
  let res = await getLnglat(cityAdcode.value)
  if (cityAdcode.value.slice(-4) === '0000') {
    flyToCity(res, 4)
  } else if (cityAdcode.value.slice(-2) === '00') {
    flyToCity(res, 7)
  } else {
    flyToCity(res)
  }
  createPopup(res)
  createIcon(res)
}
//飞行到目标城市
const flyToCity = (res, zom = 8) => {
  let source = map.getSource('city_source')
  source.setData(res)
  let position = res.features[0].properties.centroid
  map.flyTo({
    // 飞行的中心点
    center: position,
    // 飞行之后地图的放大级别
    zoom: zom,
    // 控制飞行的速度 0~1 值越小,速度越慢
    speed: 0.6,
    // 俯仰角0-90
    pitch: 10
    // curve: 0.00001,
  })
}
const backtoCity = () => {
  cityWeather.value = ''
  inputCity.value = ''
  cityAdcode.value = ''
  $router.back()
}
const handleFocus = () => {
  isfocused.value = true
}
const handleBlur = () => {
  isfocused.value = false
}
const addCity = () => {
  const code = localStorage.getItem('code')
  let codeArr = JSON.parse(localStorage.getItem('codeArr')) || []
  codeArr.push(code)
  localStorage.setItem('codeArr', JSON.stringify(codeArr))
  isadd.value = false
}
const findHotCity = () => {
  mycomponent.value = CityBar
}
const closeComponent = () => {
  mycomponent.value = null
}
const howUse = () => {
  mycomponent.value = HowTouse
}
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 10;
  top: 0;
  background-color: rgb(0, 102, 138);
  box-shadow: 0 0px 30px -15px;
  max-width: 1536px;
  margin: 0 auto;
  gap: 15px;
  padding: 20px 60px;

  .back-home {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    margin: 0;
    color: #fff;
    font-size: 2rem;
    line-height: 2rem;
    cursor: pointer;

    p {
      margin: 0;
    }
  }

  .current-w {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
    color: #fff;

    p {
      margin: 0;
      font-size: 1.125rem;
      line-height: 1.75rem;
    }

    span {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  }

  .detail {
    display: flex;
    justify-content: right;
    font-size: 1.125rem;
    line-height: 1.75rem;
    gap: 10px;
    color: #fff;

    i:hover {
      color: rgb(0, 78, 113);
    }
  }

  input {
    border: none;
    outline: none;
    width: 30%;
    height: 2rem;
    font-size: 1rem;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    color: #fff;
    background-color: #00668a;
    border-bottom: 1px solid #fff;
  }

  input::placeholder {
    color: rgb(220, 221, 223);
    font-size: 1rem;
  }

  .focused {
    border: none;
    box-shadow: 0 10px 10px -15px black;
  }

  .hot {
    width: 30%;
    height: 2rem;
    font-size: 1rem;
    text-align: center;
    line-height: 2rem;
    background-color: #00668a;

    button {
      border: none;
      width: 30%;
      height: 2rem;
      border-radius: 8px;
      background-color: #078dbeaf;
      color: #fff;
      box-shadow: 0 10px 10px -15px black;
    }
  }

  .citycom {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
}
</style>
