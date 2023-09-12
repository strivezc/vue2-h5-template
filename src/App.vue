<template>
  <div id="app">
    <div class="router">
      <keep-alive :include="$store.getters.cachedRouteNames">
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang='less'>
  @import "./common/css/reset.css";
  @import "./common/css/public.less";
  @import "./common/css/vant-ui.css";

  #app {
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: "PingFang SC", Helvetica, Tahoma, Arial, "Hiragino Sans GB",
    "Hiragino Sans GB W3", STXihei, STHeiti, SimHei, Heiti, SimSun, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;

    .router {
      flex: 1 0 auto;
    }

  }

  .safe-area-bottom {
    padding-bottom: env(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
  }
</style>
