<template>
  <q-page class="row items-center justify-evenly">
    <input-data />
    <div class="graphs">
      <graphics class="graph" />
    </div>
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import InputData from "src/modules/neiro/components/InputData/InputData.vue";
import Graphics from "src/modules/neiro/components/Graphics/Graphics.vue";
import {GraphicTypeEnum} from "src/modules/neiro/types/neiro.types";

export default defineComponent({
  computed: {
    GraphicTypeEnum() {
      return GraphicTypeEnum
    }
  },
  components: {Graphics, InputData},
  setup () {
    return {  };
  }
});
</script>

<style scoped lang="scss"></style>
