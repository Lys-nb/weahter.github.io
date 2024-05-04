import SelfPopup from '@/components/SelfPopup.vue'
import mapboxGl from 'mapbox-gl'
import { render, inject, onMounted, createVNode } from 'vue'
export const useCreatePopup = () => {
  let popup, map
  onMounted(() => {
    map = inject('$map')
  })
  //创建自定义popup
  const createPopup = (res) => {
    if (popup) {
      popup.remove()
    }
    let position = res.features[0].properties.centroid
    const mypopup = document.createElement('div')
    mypopup.id = 'mypopup'
    const comPopup = createVNode(SelfPopup)
    render(comPopup, mypopup)
    popup = new mapboxGl.Popup({
      closeOnClick: false,
      closeButton: false,
      offset: [10, -50]
    }).setDOMContent(mypopup)
    popup.setLngLat(position).addTo(map) // 设置popup在地图上的位置;
  }
  return { createPopup }
}
