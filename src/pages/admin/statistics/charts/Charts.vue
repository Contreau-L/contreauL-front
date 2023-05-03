<template>
    <div class="charts">
        <div class="row" v-if="levels.length">
            <div class="flex md12 xs12">
                <va-card  class="chart-widget">
                    <va-card-title>Niveau de la réserve d'eau</va-card-title>
                    <va-card-content>
                        <va-chart :data="levelsChart" type="line"/>
                    </va-card-content>
                </va-card>
            </div>
        </div>
        <div class="row" v-if="temperatures.length">
            <div class="flex md12 xs12">
                <va-card class="chart-widget">
                    <va-card-title>Température de la réserve d'eau</va-card-title>
                    <va-card-content>
                        <va-chart :data="temperaturesChart" type="line"/>
                    </va-card-content>
                </va-card>
            </div>
        </div>
        <div class="row" v-if="phs.length">
            <div class="flex md12 xs12">
                <va-card class="chart-widget">
                    <va-card-title>Ph de la réserve d'eau</va-card-title>
                    <va-card-content>
                        <va-chart :data="phsChart" type="line"/>
                    </va-card-content>
                </va-card>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import VaChart from '../../../../components/va-charts/VaChart.vue'
import {onMounted, ref, watch} from "vue";
import {lastMonthLogs} from "../service/StatisticsService";
import {useGlobalStore} from "../../../../stores/global-store";


const {t} = useI18n();

const labels = ref([]);
const levels = ref([]);
const temperatures = ref([]);
const phs = ref([]);

function loadLabels(newLabels: Array<any>) {
    labels.value = [];
    newLabels.forEach((label) => labels.value.push(new Date(label).toLocaleDateString()));
}

const levelsChart = ref({});
const temperaturesChart = ref({});
const phsChart = ref({});

function loadLevelsChart() {
    levelsChart.value = {
        labels: labels.value,
        datasets: [
            {
                label: "Evolution du niveau de la réserve d'eau",
                backgroundColor: 'primary',
                data: levels.value,
            }
        ],
    }
}

function loadTemperaturesChart() {
    temperaturesChart.value = {
        labels: labels.value,
        datasets: [
            {
                label: "Evolution de la temperature de la réserve d'eau",
                backgroundColor: 'primary',
                data: temperatures.value,
            }
        ],
    }
}

function loadPhsChart() {
    phsChart.value = {
        labels: labels.value,
        datasets: [
            {
                label: "Evolution du ph de la réserve d'eau",
                backgroundColor: 'primary',
                data: phs.value,
            }
        ],
    }
}

function loadLastMonthLogs() {
    lastMonthLogs().then((response) => {
        levels.value = response.levels;
        temperatures.value = response.temperatures;
        phs.value = response.phs;
        loadLabels(response.times.reverse());
        loadLevelsChart();
        loadTemperaturesChart();
        loadPhsChart();
    })
}

const store = useGlobalStore();

watch(() => store.selectedDevice, () => {
    lastMonthLogs().then((response) => {
        levels.value = response.levels;
        temperatures.value = response.temperatures;
        phs.value = response.phs;
        loadLabels(response.times.reverse());
        loadLevelsChart();
        loadTemperaturesChart();
        loadPhsChart();
    })
})
onMounted(() => {
    setTimeout(() => {
        loadLastMonthLogs();
    }, 300);
})
</script>

<style lang="scss">
.chart-widget {
  .va-card__content {
    height: 450px;
  }
}
</style>
