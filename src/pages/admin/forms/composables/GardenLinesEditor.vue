<template>
    <div class="flex xs12 device-editor-container">
        <va-card>
            <va-card-title>{{ "Mise à jour des lignes de l'appareil" }}</va-card-title>
            <va-card-content>
                <form>
                    <div class="row">
                        <div class="data-input-container md4 sm6 xs12">
                            <va-select
                                    label="Ligne"
                                    class="gardenLine-selector data-input"
                                    v-model="actualGardenLine"
                                    :options="selectOptions"
                            />
                            <va-input class="data-input" label="Type de végétation" v-model="formData.type"
                                      placeholder="Carotte, rose...">
                            </va-input>
                            <va-input type="number" step="1" class="data-input" label="Seuil d'humidité"
                                      v-model="formData.threshold" placeholder="0.38">
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
import {
    gardenLinesListFromDevice,
    loadGardenLinesList,
    updateDeviceData, updateGardenLine
} from "../services/SettingsService";
import {useGlobalStore} from "../../../../stores/global-store";
import {useToast} from "vuestic-ui";

const {t} = useI18n()
const store = useGlobalStore();

const formData = reactive({
    type: "",
    threshold: 0
})

const actualGardenLine = ref("");
const selectOptions = ref([]);
const lines = ref([]);
const selectedDevice = ref(store.selectedDevice);

function submit() {
    updateGardenLine(lines.value[parseInt(actualGardenLine.value) - 1].id, formData.type, formData.threshold.toString()).then((message: string) => {
        notifySuccess(message);
        gardenLinesListFromDevice(store.selectedDevice.idMac);
        loadLines();
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

function fillLinesOption() {
    selectOptions.value = [];
    lines.value.forEach((line) => selectOptions.value.push(line.lineIndex));
    if (lines.value.length > 0)
        actualGardenLine.value = lines.value[0].lineIndex;
}

watch(actualGardenLine, (newValue) => {
    let index = parseInt(newValue) - 1;
    if (lines.value[index].vegetableType !== "undefined")
        formData.type = lines.value[index].vegetableType;
    else
        formData.type = "";
    formData.threshold = lines.value[index].humidityThreshold;
})

watch(selectedDevice, () => {
    loadLines();
})

watch(store.gardenLines, () => {
    loadLines();
})

watch(() => store.selectedDevice, () => {
    if (store.userId !== "")
        gardenLinesListFromDevice(store.selectedDevice.idMac).then(() => loadLines())
})

function loadLines() {
    setTimeout(() => {
        loadGardenLinesList().then((linesFound) => {
            lines.value = linesFound;
            fillLinesOption();
        })
    }, 200);
}

onMounted(() => {
    loadLines();
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
    flex-wrap: wrap;
}

.data-input {
    width: 25rem;
}

</style>