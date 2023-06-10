<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header-main">
      <marquee direction="right" class="header-marquee">
        <span class="header-text">Курсовая работа. Торговля на бирже. Ситчихин, Карпов, Вершинин, Макаров.</span>
      </marquee>

    </q-header>

    <q-page-container class="page-main">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {

  },

  setup () {
    return {
    }
  }
});
</script>

<style scoped lang="scss">
  .header-text {
    font-size: 40px;
    line-height: 44px;
    font-weight: 700;
    padding-top: 20px;
  }

  .header-main {
    background-image: url('src/assets/bg/bg_header.png');
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    max-height: 120px;
  }

  .page-main {
    background-image: url('src/assets/bg/main_bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    min-height: 1080px;
    min-width: 1920px;
 }
</style>
