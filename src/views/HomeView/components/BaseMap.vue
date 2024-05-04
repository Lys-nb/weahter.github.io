<template>
  <div id="map"></div>
</template>

<script setup>
import mapboxGl from 'mapbox-gl'
import { app } from '@/main'
import { onMounted} from 'vue'
mapboxGl.accessToken = import.meta.env.VITE_TOKEN
let map
onMounted(() => {
  map = new mapboxGl.Map({
    container:'map', // container ID
    style: 'mapbox://styles/mapbox/light-v11', // style URL
    center: [104.3, 31.547],
    zoom: 2,
    projection: 'globe'
  })
  app.provide('$map', map)
  map.on('style.load', () => {
    //城市图层
    map.addSource('city_source', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    })
    map.addLayer({
      id: 'city_layer',
      source: 'city_source',
      type: 'fill',
      paint: {
        'fill-color': '#00668a',
        'fill-opacity': 0.7
      }
    })
    //天气图标数据源
    map.addSource('Icon_source', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    })
   
    //设置大气层
    map.setFog({
      color: '#242B4B',
      'high-color': '#00668a',
      'space-color': '#00668a'
    })
    map.addSource('chinafill_source', {
      type: 'geojson',
      data: 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'
    })
    map.addLayer({
      id: 'chinafill_layer',
      type: 'fill',
      source: 'chinafill_source',
      paint: {
        'fill-color': '#00668a',
        'fill-opacity': 0.1
      }
    })
    map.addSource('chinaline_source', {
      type: 'geojson',
      data: 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'
    })
    map.addLayer({
      id: 'chinaline_layer',
      type: 'line',
      source: 'chinaline_source',
      paint: {
        'line-color': '#00668a',
        'line-width': 1
      }
    })
    //创建全国高亮图层
    let high_data = {
      type: 'FeatureCollection',
      features: []
    }
    map.addSource('high_source', {
      type: 'geojson',
      data: high_data
    })
    map.addLayer({
      id: 'high_layer',
      source: 'high_source',
      type: 'fill',
      paint: {
        'fill-color': '#00668a',
        'fill-opacity': 0.5
      }
    })
    map.on('mousemove', 'chinafill_layer', (evt) => {
      let features = map.queryRenderedFeatures(evt.point, {
        layers: ['chinafill_layer']
      })
      if (features[0]) {
        map.getSource('high_source').setData(features[0])
      }
    })
    map.on('mouseleave', 'chinafill_layer', () => {
      high_data.features = []
      map.getSource('high_source').setData(high_data)
    })
  })
})
</script>

<style scoped>
#map {
  position: absolute;
  left: 22.5vw;
  bottom: 20px;
  width: 55vw;
  height: 57vh;
  border-radius: 20px;
  box-shadow: 0px 18px 20px rgba(36, 36, 36, 0.595);
}
</style>
