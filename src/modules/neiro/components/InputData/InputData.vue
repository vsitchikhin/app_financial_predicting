<script lang="ts">
import {computed, defineComponent, ref, watch} from "vue";
import {CompanyNamesEnum, IPredictedValues} from "src/modules/neiro/types/neiro.types";
import {NeiroService} from "src/modules/neiro/services/neiro.service";

  export default defineComponent({
    props: {

    },

    setup() {
      const neiroService = new NeiroService();

      // --------------------------------------------------------------
      // Данные для инпутов
      const inputData = ref<IPredictedValues>({
        open: 0,
        close: 0,
        high: 0,
        low: 0,
        value: 0,
      });

      // --------------------------------------------------------------
      // Данные для списка компаний
      const currentCompany = ref<CompanyNamesEnum | null>(null);
      const options = computed(() => neiroService.companiesList);

      // Список доступных компаний загружается непосредственно в момент первого открытия
      // todo: асинхронность добавить
      function filterFunction(val, update) {
        if (options.value !== null && options.value !== undefined) {
          update();
          return;
        }

        update(() => {
          neiroService.loadCompaniesList()
        });
      }

      watch([currentCompany], () => {
        if (currentCompany.value && confirm('Сменить текущую компанию? Это очистит все полученные значения.')) {
          neiroService.setCompanyName(currentCompany.value);
        }
      });

      function abortFilterFn() {
        console.log('none');
      }

      // --------------------------------------------------------------
      // Методы загрузки данных
      async function onButtonClick() {
        inputData.value = await neiroService.getPrediction({
          open: Number(inputData.value.open),
          close: Number(inputData.value.close),
          high: Number(inputData.value.high),
          low: Number(inputData.value.low),
          value: Number(inputData.value.value),
        });
      }

      return {
        inputData,
        onButtonClick,
        currentCompany,
        options,
        filterFunction,
        abortFilterFn,
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
      <q-input filled v-model="inputData.value" class="input-data__input">VOLUME</q-input>
<!--      <q-select-->
<!--        filled-->
<!--        v-model="currentCompany"-->
<!--        use-chips-->
<!--        label="Выберите компанию"-->
<!--        :options="options"-->
<!--        @filter="filterFunction"-->
<!--        @filter-abort="abortFilterFn"-->
<!--        class="input-data__select"-->
<!--      >-->
<!--        <template v-slot:no-option>-->
<!--          <q-item>-->
<!--            <q-item-section class="text-grey">-->
<!--              No results-->
<!--            </q-item-section>-->
<!--          </q-item>-->
<!--        </template>-->
<!--      </q-select>-->
      <q-btn color="primary" label="Рассчитать значения" @click="onButtonClick" class="input-data__button" />
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

    &__button {
      width: 400px;
    }

    &__select {
      color: $font;
      background: $main-bg;
      max-width: 240px;
      width: 100%;
      margin-right: 20px;
      border: 1px solid $primary;
      border-radius: 8px;
      font-size: 16px;
      line-height: 20px;
      font-weight: 500;
    }

    &__input {
      color: $font;
      background: $main-bg;
      max-width: 140px;
      margin-right: 20px;
      border: 1px solid $primary;
      border-radius: 8px;
      font-size: 16px;
      line-height: 20px;
      font-weight: 500;
    }
  }
</style>
