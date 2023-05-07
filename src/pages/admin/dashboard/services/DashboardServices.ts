import axios from "axios";
import {
    getActionGenerationUrl,
    getAllActionGenerationUrl,
    getDeviceContextUrl,
    getDeviceLastActionsUrl,
    getDeviceLastLogsUrl,
    getGardenLinesStatusUpdateUrl
} from "./url";
import {useGlobalStore} from "../../../../stores/global-store";

export function deviceContext(){
    const store = useGlobalStore();
    if (store.selectedDevice.idMac)
        return axios.get(getDeviceContextUrl(store.selectedDevice.idMac)).then((response) => {
            return response.data.context;
        })
    else
        return Promise.reject({});
}

export function deviceLastLogs(){
    const store = useGlobalStore();
    if (store.selectedDevice.idMac)
        return axios.get(getDeviceLastLogsUrl(store.selectedDevice.idMac)).then((response) => {
            return response.data.logs;
        })
    else
        return Promise.reject({});
}

export function deviceLastActions(){
    const store = useGlobalStore();
    if (store.selectedDevice.idMac)
        return axios.get(getDeviceLastActionsUrl(store.selectedDevice.idMac)).then((response) => {
            return response.data.actions;
        })
    else
        return Promise.reject({});
}

export function generateActionsOnAllLines() {
    const store = useGlobalStore();
    if (store.selectedDevice.idMac)
        return axios.post(getAllActionGenerationUrl(store.selectedDevice.idMac)).then((response) => {
            return response.data.message;
        })
    else
        return Promise.reject({});
}

export function setAllLinesStatusToFalse() {
    const store = useGlobalStore();
    let promisesList: any[] = [];
    store.gardenLines.forEach((line) => {
        promisesList.push(axios.post(getGardenLinesStatusUpdateUrl(line.id, "false")))
    });
    return Promise.all(promisesList);
}

export function setAllLinesStatusToTrue() {
    const store = useGlobalStore();
    let promisesList: any[] = [];
    store.gardenLines.forEach((line) => {
        promisesList.push(axios.post(getGardenLinesStatusUpdateUrl(line.id, "true")))
    });
    return Promise.all(promisesList);
}

export function setLineStatusToTrue(lineId: string) {
        return axios.post(getGardenLinesStatusUpdateUrl(lineId, "true")).then((response) => {
            return response.data.message;
        })
}

export function setLineStatusToFalse(lineId: string) {
    return axios.post(getGardenLinesStatusUpdateUrl(lineId, "false")).then((response) => {
        return response.data.message;
    })
}

export function generateActionOnLine(lineId: string) {
    const store = useGlobalStore();
    return axios.post(getActionGenerationUrl(store.selectedDevice.idMac, lineId)).then((response) => {
        return response.data.message;
    });
}

