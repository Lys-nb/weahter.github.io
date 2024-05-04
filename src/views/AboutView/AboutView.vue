<template>
  <div id="about">
    <nav-bar></nav-bar>
    <main class="container">
      <div class="searchmain">
        <div class="alert-user">
          你正在预览{{ city }}的天气信息
          <span class="addalert" v-if="isadd">，可以通过右上角的"+"号按钮保存起来</span>
        </div>
        <div class="todayweather">
          <h2>当日气温是：{{ weatherfuture[0].daytemp }}摄氏度</h2>
          <h2>当日天气是：{{ weatherfuture[0].dayweather }}</h2>
          <h2>当日风向是：{{ weatherfuture[0].daywind }}</h2>
          <h2>当日风力是：{{ weatherfuture[0].daypower }}</h2>
        </div>
      </div>
      <div class="weather-main">
        <div class="weather-list">
          <div class="weather-item" v-for="item in weatherfuture" :key="item.index">
            <p>{{ item.week }}</p>
            <p>{{ item.date }}</p>
            <p>{{ item.dayweather }}</p>
            <p>{{ item.daypower }}</p>
          </div>
        </div>
        <v-chart :option="option" class="weather-chart"></v-chart>
      </div>
    </main>
  </div>
</template>

<script setup>
import NavBar from '../HomeView/components/NavBar.vue'
import { ref, onMounted,reactive } from 'vue'
import { getWeatherAll } from '@/request/index'
const option = ref()
const city = ref('') //搜索返回的城市名称
let weatherfuture = reactive([{}])
let daytemp = ref([])
let nightemp = ref([])
let isadd =ref(true) 
onMounted(async () => {
  const codeArr = JSON.parse(localStorage.getItem('codeArr'))
  if (codeArr.includes(localStorage.getItem('code'))) {
    isadd.value = false
  }
  let res = await getWeatherAll(localStorage.getItem('code'))
  if (res.status == 1) {
    let arr = res.forecasts[0].casts
    let strArr = ['今天', '明天', Changeweek(arr[2].week), Changeweek(arr[3].week)]
    weatherfuture.pop()
    for (let i = 0; i < arr.length; i++) {
      let _item = {}
      _item.date = arr[i].date.split('-')[1] + '-' + arr[i].date.split('-')[2]
      _item.dayweather = arr[i].dayweather
      _item.daypower = '风力' + arr[i].daypower + '级'
      _item.week = strArr[i]
      _item.daytemp = arr[i].daytemp
      _item.daywind = arr[i].daywind
      weatherfuture.push(_item)
      daytemp.value.push(arr[i].daytemp)
      nightemp.value.push(arr[i].nighttemp)
    }
    city.value = res.forecasts[0].city
  }
  renderchart()
})

function Changeweek(week) {
  if (week == 1) {
    week = '星期一'
  } else if (week == 2) {
    week = '星期二'
  } else if (week == 3) {
    week = '星期三'
  } else if (week == 4) {
    week = '星期四'
  } else if (week == 5) {
    week = '星期五'
  } else if (week == 6) {
    week = '星期六'
  } else if (week == 7) {
    week = '星期日'
  }
  return week
}
function renderchart() {
  option.value = {
    xAxis: {
      show: false,
      type: 'category',
      boundaryGap: false
    },
    yAxis: {
      show: false,
      type: 'value',
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '10%',
      top: '20%'
    },
    series: [
      {
        smooth: true,
        name: 'Highest',
        type: 'line',
        data: daytemp,
        label: {
          show: true,
          formatter: '白{c}°C',
          position: 'top',
          color: '#fff'
        }
      },
      {
        smooth: true,
        name: 'Lowest',
        type: 'line',
        data: nightemp,
        label: {
          show: true,
          formatter: '晚{c}°C',
          position: 'bottom',
          color: '#fff'
        }
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
#about {
  width: 100vw;
  height: 100vh;
  background-color: #00668a;
  .container {
    color: #fff;
    max-width: 1536px;
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

    .searchmain {
      text-align: center;
      width: 100%;
      margin-bottom: 30px;
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
        padding-top: 24px;
        height: 23vh;
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
      font-weight: 500;
      font-size: 1rem;
      text-align: center;
    }

    .h2h {
      margin-top: 1.5rem;
      text-align: left;
    }

    .weather-main {
      align-self: center;
      width: 60vw;
      padding-top: 30px;
      margin: 0 auto;
      border-radius: 0.5rem;
      background-color: rgb(0, 78, 113);
      text-align: center;

      .weather-list {
        display: flex;
        justify-content: center;
        gap: 20px;
        background-color: inherit;

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
      .weather-chart {
        height: 30vh;
        width: 100%;
        
        background: rgb(0, 78, 113);
      }
    }
  }
}
</style>
