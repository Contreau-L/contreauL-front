import {useGlobalStore} from "../../../../stores/global-store";

export function getLastMonthLogsUrl(deviceId: string){
    return useGlobalStore().api_url + "/logs/" + deviceId + "/month";
}