<template>
    <div class="markup-tables flex xs12 lg6" v-if="actions.length > 0">
        <va-card class="flex mb-4">
            <va-card-title>Liste des dernières actions de l'appareil</va-card-title>
            <va-card-content>
                <div class="table-wrapper">
                    <table class="va-table">
                        <thead>
                        <tr>
                            <th>Ligne</th>
                            <th>Type</th>
                            <th>Statut</th>
                            <th>Demandé à</th>
                            <th>Déroulé à</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(action, index) in actions" :key="action.id">
                            <td>{{ action.gardenLine }}</td>
                            <td>{{ action.type }}</td>
                            <td>
                                <va-badge :text="action.status" :color="getStatusColor(action.status)" />
                            </td>
                            <td>{{new Date(action.requestedAt).toLocaleString()}}</td>
                            <td>{{ action.occuredAt ? new Date(action.occuredAt).toLocaleString() : 'En attente'}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </va-card-content>
        </va-card>
    </div>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import {onMounted, ref, watch} from "vue";
import {deviceLastActions, deviceLastLogs} from "./services/DashboardServices";
import {useGlobalStore} from "../../../stores/global-store";

const {t} = useI18n()

const actions = ref([]);

function getStatusColor(status: string) {
    if (status === 'DONE') {
        return 'success'
    }

    if (status === 'WAITING') {
        return 'warning'
    }

    return 'danger'
}

const store = useGlobalStore();

watch(() => store.selectedDevice, () => {
    loadLastActions();
})

document.addEventListener('refresh-actions', () => {
    loadLastActions();
})

function loadLastActions() {
    deviceLastActions().then((response) => {
        actions.value = response;
    })
}

onMounted(() => {
    setTimeout(() => {
        loadLastActions();
    }, 200)
})
</script>

<style lang="scss">
.markup-tables {
  .table-wrapper {
    overflow: auto;
  }

  .va-table {
    width: 100%;
  }
}
</style>
