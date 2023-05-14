<template>
    <div class="flex xs12">
        <va-card>
            <va-card-title>{{ "Assignation d'un nouvel appareil"}}</va-card-title>
            <va-card-content>
                <form>
                    <div class="row">
                        <div class="flex md4 sm6 xs12">
                            <va-input label="Adresse mac de votre appareil" v-model="deviceId" placeholder="464654318">
                                <template #append>
                                    <va-button style="margin-right: 0" @click="submit"> Associer </va-button>
                                </template>
                            </va-input>
                        </div>
                    </div>
                </form>
            </va-card-content>
        </va-card>
    </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import { useI18n } from 'vue-i18n'
import {deviceAttachmentToUser, refreshDevicesList} from "../services/SettingsService";
import {useGlobalStore} from "../../../../stores/global-store";
import {useToast} from "vuestic-ui";

const { t } = useI18n()
const store = useGlobalStore();
const deviceId = ref("");


function submit() {
    if (isDeviceIdValid())
        deviceAttachmentToUser(deviceId.value, store.userId).then((message: string) => {
            notifySuccess(message);
            refreshDevicesList();
            deviceId.value = "";
            document.dispatchEvent(new Event('update-device'));
        }).catch((error) => {
            notifyError(error.response.data.error);
        })
    else
        notifyError("Adresse mac renseignée invalide ! ");
}

function isDeviceIdValid(){
    return deviceId.value !== "" && !isNaN(parseInt(deviceId.value))
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
</script>

<style scoped>

</style>