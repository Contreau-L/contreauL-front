<template>
    <div class="blocks-container">
        <div class="flex">
            <div class="infos-tiles-container">
                <div v-for="(info) in infoTiles" class="flex">
                    <va-card class="mb-4" :color="info.color">
                        <va-card-content>
                            <h2 class="va-h2 ma-0" style="color: white">{{ info.value }}</h2>
                            <p style="color: white">{{ info.text }}</p>
                        </va-card-content>
                    </va-card>
                </div>
            </div>

            <div class="row">
                <div class="flex xs12 sm6 md6">
                    <va-card>
                        <va-card-content>
                            <h2 class="va-h2 ma-0" :style="{ color: colors.primary }">{{ context.lastLog }}</h2>
                            <p class="no-wrap">dernier log de l'appareil</p>
                        </va-card-content>
                    </va-card>
                </div>
                <div class="flex xs12 sm6 md6">
                    <va-card>
                        <va-card-content>
                            <h2 class="va-h2 ma-0" :style="{ color: colors.primary }">{{ context.lastConnexion }}</h2>
                            <p class="no-wrap">dernière connexion de l'appareil</p>
                        </va-card-content>
                    </va-card>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch} from 'vue'
import {useI18n} from 'vue-i18n'
import {VaCarousel, VaModal, VaCard, VaCardContent, VaCardTitle, VaButton, VaImage, useColors} from 'vuestic-ui'
import {deviceContext} from "./services/DashboardServices";
import {useGlobalStore} from "../../../stores/global-store";

const {t} = useI18n()
const {colors} = useColors()

const context = reactive({
    level: 0,
    temperature: 0,
    ph: 0,
    lastLog: "",
    lastConnexion: ""
})

const infoTiles = ref([]);

watch(context, (newValue) => {
    refreshInfo();
})

function refreshInfo() {
    infoTiles.value = [
        {
            color: 'info',
            value: context.level ? context.level : 0,
            text: 'niveau de la réserve',
            icon: '',
        },
        {
            color: 'danger',
            value: context.temperature ? context.temperature : 0,
            text: 'température de la réserve',
            icon: '',
        },
        {
            color: 'success',
            value: context.ph ? context.temperature : 0,
            text: 'ph de la réserve',
            icon: '',
        },
    ]
}

const store = useGlobalStore();

watch(() => store.selectedDevice, () => {
    loadContext();
})

function loadContext() {
    deviceContext().then((newContext) => {
        context.level = newContext.water_level;
        context.temperature = newContext.water_temperature;
        context.ph = newContext.ph;
        context.lastLog = newContext.occurred_at ? new Date(newContext.occurred_at).toLocaleString() : 'En attente';
        context.lastConnexion = newContext.last_connexion ? new Date(newContext.last_connexion).toLocaleString() : 'En attente';
        refreshInfo();
    })
}


onMounted(() => {
    setTimeout(() => {
        loadContext();
    }, 100);
})
</script>

<style lang="scss" scoped>
.infos-tiles-container {
    display: flex;
    flex-direction: row;
    column-gap: 1.4rem;
    div {
        width: 100%;
    }
}
</style>