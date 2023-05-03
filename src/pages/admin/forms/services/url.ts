import {useGlobalStore} from "../../../../stores/global-store";

export function getDeviceAttachmentUrl(deviceId: string, userId: string): string {
   let params = new URLSearchParams({
      user: userId
   })
   return useGlobalStore().api_url + "/devices/" + deviceId + "/attached" + "?" + params;
}

export function getDevicesAttachedToUserUrl(userId: string) {
   let params = new URLSearchParams({
      user: userId
   })
   return useGlobalStore().api_url + "/devices/attached" + "?" + params;
}

export function getUpdateDeviceDataUrl(deviceId: string) {
   return useGlobalStore().api_url + "/devices/" + deviceId;
}

export function getGardenLinesListUrl(deviceId: string) {
   return useGlobalStore().api_url + "/lines/" + deviceId;
}

export function getUpdateGardenLineDataUrl(linesId: string) {
   return useGlobalStore().api_url + "/lines/" + linesId;
}
