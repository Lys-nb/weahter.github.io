<template>
  <div class="editon">
    <main class="container">
      <div class="inpt" v-if="inputCity">
        <ul @click="handleTosearch">
          <li v-if="cityAdcode" @click="ToWeather">{{ cityWeather.city }}</li>
          <p v-else>似乎没有查找到你查找的城市</p>
        </ul>
      </div>
      <div class="weather-main" v-else>
        <div class="citylist" v-for="(item, index) in LocalArray" :key="index">
          <div class="cityitem">
            <p>{{ item.city }}</p>
            <span>{{ item.temperature }}度</span>
          </div>
          <div class="btn">
            <button class="look" @click="handleLook(index)">查看</button>
            <button class="edit" @click="handlEedit(index)">删除</button>
          </div>
        </div>
      </div>
      <h2 v-if="hascity">暂时没有保存过城市天气信息，请查询后点击右上角"+"号保存。</h2>
    </main>
  </div>
</template>

<script setup>
import { toRefs, ref, onMounted } from 'vue'
import { useCityStore } from '../../../stores/counter'
import { useRouter } from 'vue-router'
import { getWeatherByCity } from '@/request/index'
const { inputCity, cityAdcode, cityWeather,hascity } = toRefs(useCityStore())
const route = useRouter()
const LocalArray = ref([])
onMounted(() => {
  const codeArr = JSON.parse(localStorage.getItem('codeArr'))
  if (codeArr.length > 0) {
    codeArr.forEach((item) => {
      getWeatherByCity(item).then((res) => {
        LocalArray.value.push(res.lives[0])
      })
    })
    hascity.value = false
  }
})
const ToWeather = () => {
  cityAdcode.value = ''
  cityWeather.value = ''
  route.push({
    path: '/about',
    query: { isshow: false, isadd: true }
  })
}
const handleLook = (index)=>{
  const codeArr = JSON.parse(localStorage.getItem('codeArr'))
  const currcode = codeArr[index]
  localStorage.setItem('code', currcode)
  route.push({
    path: '/about',
    query: { isshow: false ,isadd: true }
  })
}
const handlEedit = (index)=>{
  let codeArr = JSON.parse(localStorage.getItem('codeArr'))
  codeArr.splice(index, 1)
  localStorage.setItem('codeArr', JSON.stringify(codeArr))
  LocalArray.value.splice(index, 1)
  if(codeArr.length === 0){
    hascity.value = true
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 80px;
  padding: 0 160px;
  color: #fff;
  max-width: 1536px;
  margin: 0 auto;
  .inpt {
    padding-top: 16px;
    margin-bottom: 32px;

    input {
      border: none;
      outline: none;
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #fff;
      font-size: 1rem;
      padding-left: 0.25rem;
      padding-right: 0.25rem;
      color: #fff;
      background-color: inherit;
    }

    input::placeholder {
      color: rgb(156, 163, 175);
      font-size: 1rem;
    }

    .focused {
      border-bottom: none;
      box-shadow: 0 10px 10px -15px black;
    }
  }

  .citylist {
    display: flex;
    align-items: center;
    gap: 10%;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 16px;
    &:hover {
      .cityitem {
        width: 80%;
      }
      .btn {
        display: flex;
        justify-content: right;
        align-items: center;
        gap: 5px;
      }
    }
    .cityitem {
      width: 100%;
      background-color: inherit;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      padding: 8px 16px;
      font-size: 0.875rem;
      background-color: rgb(0, 78, 113);
      transition-duration: 0.5s;
      p {
        background-color: inherit;
      }
      span {
        background-color: inherit;
      }
    }
    .btn {
      display: none;
      button {
        width: 80px;
        height: 40px;
        background-color: #eab308;
        color: #fff;
        border: none;
        cursor: pointer;
      }
    }
  }

  .searchmain {
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    .alert-user {
      width: 100%;
      height: 40px;
      padding: 8px;
      background-color: rgb(0, 78, 113);
    }

    .addalert {
      background-color: rgb(0, 78, 113);
    }

    .todayweather {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 24px;
      height: 144px;
    }
  }

  ul {
    width: 100%;
    height: 40px;
    padding: 8px 4px;
    background-color: rgb(0, 78, 113);
    margin-top: 5px;

    p {
      background-color: inherit;
    }

    li {
      background-color: inherit;
      list-style: none;
      cursor: pointer;
    }
  }

  h2 {
    position: relative;
    top: -150px;
    font-weight: 500;
    font-size: 1.2rem;
    text-align: center;
  }

  .weather-main {
    margin-top: 8px;
    border-radius: 0.5rem;
    padding: 20px 48px 0 48px;
    height: 180px;
    overflow-y: auto;
    text-align: center;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      width: 8px;
      
    }
    &::-webkit-scrollbar-track {
      background-color: #004d71d5;
      border-radius:12px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #42a2c5;
      border-radius: 4px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.543);
    }
    .weather-list {
      display: flex;
      justify-content: center;
      gap: 20px;
      background-color: inherit;
      margin-bottom: 10px;
      .weather-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1 1 0%;
        height: 144px;
        background-color: inherit;

        p {
          height: 24px;
          background-color: inherit;
        }
      }
    }
  }
}

</style>
