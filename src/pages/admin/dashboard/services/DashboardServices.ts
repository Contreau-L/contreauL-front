import axios from "axios";
import {getDeviceContextUrl} from "./url";
import {useGlobalStore} from "../../../../stores/global-store";

export function deviceContext(){
    const store = useGlobalStore();
    if (store.selectedDevice.idMac)
        return axios.get(getDeviceContextUrl(store.selectedDevice.idMac)).then((response) => {
            return response.data.context;
        })

}
