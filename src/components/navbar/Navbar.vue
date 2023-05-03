<template>
    <va-navbar class="app-layout-navbar">
        <template #left>
            <div class="left">
                <va-icon-menu-collapsed
                        :class="{ 'x-flip': isSidebarMinimized }"
                        class="va-navbar__item"
                        :color="colors.secondary"
                        @click="isSidebarMinimized = !isSidebarMinimized"
                />
                <router-link to="/admin/dashboard">
                    <vuestic-logo class="logo"/>
                </router-link>
            </div>
        </template>
        <template #right>
            <div v-if="selectOptions.length > 0">
                <va-select
                        class="device-selector"
                        v-model="actualDevice"
                        :options="selectOptions"
                />
            </div>
            <div style="max-width: 300px;" v-else>
                Aucun appareil assigné
            </div>
            <app-navbar-actions class="app-navbar__actions md5 lg4" :user-name="userName"/>
        </template>
    </va-navbar>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref, watch} from 'vue'
import {storeToRefs} from 'pinia'
import {useGlobalStore} from '../../stores/global-store'
import {useI18n} from 'vue-i18n'
import {useColors} from 'vuestic-ui'
import VuesticLogo from '../VuesticLogo.vue'
import VaIconMenuCollapsed from '../icons/VaIconMenuCollapsed.vue'
import AppNavbarActions from './components/AppNavbarActions.vue'
import {loadDevicesList} from "../../pages/admin/forms/services/SettingsService";

const GlobalStore = useGlobalStore();
const {t} = useI18n()

const {isSidebarMinimized} = storeToRefs(GlobalStore)

const {getColors} = useColors()
const colors = computed(() => getColors())
const userName = ref(GlobalStore.userName);

const actualDevice = ref("");
const selectOptions = ref([]);
const devices = ref([]);
let lastOptionIndex = -1;
function fillSelectOptions() {
    selectOptions.value = [];
    if (devices.value.length > 0)
        devices.value.forEach((device) => selectOptions.value.push(device.name + " - " + device.idMac));
        if (devices.value.length > 0) {
            if (lastOptionIndex >= 0)
                actualDevice.value = devices.value[lastOptionIndex].name + " - " + devices.value[lastOptionIndex].idMac;
            else
                actualDevice.value = devices.value[0].name + " - " + devices.value[0].idMac;
        }
}

watch(actualDevice, (newValue) => {
    GlobalStore.selectedDevice = devices.value[findDeviceIndex(newValue)];
})

function findDeviceIndex(device: string) {
    const deviceId = device.split(" - ")[1];
    const index = devices.value.findIndex((device) => device.idMac === deviceId);
    return index;
}

document.addEventListener('update-device', () => {
    lastOptionIndex = findDeviceIndex(actualDevice.value);
    setTimeout(() => {
        loadDevices();
    }, 200);
})

function loadDevices() {
    document.dispatchEvent(new Event('loading'));
    loadDevicesList().then((devicesFound) => {
        devices.value = devicesFound;
        fillSelectOptions();
        document.dispatchEvent(new Event('stop-loading'));
    })
}

onMounted(() => {
    setTimeout(() => {
        loadDevices();
    }, 100);
})
</script>

<style lang="scss" scoped>

.device-selector{
    width: 18rem;
}

.va-navbar {
  box-shadow: var(--va-box-shadow);
  z-index: 2;

  --va-select-color: white;

  @media screen and (max-width: 950px) {
    .left {
      width: 100%;
    }

    .app-navbar__actions {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}

.left {
  display: flex;
  align-items: center;

  & > * {
    margin-right: 1.5rem;
  }

  & > *:last-child {
    margin-right: 0;
  }
}

.x-flip {
  transform: scaleX(-100%);
}

.app-navbar-center {
  display: flex;
  align-items: center;

  @media screen and (max-width: 1200px) {
    &__github-button {
      display: none;
    }
  }

  @media screen and (max-width: 950px) {
    &__text {
      display: none;
    }
  }
}

.logo {
  height: 50%;
  width: 50%;
}
</style>
