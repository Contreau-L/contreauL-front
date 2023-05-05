import axios from "axios";
import {getDeviceContextUrl, getDeviceLastActionsUrl, getDeviceLastLogsUrl} from "./url";
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
