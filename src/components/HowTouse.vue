<template>
  <div class="use">
    <div class="container">
      <h3>关于:</h3>
      <p>这个应用可以用来追踪你选择城市的当前天气</p>
      <h3>如何使用:</h3>
      <p>
        1.点击搜索框输入你希望追踪的城市<br />
        2.在搜索结果中选中一个城市，你将获取当地最新的天气<br />
        3.点击右侧的＋号可以将追踪城市的天气情况保存在首页<br />
        4.点击热门城市，可以查看全国所有城市<br />
      </p>
      <h3>移除城市:</h3>
      <p>如果你不想在首页关注某个城市,可以通过底部的按钮删除它</p>
      <button @click="closeInfo()">我知道了</button>
    </div>
    
  </div>
</template>

<script setup>
const emit = defineEmits(['closeComponent'])
const closeInfo = () => {
  emit('closeComponent')
}
</script>

<style lang="scss" scoped>
.use {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.container {
  width: 450px;
  height: 330px;
  padding:20px 10px;
  background-color: #ffffffe4;
  border-radius: 10px;
}
p{
  margin-bottom: 20px;
}
button{
  padding: 0 10px;
  height: 30px;
  border-radius: 5px;
  border: none;
  color: #fff;
  outline: none;
  background-color: #00658ade;
  cursor: pointer;
  font-size: 15px;
}
</style>
