<template>
  <form @submit.prevent="onsubmit()" @keyup.enter="onsubmit">

    <va-input
      v-model="formData.name"
      class="mb-3"
      type="name"
      :label="t('auth.name')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
      :input-class=" passwordErrors.length ? 'textError' : ''"
    />

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
      <router-link class="ml-1 va-link" :to="{ name: 'recover-password' }">
        {{ t('auth.recover_password') }}
      </router-link>
    </div>

    <div class="d-flex justify-center mt-3">
      <va-button class="my-0" @click="onsubmit" @keyup.enter="onsubmit">{{ t('auth.sign_up') }}</va-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {ref, computed, reactive} from 'vue'
import {useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {ReactiveVariable} from "vue/macros";
import {UserSignup} from "./services/dtt";
import {signupUser} from "./services/signupService";
import {useToast} from "vuestic-ui";
import {useGlobalStore} from "../../../stores/global-store";
import {storeTokenAndUsername} from "../../../utils/cookieManagement";

const {t} = useI18n()

const formData: ReactiveVariable<UserSignup> = reactive({
  name: "",
  email: "",
  password: ""
})
const agreedToTerms = ref(false)
const emailErrors = ref<string[]>([])
const passwordErrors = ref<string[]>([])
const nameErrors = ref<string[]>([])


const formReady = computed(() => {
  return (formData.name.length > 0 && formData.email!.length > 0 && formData.password!.length > 0)
})

const router = useRouter();
const store = useGlobalStore();

function emailValidation(): Array<string> {
  if (!formData.email) {
    return ["L'email est obligatoire"];
  } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email!)) {
    return [];
  } else {
    return ["L'email n'est pas valide"];
  }
}

function onsubmit(): void {
  if (!formReady.value) {
    emailErrors.value = emailValidation();
    passwordErrors.value = formData.password ? [] : ['Le mot de passe est obligatoire'];
    nameErrors.value = agreedToTerms.value ? [] : ['Le prenom est obligatoire'];
  } else {
    signupUser(formData).then((user: UserSignup) => {
      store.setToken(user.token!);
      store.setUserName(user.name);
      storeTokenAndUsername(user.token!, user.name!);
      notifySuccess();
      router.push("/admin")
    }).catch(() => {
      notifyError();
    })
  }
}

const {init} = useToast();

function notifySuccess(): void {
  init({
    message: "Inscription réalisée avec succès !",
    position: 'top-right',
    duration: 3000,
    color: "info",
  })
}

function notifyError(): void {
  init({
    message: "Problème rencontré lors de l'inscription !",
    position: 'top-right',
    duration: 3000,
    color: "danger",
  })
}
</script>

<style lang="scss">
.textError {
  &.va-input__content__input {
    color: black !important;
  }
}
</style>

