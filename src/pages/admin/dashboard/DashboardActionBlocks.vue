<template>
    <div class="blocks-container">
        <div class="actions-card">
            <va-card>
                <va-card-content>
                    <div class="lines-actions">
                        <div class="lines-container">
                            <div :class="['lines-badge', line.status ? 'lines-badge--true' : 'lines-badge--false', {selected: selectedLine.id === line.id}]"
                                 v-for="line in lines"
                                 @click="updateSelectedLine(line)">
                                {{ line.lineIndex }}
                            </div>
                        </div>
                        <div>
                            <va-button class="md6 mr-2 actions-button" color="red"
                                       size="medium" v-show="selectedLine && selectedLine.status" @click="stopLine">
                                Arrêter
                                <va-icon
                                        name="material-icons-stop"
                                        style="font-size: 1.4rem; display: flex; margin-left: 0.5rem"
                                        class="settings-dropdown__icon"
                                />
                            </va-button>
                            <va-button class="md6 mr-2 actions-button" color="red"
                                       size="medium" v-show="selectedLine && !selectedLine.status" @click="startLine">
                                Relancer
                                <va-icon
                                        name="material-icons-play_circle_outline"
                                        style="font-size: 1.4rem; display: flex; margin-left: 0.5rem"
                                        class="settings-dropdown__icon"
                                />
                            </va-button>
                            <va-button class="md6 mr-2 actions-button" color="red"
                                       size="medium" @click="dryLine">
                                Arroser
                                <va-icon
                                        name="glyphicon-tint"
                                        style="font-size: 1.4rem; display: flex; margin-left: 0.5rem"
                                        class="settings-dropdown__icon"
                                />
                            </va-button>
                        </div>
                    </div>
                </va-card-content>
            </va-card>

        </div>
        <div class="actions-card">
            <va-card style="padding: 0.5rem">
                <va-card-content class="actions-button-container">
                    <va-button class="md6 mr-2 actions-button" color="red"
                               size="medium" @click="stopAllLines" v-show="stopAllEnable">
                        Arrêter tous
                        <va-icon
                                name="material-icons-stop"
                                style="font-size: 1.4rem; display: flex; margin-left: 0.5rem"
                                class="settings-dropdown__icon"
                        />
                    </va-button>
                    <va-button class="md6 mr-2 actions-button" color="red"
                               size="medium" @click="startAllLines" v-show="startAllEnable">
                        Démarrer tous
                        <va-icon
                                name="material-icons-play_circle_outline"
                                style="font-size: 1.4rem; display: flex; margin-left: 0.5rem"
                                class="settings-dropdown__icon"
                        />
                    </va-button>
                    <va-button class="md6 mr-2 actions-button" color="red"
                               size="medium" @click="dryAllLines">
                        Arroser tous
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
import {onMounted, ref, watch} from 'vue'
import {useI18n} from 'vue-i18n'
import {
    VaCard,
    VaCardContent,
    VaButton,
    useToast
} from 'vuestic-ui'
import {
    generateActionOnLine,
    generateActionsOnAllLines,
    setAllLinesStatusToFalse,
    setAllLinesStatusToTrue, setLineStatusToFalse, setLineStatusToTrue
} from "./services/DashboardServices";
import {useGlobalStore} from "../../../stores/global-store";
import {gardenLinesListFromDevice, loadGardenLinesList} from "../forms/services/SettingsService";

const {t} = useI18n()

const lines = ref([]);
const selectedLine = ref({});
const stopAllEnable = ref(true);
const startAllEnable = ref(true);

const store = useGlobalStore();
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

function updateSelectedLine(line: any) {
    selectedLine.value = line;
}

function actionsButtonStatusUpdate() {
    let trueStatusCount = 0;
    let falseStatusCount = 0;
    lines.value.forEach((line) => {
        if (line.status)
            trueStatusCount++;
        else
            falseStatusCount++;
    })
    stopAllEnable.value = trueStatusCount !== 0;
    startAllEnable.value = falseStatusCount !== 0;
}

function stopLine() {
    setLineStatusToFalse(selectedLine.value.id).then((message) => {
        notifySuccess(message);
        refreshLines();
    })
}

function startLine() {
    setLineStatusToTrue(selectedLine.value.id).then((message) => {
        notifySuccess(message);
        refreshLines();
    })
}

function dryLine() {
    generateActionOnLine(selectedLine.value.id).then((message) => {
        notifySuccess(message);
        document.dispatchEvent(new Event('refresh-actions'));
    })
}

function stopAllLines() {
    setAllLinesStatusToFalse().then(() => {
        notifySuccess("Toutes les lignes ont été arrêtées !");
        refreshLines();
    })
}

function startAllLines() {
    setAllLinesStatusToTrue().then(() => {
        notifySuccess("Toutes les lignes ont été démarrées !");
        refreshLines();
    })
}

function refreshLines() {
    return gardenLinesListFromDevice(store.selectedDevice.idMac).then(() => loadLines())
}

function dryAllLines() {
    generateActionsOnAllLines().then((response) => {
        notifySuccess(response);
        document.dispatchEvent(new Event('refresh-actions'));
    }).catch((error) => notifyError(error.response.data.error));
}

watch(() => store.selectedDevice, () => {
    refreshLines();
})

watch(() => store.gardenLines, () => {
    loadLines();
})


function loadLines() {
    loadGardenLinesList().then((linesFound) => {
        lines.value = linesFound;
        if (linesFound.length > 0)
            selectedLine.value = linesFound[0];
        actionsButtonStatusUpdate();
    })
}


onMounted(() => {
    setTimeout(() => {
        loadLines();
    }, 300);
})
</script>

<style lang="scss" scoped>
.actions-button {
  padding: 0.2rem;
}

.actions-button-container {
  display: flex;
  column-gap: 2rem;
  justify-content: center;
  align-items: center;
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

.lines-container {
  display: flex;
  flex-direction: row;
  column-gap: 1rem;

  .lines-badge {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
    border-radius: 50%;
    padding: 0.4rem;
    color: var(--va-text-primary);

    &--true {
      background-color: var(--va-success);
    }

    &--false {
      background-color: var(--va-danger);
    }

    &.selected {
      border: 0.2rem solid var(--va-background-element);
    }

    &:hover {
      cursor: pointer;
    }
  }
}

.lines-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  column-gap: 4rem;
}
</style>