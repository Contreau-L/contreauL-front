import {useGlobalStore} from "../../../../stores/global-store";

export function getUserLoginUrl(): string {
   return useGlobalStore().api_url + "/users/login"
}
