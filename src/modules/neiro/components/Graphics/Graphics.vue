<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import {ISeries} from "src/modules/neiro/types/neiro.types";
import {NeiroService} from "src/modules/neiro/services/neiro.service";
import ApexCharts from 'apexcharts'

export default defineComponent({
    setup() {
      const neiroService = new NeiroService();

      const graphic = ref<HTMLElement | null>(null);

      const predictedValues = computed(() => neiroService.predictions);

      const series = ref<ISeries[]>([
        {
          name: '',
          data: [],
        }
      ] as ISeries[]);

      watch(() => predictedValues.value?.value.length, () => {
        series.value = [
              {
                name: 'Open',
                data: predictedValues.value?.open || [],
              },
              {
                name: 'Close',
                data: predictedValues.value?.close || [],
              },
              {
                name: 'High',
                data: predictedValues.value?.high || [],
              },
              {
                name: 'Low',
                data: predictedValues.value?.low || [],
              }
            ]
      })

      const categories = computed(() => {
        const indexes: number[] = []
        let counter = 0;

        series.value ? series.value[0].data.forEach(() => {
          indexes.push(counter);
          counter++;
        }) : indexes.push(0);

        return indexes;
      })

      onMounted(() => {
        let options = {
          chart: {
            type: 'line'
          },
          series: series.value || [],
          xaxis: {
            categories: categories.value || [],
          }
        }

        let chart = new ApexCharts(document.querySelector("#graphic"), options);

        chart.render();

        watch(() => series.value[0].data.length, () => {
          options.series = series.value;
          options.xaxis.categories = categories.value;
          chart.destroy();
          chart = new ApexCharts(document.querySelector("#graphic"), options);
          chart.render()
          console.log(series.value)
        })
      })

      return {
        graphic,
      }
    },
})
</script>

<template>
  <div class="graphic">
    <div ref="graphic" id="graphic" class="graphic__chart"></div>
  </div>
</template>

<style scoped lang="scss">
  @import 'src/css/app.scss';

  .graphic {
    width: 1000px;
    height: 600px;
  }
</style>