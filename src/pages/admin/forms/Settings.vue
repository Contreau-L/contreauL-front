<template>
  <DeviceSelector/>
  <DeviceEditor v-if="userHasDevices"/>
  <GardenLinesEditor v-if="userHasDevices"/>
</template>

<script lang="ts" setup>
import DeviceSelector from "./composables/DeviceSelector.vue";
import DeviceEditor from "./composables/DeviceEditor.vue";
import GardenLinesEditor from "./composables/GardenLinesEditor.vue";
import {onMounted, ref, watch} from "vue";
import {useGlobalStore} from "../../../stores/global-store";

const userHasDevices = ref(false);
const store = useGlobalStore();

watch(() => store.devices, (newValue) => {
    userHasDevices.value = newValue.length > 0;
})

onMounted(() => {
    userHasDevices.value = store.devices.length > 0;
})
</script>