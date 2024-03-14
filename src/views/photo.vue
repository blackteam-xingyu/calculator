<template>
  <div class="photo">
    <el-image
      class="photo-img"
      :src="require(`@/assets/img/${$route.query.name}.jpg`)"
      fit="contain"
    ></el-image>
    <div class="photo-line" />
    <el-image
      class="photo-img"
      :src="require(`@/assets/img/${$route.query.name}-equation.jpg`)"
      fit="contain"
    ></el-image>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "photo",
  data() {
    return {};
  },
  props: [],
  methods: {},
  mounted() {
    console.log(this.$route.query.name);
  },
};
</script>
<style lang="scss" scoped>
.photo {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  align-items: flex-start;
  justify-content: space-between;
  display: flex;
  overflow: hidden;

  &-img {
    width: calc(50% - 5px);
  }

  &-line {
    width: 10px;
    height: 100vh;
    background-color: #eee;
  }
}
</style>
