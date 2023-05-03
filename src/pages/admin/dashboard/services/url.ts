import {useGlobalStore} from "../../../../stores/global-store";

export function getDeviceContextUrl(deviceId: string) {
    return useGlobalStore().api_url + "/devices/" + deviceId + "/context";
}

export function getDeviceLastLogsUrl(deviceId: string) {
    return useGlobalStore().api_url + "/logs/" + deviceId + "/last";
}

export function getDeviceLastActionsUrl(deviceId: string) {
    return useGlobalStore().api_url + "/actions/" + deviceId + "/last";
}

export function getGardenLinesStatusUpdateUrl(lineId: string, status: string) {
    let params = new URLSearchParams({
        status: status
    })
    return useGlobalStore().api_url + "/lines/" + lineId + "/status?" + params;
}

export function getActionGenerationUrl(deviceId: string, lineId: string) {
    let params = new URLSearchParams({
        line: lineId
    })
    return useGlobalStore().api_url + "/actions/" + deviceId + "?" + params;
}

export function getAllActionGenerationUrl(deviceId: string) {
    return useGlobalStore().api_url + "/actions/" + deviceId;
}