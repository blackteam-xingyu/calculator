<template>
  <div id="app">
    <tools></tools>
  </div>
</template>

<script>
import Tools from './views/tools.vue'
export default {
  name: 'app',
  components: { Tools }
}
</script>
<style>
#app {
  width: 100%;
  height: 100%;
  background-color: #f0f0fc;
  color: #333;
}
</style>
