<template>
    <div class="markup-tables flex xs12 lg6" v-if="logs.length > 0">
        <va-card class="flex mb-4">
            <va-card-title>Liste des dernières logs de l'appareil</va-card-title>
            <va-card-content>
                <div class="table-wrapper">
                    <table class="va-table">
                        <thead>
                        <tr>
                            <th>Niveau</th>
                            <th>Temperature</th>
                            <th>Ph</th>
                            <th>Déroulé à</th>
                            <th>Ajouté à</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="(log) in logs" :key="log.id">
                            <td>{{ log.waterLevel }}</td>
                            <td>{{ log.waterTemperature }}</td>
                            <td>{{ log.ph }}</td>
                            <td>{{ new Date(log.occuredAt).toLocaleString() }}</td>
                            <td>{{new Date(log.addedAt).toLocaleString()}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </va-card-content>
        </va-card>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {deviceLastLogs} from "./services/DashboardServices";
import {useGlobalStore} from "../../../stores/global-store";

const logs = ref([]);

const store = useGlobalStore();

watch(() => store.selectedDevice, () => {
    loadLastLogs();
})

function loadLastLogs(){
    deviceLastLogs().then((response) => {
        logs.value = response.slice(0, 10);
    })
}

onMounted(() => {
    setTimeout(() => {
        loadLastLogs();
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
