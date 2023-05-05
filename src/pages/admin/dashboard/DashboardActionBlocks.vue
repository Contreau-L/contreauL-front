<template>
    <div class="blocks-container">
        <div class="actions-card">
            <va-card>
                <va-card-content>
                    <h2 class="va-h2 ma-0" :style="{ color: colors.primary }">{{ context.lastLog }}</h2>
                    <p class="no-wrap">dernier log de l'appareil</p>
                </va-card-content>
            </va-card>
        </div>
        <div class="actions-card">
            <va-card style="padding: 0.5rem">
                <va-card-content class="actions-button-container">
                    <va-button class="md6 mr-2 actions-button" :style="{ background: colors.danger }" color="red" size="medium">
                        Arrêter toutes les lignes
                        <va-icon
                                name="material-icons-stop"
                                style="font-size: 1.4rem; display: flex; margin-left: 0.5rem"
                                class="settings-dropdown__icon"
                        />
                    </va-button>
                    <va-button class="md6 mr-2 actions-button" :style="{ background: colors.danger }" color="red" size="medium">
                        Relancer toutes les lignes
                        <va-icon
                            name="material-icons-play_circle_outline"
                            style="font-size: 1.4rem; display: flex; margin-left: 0.5rem"
                            class="settings-dropdown__icon"
                        />
                    </va-button>
                    <va-button class="md6 mr-2 actions-button" :style="{ background: colors.danger }" color="red" size="medium">
                        Arroser toutes les lignes
                        <va-icon
                            name="glyphicon-tint"
                            style="font-size: 1.4rem; display: flex; margin-left: 0.5rem"
                            class="settings-dropdown__icon"
                        />
                    </va-button>
                </va-card-content>
            </va-card>
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
        context.lastLog = context.lastLog ? new Date(newContext.occurred_at).toLocaleString() : 'En attente';
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
.actions-button {
    padding: 0.2rem;
}

.actions-button-container {
    display: flex;
    justify-content: space-evenly;
}

.blocks-container {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  .actions-card {
    width: 100%;
    height: 100%;
  }
}

.infos-tiles-container {
  display: flex;
  flex-direction: row;
  column-gap: 1.4rem;
}
</style>