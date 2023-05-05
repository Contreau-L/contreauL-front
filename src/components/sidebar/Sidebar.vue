<template>
  <va-sidebar :width="width" :minimized="minimized" :minimized-width="minimizedWidth" :animated="animated">
    <menu-minimized v-if="minimized" :items="items" />
    <menu-accordion v-else :items="items" />
  </va-sidebar>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
  import NavigationRoutes from './NavigationRoutes'
  import NavigationRoutesWithoutDevice from "./NavigationRoutesWithoutDevice";
  import MenuAccordion from './menu/MenuAccordion.vue'
  import MenuMinimized from './menu/MenuMinimized.vue'
  import {useGlobalStore} from "../../stores/global-store";

  withDefaults(
    defineProps<{
      width?: string
      color?: string
      animated?: boolean
      minimized?: boolean
      minimizedWidth?: string
    }>(),
    {
      width: '16rem',
      color: 'secondary',
      animated: true,
      minimized: true,
      minimizedWidth: undefined,
    },
  )

  const items = ref(NavigationRoutes.routes)
  const store = useGlobalStore();

  watch(() => store.devices, () => {
      if (store.devices.length > 0)
          items.value = NavigationRoutes.routes;
      else
          items.value = NavigationRoutesWithoutDevice.routes;
  })

onMounted(() => {
    if (store.devices.length > 0)
        items.value = NavigationRoutes.routes;
    else
        items.value = NavigationRoutesWithoutDevice.routes;
})
</script>

<style lang="scss">
  .va-sidebar {
    &__menu {
      padding: 2rem 0;
    }

    &-item {
      &__icon {
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
