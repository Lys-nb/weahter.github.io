<template>
  <div id="home">
    <base-map></base-map>
    <nav-bar></nav-bar>
    <city-list></city-list>
  </div>
</template>

<script setup>
import BaseMap from './components/BaseMap.vue';
import NavBar from './components/NavBar.vue';
import CityList from './components/CityList.vue'
import SelfPopup from '@/components/SelfPopup.vue'
</script>

<style  scoped>
#home{
  width: 100vw;
  height: 100vh;
  background-color: #00668a;
}
</style>