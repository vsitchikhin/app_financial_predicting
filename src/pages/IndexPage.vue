<template>
  <q-page class="row items-center justify-evenly">
    <input-data />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputData from "src/modules/neiro/components/InputData/InputData.vue";

export default defineComponent({
  components: {InputData},
  setup () {
    return {  };
  }
});
</script>
