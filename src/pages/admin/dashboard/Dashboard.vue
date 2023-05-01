<template>
    <div class="dashboard">
        <dashboard-charts/>

        <dashboard-info-block/>

        <div class="row row-equal">
            <div class="flex xs12 lg6">
                <dashboard-tabs @submit="addAddressToMap"/>
            </div>

            <div class="flex xs12 lg6">
                <DashboardMap ref="dashboardMap"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';


import DashboardCharts from './DashboardCharts.vue'
import DashboardInfoBlock from './DashboardInfoBlock.vue'
import DashboardTabs from './DashboardTabs.vue'
import DashboardMap from './DashboardMap.vue'
import {useGlobalStore} from "../../../stores/global-store";
import {useRouter} from "vue-router";

const dashboardMap = ref();
const store = useGlobalStore();
const router = useRouter();

function addAddressToMap({city, country}: { city: { text: string }; country: string }) {
    dashboardMap.value.addAddress({city: city.text, country})
}

onMounted(() => {
    if (store.devices.length < 1) {
        document.dispatchEvent(new Event('stop-loading'));
        // router.push('/settings')
    }
});
</script>

<style lang="scss">
.row-equal .flex {
  .va-card {
    height: 100%;
  }
}

.dashboard {
  .va-card {
    margin-bottom: 0 !important;

    &__title {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
