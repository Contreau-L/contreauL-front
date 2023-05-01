import {useGlobalStore} from "../../../../stores/global-store";

export function getDeviceAttachmentUrl(deviceId: string, userId: string): string {
   let params = new URLSearchParams({
      user: userId
   })
   return useGlobalStore().api_url + "/devices/" + deviceId + "/attached" + "?" + params;
}
