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
      <app-navbar-actions class="app-navbar__actions md5 lg4" :user-name="userName"/>
    </template>
  </va-navbar>
</template>

<script setup>
import {computed, ref} from 'vue'
import {storeToRefs} from 'pinia'
import {useGlobalStore} from '../../stores/global-store'
import {useI18n} from 'vue-i18n'
import {useColors} from 'vuestic-ui'
import VuesticLogo from '../VuesticLogo.vue'
import VaIconMenuCollapsed from '../icons/VaIconMenuCollapsed.vue'
import AppNavbarActions from './components/AppNavbarActions.vue'

const GlobalStore = useGlobalStore()
const {t} = useI18n()

const {isSidebarMinimized} = storeToRefs(GlobalStore)

const {getColors} = useColors()
const colors = computed(() => getColors())
const userName = ref(GlobalStore.userName);

</script>

<style lang="scss" scoped>
.va-navbar {
  box-shadow: var(--va-box-shadow);
  z-index: 2;

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