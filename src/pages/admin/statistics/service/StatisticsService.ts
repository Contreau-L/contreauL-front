import axios from "axios";
import {getLastMonthLogsUrl} from "./url";
import {useGlobalStore} from "../../../../stores/global-store";

export function lastMonthLogs() {
    const store = useGlobalStore();
    if (store.selectedDevice.idMac)
        return axios.get(getLastMonthLogsUrl(store.selectedDevice.idMac)).then((response) => {
            return response.data;
        })
}