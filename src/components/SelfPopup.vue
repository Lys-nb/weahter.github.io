<template>
  <div class="box">
    <div class="pine"></div>
    <div class="box-wrap">
      <div class="area">
        <div class="area-title fontColor">当前天气</div>
      </div>
      <div class="content textColor">
        <div style="width: 100%; line-height: 25px">
          <div class="data-li">
            <div>城市:</div>
            <div>
              <span>{{ cityWeather.city }}</span>
            </div>
          </div>
          <div class="data-li">
            <div>天气:</div>
            <div>
              <span>{{ cityWeather.weather }}天</span>
            </div>
          </div>
          <div class="data-li">
            <div>温度:</div>
            <div>
              <span>{{ cityWeather.temperature_float }}度</span>
            </div>
          </div>
          <div class="data-li">
            <div>风向:</div>
            <div>
              <span>{{ cityWeather.winddirection }}风</span>
            </div>
          </div>
          <div class="data-li"  style="width: 70%;border-radius:0px;">
            <div>风力:</div>
            <div>
              <span>{{ cityWeather.windpower }}级</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import { useCityStore } from '../stores/counter'
const store = useCityStore()
const { cityWeather } = toRefs(store)

</script>

<style scoped>
.box {
  width: 200px;
  position: relative;
  bottom: 100px;
  left: 120px;
}
.box-wrap {
  position: absolute;
  left: 21%;
  top: 0;
  width: 100%;
  height: 160px;
  border-radius: 50px 0px 50px 0px;
  border: 1px solid #78dbec;
  background-color: #38e1ff4a;
  box-shadow: 0 0 10px 2px #38e1ff;
  animation: slide 2s;
}

.box-wrap .area {
  position: absolute;
  top: 10px;
  right: 0;
  width: 85%;
  height: 20px;
  background-image: linear-gradient(to left, #00658a8f, #1ad6f7be);
  border-radius: 30px 0px 0px 0px;
  animation: area 1s;
}

.box-wrap .area2 {
  top: 163px;
}

.pine {
  position: absolute;
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  line-height: 120px;
  text-indent: 5px;
}

.pine::before {
  content: '';
  position: absolute;
  left: -10px;
  bottom: -33px;
  width: 40%;
  height: 2px;
  box-sizing: border-box;
  border-bottom: 1px solid #38e1ff;
  transform-origin: bottom center;
  transform: rotateZ(135deg) scale(1.5);
  animation: slash 0.5s;
  filter: drop-shadow(1px 0px 2px #00668a);
}

.area .area-title {
  text-align: center;
  line-height: 20px;
}

.textColor {
  font-size: 13px;
  font-weight: 600;
  color:#36ecf9;
  text-shadow: 1px 1px 5px #002520d2;
  animation: fontColor 1s;
}

.fontColor {
  font-size: 14px;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 1px 1px 5px #002520d2;
  animation: fontColor 1s;
}

.content {
  padding: 30px 10px 10px 10px;
  height: 80px;
}

.content .data-li {
  display: flex;
  overflow: hidden;
  padding-left: 20px;
  border-bottom: 1px solid #47eaf5;
  border-radius: 50px 0px 60% 0px;
  gap: 45px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@keyframes fontColor {
  0% {
    color: #ffffff00;
    text-shadow: 1px 1px 5px #00252000;
  }

  40% {
    color: #ffffff00;
    text-shadow: 1px 1px 5px #00252000;
  }

  100% {
    color: #ffffff;
    text-shadow: 1px 1px 5px #002520d2;
  }
}

@keyframes slide {
  0% {
    border: 1px solid #38e1ff00;
    background-color: #38e1ff00;
    box-shadow: 0 0 10px 2px #29baf100;
  }

  100% {
    border: 1px solid #38e1ff;
    background-color: #38e1ff4a;
    box-shadow: 0 0 10px 2px #29baf1;
  }
}

@keyframes area {
  0% {
    width: 0%;
  }

  25% {
    width: 0%;
  }

  100% {
    width: 95%;
  }
}

@keyframes slash {
  0% {
    transform: rotateZ(135deg) scale(0);
  }

  100% {
    transform: rotateZ(135deg) scale(1.5);
  }
}
</style>
