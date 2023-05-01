import axios from "axios";
import {getDeviceAttachmentUrl} from "./url";

export function deviceAttachmentToUser(deviceId: string, userId: string) {
    return axios.post(getDeviceAttachmentUrl(deviceId, userId)).then((response) => {
        return response.data.message;
    })
}