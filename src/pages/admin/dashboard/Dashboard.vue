<template>
    <div class="dashboard">
        <div class="info-actions-container">
            <div class="info-container">
                <dashboard-info-block/>
            </div>
            <div class="actions-container">
                <dashboard-action-blocks/>
            </div>
        </div>

        <div class="row row-equal">
                <DashboardLogsTables/>
                <DashboardActionsTables/>
        </div>
    </div>
</template>

<script setup lang="ts">
import DashboardInfoBlock from './DashboardContextBlocks.vue'

import {useGlobalStore} from "../../../stores/global-store";
import {useRouter} from "vue-router";
import DashboardLogsTables from "./DashboardLogsTables.vue";
import DashboardActionsTables from "./DashboardActionsTables.vue";
import DashboardActionBlocks from "./DashboardActionBlocks.vue";
import {onMounted} from "vue";
import {loadDevicesList} from "../forms/services/SettingsService";

const store = useGlobalStore();
const router = useRouter();

onMounted(() => {
    setTimeout(() => {
        loadDevicesList().then((devicesFound) => {
            if (devicesFound.length === 0) {
                document.dispatchEvent(new Event('stop-loading'));
                router.push('/admin/settings');
            }
            document.dispatchEvent(new Event('stop-loading'));
        })
    }, 100);
})

</script>

<style lang="scss">
.dashboard {
  .va-card {
    margin-bottom: 0 !important;

    &__title {
      display: flex;
      justify-content: space-between;
    }
  }
}

.info-actions-container {
  display: flex;
  flex-direction: row;
  column-gap: 1%;
  .info-container {
    width: 49.5%;
  }
  .actions-container {
    width: 49.5%;
  }
}
</style>
