<template>
  <form @submit.prevent="onsubmit" @keyup.enter="onsubmit">
    <va-input
      v-model="formData.email"
      class="mb-3"
      type="email"
      :label="t('auth.email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
      :input-class=" emailErrors.length ? 'textError' : ''"
    />

    <va-input
      v-model="formData.password"
      class="mb-3"
      type="password"
      :label="t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
      :input-class=" passwordErrors.length ? 'textError' : ''"
    />

    <div class="auth-layout__options d-flex align-center justify-space-between">
      <router-link class="ml-1 va-link" :to="{ name: 'recover-password' }">{{
          t('auth.recover_password')
        }}
      </router-link>
    </div>

    <div class="d-flex justify-center mt-3">
      <va-button class="my-0" @click="onsubmit">{{ t('auth.login') }}</va-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {computed, onBeforeMount, reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {ReactiveVariable} from "vue/macros";
import {UserLogin} from "./services/dtt";
import {loginUser} from "./services/loginService";
import {useGlobalStore} from "../../../stores/global-store";
import {useToast} from "vuestic-ui";
import {getToken, getUsername, storeTokenAndUsername} from "../../../utils/cookieManagement";

const {t} = useI18n()

const formData: ReactiveVariable<UserLogin> = reactive({
  email: "",
  password: ""
})
const emailErrors = ref<string[]>([])
const passwordErrors = ref<string[]>([])

const formReady = computed(() => {
  return (formData.email!.length > 0 && formData.password!.length > 0)
})

const router = useRouter();
const store = useGlobalStore();

function onsubmit() {
  if (!formReady.value) {
    emailErrors.value = formData.email ? [] : ["L'email est obligatoire"]
    passwordErrors.value = formData.password ? [] : ['Le mot de passe est obligatoire']
  } else {
    loginUser(formData).then((user: UserLogin) => {
      store.setToken(user.token!);
      store.setUserName(user.name!);
      storeTokenAndUsername(user.token!, user.name!);
      notifySuccess();
      router.push("/admin");
    }).catch(() => notifyError());
  }
}

const {init} = useToast();

function notifySuccess() {
  init({
    message: "Connexion réalisée avec succès",
    position: 'top-right',
    duration: 3000,
    color: "info",
  })
}

function notifyError() {
  init({
    message: "Problème rencontré lors de la connexion",
    position: 'top-right',
    duration: 3000,
    color: "danger",
  })
}

onBeforeMount(() => {
  if (!useGlobalStore().isTokenAlreadySet) {
    if (getUsername() && getToken()) {
      store.setUserName(getUsername()!);
      store.setToken(getToken()!)
    }
    else
      return
  }
  useRouter().push('/admin');
})
</script>

<style lang="scss">
.textError {
  &.va-input__content__input {
    color: black !important;
  }
}
</style>