<template>
  <div id="city-view">
    <button style="position: absolute; top: 10px; right: 480px" @click="closeComponent">
      关闭
    </button>
    <div class="container">
      <h4>当前城市</h4>
      <button>{{ city }}</button>
      <h2>热门城市</h2>
      <div class="btn">
        <button v-for="item in hotcities" :key="item.index" @click="handleCity(item.name)">
          {{ item.name }}
        </button>
      </div>
      <div class="allcity">
        <div class="main">
          <div
            class="tilte"
            :id="key"
            v-for="(items, key) in allcities"
            :key="key"
            style="color: aqua"
          >
            {{ key }}
            <div
              class="list"
              v-for="item in items"
              :key="item.index"
              @click="handleCity(item.name)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="aside">
          <span :id="key" @click="goletter(key)" v-for="(items, key) in allcities" :key="key">{{
            key
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAllCityInfo } from '@/request/index'
import { ref, onMounted } from 'vue'
import { useCityStore } from '@/stores/counter'
import { useRouter } from 'vue-router'
import { getWeatherByCity,getCityAdcode} from '@/request/index'
const router = useRouter()
const store = useCityStore()
const hotcities = ref([])
const allcities = ref([])
const city = ref('')
const emit = defineEmits(['closeComponent'])
onMounted(async () => {
  let res = await getAllCityInfo()
  hotcities.value = res.data.hotCities
  allcities.value = res.data.cities
  const code = localStorage.getItem('code')
  let cityRes = await getWeatherByCity(code)
  city.value = cityRes.lives[0].city
})
const handleCity = async(city) => {
 let res =await getCityAdcode(city)
  localStorage.setItem('code',res.geocodes[0].adcode)
  window.location.reload()
}
const goletter = (key) => {
  const element = document.getElementById(key)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
const closeComponent = () => {
  emit('closeComponent')
}
</script>

<style lang="scss" scoped>
#city-view {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.container {
  width: 40%;
  margin: 0 auto;
  padding: 0 10px;
  border: 1px solid #002738;
  background-color: #023d53;
}
.allcity {
  position: relative;
  display: flex;
  height: 70vh;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: #004d71d5;
    border-radius: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #42a2c5;
    border-radius: 4px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.543);
  }
}

h2 {
  font-size: 20px;
  color: #33b8e4;
  margin: 15px 0;
}

h4 {
  font-size: 20px;
  color: #33b8e4;
  margin: 15px 0;
}
.main {
  width: 550px;
}
.list {
  padding: 10px 20px;
  font-size: 15px;
  cursor: pointer;
  color: #33b8e4;
}

.list:hover {
  background-color: #02496a;
}

button {
  padding: 0 20px;
  height: 40px;
  border-radius: 5px;
  border: none;
  color: #fff;
  outline: none;
  background-color: #00658ade;
  cursor: pointer;
  font-size: 15px;
}

button:hover {
  background-color: #02516d;
}

.btn {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.aside {
  position: fixed;
  top: 460px;
  right: 490px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  text-align: center;
  transform: translateY(-50%);
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
span {
  border-radius: 50%;
  color: #33b8e4;
}
span:hover {
  background-color: #00668a;
}
</style>
