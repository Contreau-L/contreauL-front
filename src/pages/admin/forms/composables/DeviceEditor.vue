<template>
    <div class="flex xs12 device-editor-container">
        <va-card>
            <va-card-title>{{ "Mise à jour des information de l'appareil" }}</va-card-title>
            <va-card-content>
                <form>
                    <div class="row">
                        <div class="data-input-container md4 sm6 xs12">
                            <va-input class="data-input" label="Nom" v-model="formData.name" placeholder="monAppareil">
                            </va-input>
                            <va-input class="data-input" label="Code postal de votre appareil" v-model="formData.insee"
                                      placeholder="Adresse mac de votre appareil">
                            </va-input>
                            <va-button style="margin-right: 0" @click="submit"> Modifier</va-button>
                        </div>
                    </div>
                </form>
            </va-card-content>
        </va-card>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, watch} from "vue";
import {useI18n} from 'vue-i18n'
import {deviceAttachmentToUser, refreshDevicesList, updateDeviceData} from "../services/SettingsService";
import {useGlobalStore} from "../../../../stores/global-store";
import {useToast} from "vuestic-ui";

const {t} = useI18n()
const store = useGlobalStore();

const formData = reactive({
    name: "",
    insee: 0
})

function submit() {
    updateDeviceData(store.selectedDevice.idMac, formData.name, formData.insee).then((message: string) => {
        notifySuccess(message);
        refreshDevicesList();
        document.dispatchEvent(new Event('update-device'));
    }).catch((error) => {
        notifyError(error.response.data.error);
    })
}

const {init} = useToast();

function notifySuccess(message: string) {
    init({
        message: message,
        position: 'top-right',
        duration: 3000,
        color: "info",
    })
}

function notifyError(error: string) {
    init({
        message: error,
        position: 'top-right',
        duration: 3000,
        color: "danger",
    })
}

watch(() => store.selectedDevice, () => {
    loadSelectedDevice();
})

function loadSelectedDevice() {
    if (store.selectedDevice) {
        formData.name = store.selectedDevice.name;
        formData.insee = store.selectedDevice.insee;
    }
}

onMounted(() => {
    setTimeout(() => {
        loadSelectedDevice();
    }, 200);
})
</script>

<style scoped>
.device-editor-container {
    margin-top: 1rem;
}

.data-input-container {
    margin-top: 0.7rem;
    display: flex;
    margin-left: 0.7rem;
    column-gap: 1rem;
}

.data-input {
    width: 25rem;
}

</style>