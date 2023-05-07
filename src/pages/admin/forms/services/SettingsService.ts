import axios from "axios";
import {
    getDeviceAttachmentUrl,
    getDevicesAttachedToUserUrl,
    getGardenLinesListUrl,
    getUpdateDeviceDataUrl, getUpdateGardenLineDataUrl
} from "./url";
import {useGlobalStore} from "../../../../stores/global-store";

export function deviceAttachmentToUser(deviceId: string, userId: string) {
    return axios.post(getDeviceAttachmentUrl(deviceId, userId)).then((response) => {
        return response.data.message;
    })
}

export function getDevicesAttachedToUser(userId: string) {
    return axios.get(getDevicesAttachedToUserUrl(userId)).then((response) => {
        return response.data.devices;
    })
}

export function loadDevicesList() {
    const store = useGlobalStore();
    return store.getDevices.then((devices) => devices).catch(() => {
        return refreshDevicesList();
    })
}

export function loadGardenLinesList() {
    const store = useGlobalStore();
    if (store.selectedDevice.idMac)
        return store.getGardenLines.then((devices) => devices).catch(() => {
            return gardenLinesListFromDevice(store.selectedDevice.idMac);
        })
    else
        Promise.reject("No device selected !");
}

export function refreshDevicesList() {
    const store = useGlobalStore();
    if (store.userId !== undefined)
        return getDevicesAttachedToUser(store.userId).then((devices) => {
            store.devices = devices;
            store.userHasNoDevice = devices.length <= 0;
            return devices;
        })
}

export function updateDeviceData(deviceId: string, name: string, insee: number) {
    return axios.patch(getUpdateDeviceDataUrl(deviceId), {
        name: name,
        insee: insee
    }).then((response) => {
        return response.data.message;
    })
}

export function updateGardenLine(lineId: string, type: string, threshold: string) {
    return axios.patch(getUpdateGardenLineDataUrl(lineId), {
        vegetable_type: type,
        humidity_threshold: parseFloat(threshold)
    }).then((response) => {
        return response.data.message;
    })
}

export function gardenLinesListFromDevice(deviceId: string) {
    const store = useGlobalStore();
    if (store.selectedDevice.idMac)
        return axios.get(getGardenLinesListUrl(deviceId)).then((response) => {
            store.gardenLines = response.data.lines;
            return response.data.lines;
        })
    else
        Promise.reject("No device selected !");
}


