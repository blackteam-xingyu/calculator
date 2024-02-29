<template>
  <el-image
    class="photo"
    :src="require('@/assets/img/' + $route.query.name)"
    fit="contain"
  ></el-image>
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
  width: 100%;
  height: calc(100% - 5px);
}
</style>
