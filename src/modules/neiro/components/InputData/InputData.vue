<script lang="ts">
import {defineComponent, reactive} from "vue";

  export default defineComponent({
    props: {

    },

    setup() {
      const inputData = reactive({
        open: 0,
        close: 0,
        high: 0,
        low: 0,
        val: 0,
      });

      return {
        inputData,
      }
    }
  })
</script>

<template>
  <div class="input-data">
    <h1 class="input-data__header">Введите текущие известные показатели акции</h1>
    <div class="input-data__data-container">
      <q-input filled v-model="inputData.open" class="input-data__input">OPEN</q-input>
      <q-input filled v-model="inputData.high" class="input-data__input">HIGH</q-input>
      <q-input filled v-model="inputData.low" class="input-data__input">LOW</q-input>
      <q-input filled v-model="inputData.close" class="input-data__input">CLOSE</q-input>
      <q-input filled v-model="inputData.val" class="input-data__input">VALUE</q-input>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import 'src/css/app.scss';

  .input-data {
    &__header {
      color: $dark-font;
      font-size: 24px;
      font-weight: 600;
      line-height: 28px;
    }

    &__data-container {
      display: flex;
    }

    &__input {
      color: $font;
      background: $main-bg;
      max-width: 140px;
      margin-left: 20px;
      border: 1px solid $primary;
      border-radius: 8px;
      font-size: 16px;
      line-height: 20px;
      font-weight: 500;

      &:first-child {
        margin-left: 0;
      }
    }
  }
</style>