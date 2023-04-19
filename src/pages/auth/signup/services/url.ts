import {useGlobalStore} from "../../../../stores/global-store";

export function getUserSignupUrl(): string {
  return useGlobalStore().api_url + "/users"
}
