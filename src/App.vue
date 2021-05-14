<template>
  <div id="app">
    <router-view :key="new Date().getTime()" v-if="isRouterShow"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterShow: true
    }
  },
  methods: {
    async reload() {
      this.isRouterShow = false
      await this.$nextTick()
      this.isRouterShow = true
    }
  }
}
</script>

<style>
</style>
