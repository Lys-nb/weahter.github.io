import { useCityStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'
import { inject, onMounted } from 'vue'
//创建天气图标
export const useCreatIcon = () => {
  const stores = useCityStore()
  const { cityWeather } = storeToRefs(stores)
  let lastIcon, map
  const weather_icons = [
    {
      name: '晴',
      url: '/src/assets/weatherIcon/晴天.png'
    },
    {
      name: '多云',
      url: '/src/assets/weatherIcon/多云.png'
    },
    {
      name: '阴',
      url: '/src/assets/weatherIcon/阴天.png'
    },
    {
      name: '中雨',
      url: '/src/assets/weatherIcon/中雨.png'
    },
    {
      name: '小雨',
      url: '/src/assets/weatherIcon/阵雨.png'
    },
    {
      name: '雪',
      url: '/src/assets/weatherIcon/下雪.png'
    },
    {
      name: '雷',
      url: '/src/assets/weatherIcon/雷雨.png'
    },
    {
      name: '大雨',
      url: '/src/assets/weatherIcon/大雨.png'
    }
  ]
  onMounted(() => {
    map = inject('$map')
  })
  const createIcon = (res) => {
    let position = res.features[0].properties.centroid
    let source = map.getSource('Icon_source')
    const point = {
      type: 'Feature',
      properties: {
        height: 40,
        name: cityWeather.value.city,
        w: cityWeather.value.weather
      },
      geometry: {
        type: 'Point',
        coordinates: position
      }
    }
    source.setData(point)
    if (cityWeather.value.weather) {
      const haslayer = map.getLayer('Icon_layer')
      if (haslayer) map.removeLayer('Icon_layer')
      if (lastIcon) {
        map.removeImage(lastIcon)
      }
      weather_icons.forEach((icon) => {
        if (cityWeather.value.weather.includes(icon.name)) {
          map.loadImage(icon.url, function (error, image) {
            if (error) throw error
            map.addImage(icon.name, image)
          })
          lastIcon = icon.name
        }
      })
      map.addLayer({
        id: 'Icon_layer',
        source: 'Icon_source',
        type: 'symbol',
        layout: {
          'icon-image': ['get', 'w'],
          'icon-size': 1.0,
          'text-field': ['get', 'name'],
          'text-font': ['Open Sans Regular'],
          'text-offset': [0, 2.5] //[左偏移量，上偏移量]
        }
      })
    }
  }
  return { createIcon }
}
