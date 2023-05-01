<template>
  <div class="profile-dropdown-wrapper">
    <va-dropdown v-model="isShown" class="profile-dropdown" stick-to-edges placement="bottom" :offset="[13, 0]">
      <template #anchor>
        <span class="profile-dropdown__anchor">
          <slot />
          <va-icon class="px-2" :name="isShown ? 'angle_up' : 'angle_down'" :color="colors.primary" />
        </span>
      </template>
      <va-dropdown-content class="profile-dropdown__content">
        <va-list-item v-for="option in options" :key="option.name" class="pa-2">
          <span @click="logoutUser()" class="profile-dropdown__item">
            {{ t(`user.${option.name}`) }}
          </span>
        </va-list-item>
      </va-dropdown-content>
    </va-dropdown>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useColors } from 'vuestic-ui'
  import {deleteCookie} from "../../../../utils/cookieManagement";
  import {useRouter} from "vue-router";
  import {useGlobalStore} from "../../../../stores/global-store";

  const { t } = useI18n()
  const { colors } = useColors()

  withDefaults(
    defineProps<{
      options?: { name: string; redirectTo: string }[]
    }>(),
    {
      options: () => [
        {
          name: 'logout',
          redirectTo: 'login',
        },
      ],
    },
  )

  const isShown = ref(false)
  const router = useRouter();
  const store = useGlobalStore();

  const logoutUser = () => {
    deleteCookie('token');
    deleteCookie('username');
    store.setUserName('');
    store.setToken('')
    router.push('/auth')
  }
</script>

<style lang="scss" scoped>
  .profile-dropdown {
    cursor: pointer;

    &__anchor {
      display: inline-block;
    }

    &__item {
      display: block;
      color: var(--va-gray);

      &:hover,
      &:active {
        color: var(--va-primary);
      }
    }
  }
</style>
