<template>
    <div class="row row-equal">
        <div class="flex xl6 xs12 lg6">
            <div class="row">
                <div v-for="(info, idx) in infoTiles" :key="idx" class="flex xs12 sm4">
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
                            <p class="no-wrap">date du dernier log</p>
                        </va-card-content>
                    </va-card>
                </div>
                <div class="flex xs12 sm6 md6">
                    <va-card>
                        <va-card-content>
                            <h2 class="va-h2 ma-0" :style="{ color: colors.primary }">{{ context.lastConnexion }}</h2>
                            <p class="no-wrap">date de la dernière connexion de l'appareil</p>
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
    console.log(newValue)
})

function refreshInfo() {
    console.log(context)
    infoTiles.value = [
        {
            color: 'info',
            value: context.level,
            text: 'niveau de la réserve',
            icon: '',
        },
        {
            color: 'danger',
            value: context.temperature,
            text: 'température de la réserve',
            icon: '',
        },
        {
            color: 'success',
            value: context.ph,
            text: 'ph de la réserve',
            icon: '',
        },
    ]
}


onMounted(() => {
    setTimeout(() => {
        deviceContext().then((newContext) => {
            context.level = newContext.water_level;
            context.temperature = newContext.water_temperature;
            context.ph = newContext.ph;
            context.lastLog = new Date(newContext.occurred_at).toLocaleString();
            context.lastConnexion = new Date(newContext.last_connexion).toLocaleString();
            refreshInfo();
        })
    }, 200);
})
</script>

<style lang="scss" scoped>
.row-separated {
  .flex + .flex {
    border-left: 1px solid var(--va-background-primary);
  }
}

.rich-theme-card-text {
  line-height: 1.5;
}

.gallery-carousel {
  width: 80vw;
  max-width: 100%;

  @media all and (max-width: 576px) {
    width: 100%;
  }
}
</style>
