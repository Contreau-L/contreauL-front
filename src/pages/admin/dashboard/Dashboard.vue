<template>
    <div class="dashboard" v-if="isOneDeviceSelected">
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
import {onMounted, watch} from "vue";
import {loadDevicesList} from "../forms/services/SettingsService";
import {ref} from "@vue/reactivity";

const store = useGlobalStore();
const router = useRouter();

const isOneDeviceSelected = ref(false);

watch(() => store.selectedDevice, () => {
    isOneDeviceSelected.value = store.selectedDevice.idMac ? true : false;
})

onMounted(() => {
    setTimeout(() => {
        isOneDeviceSelected.value = store.selectedDevice.idMac ? true : false;
    }, 100);
})

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
      margin-right: 0.4rem;
  }

  .actions-container {
    width: 49.5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

      .va-card {
          width: 100% !important;
      }
  }
}
</style>
