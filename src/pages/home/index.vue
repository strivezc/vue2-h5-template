<template>
  <div class="index">
    <img class="logo" src="../../assets/logo.png" alt="">
  </div>
</template>

<script setup>
  import {getToken, getUserType} from '@/utils/auth'
  import {computed} from 'vue'
  import {useStore, useRouter} from "@/utils/vueApi.js";

  const router = useRouter();
  const store = useStore();

  const token = getToken();
  const userType = getUserType();
  const phone = computed(() => {
    return store.getters.phone
  });
  const name = computed(() => {
    return store.getters.name
  });
  const userId = computed(() => {
    return store.getters.userId
  });

  const login = () => {
    router.push('/login');
  }

  const register = () => {

  }

  const download = () => {
    window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.chindle.talk915&fromcase=40003'
  }
</script>

<style scoped lang="less">
  .logo{
    width: 750px;
    height: 750px;
  }
</style>
