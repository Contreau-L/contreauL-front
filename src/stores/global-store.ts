import { defineStore } from 'pinia'
import {getToken, getUserId, getUsername} from "../utils/cookieManagement";

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      isSidebarMinimized: false,
      userName: '',
      token: '',
      userId: '',
      userHasNoDevice: true,
      api_url: window.API_URL ? window.API_URL : "",
      devices: [],
      selectedDevice: {},
      gardenLines: []
    }
  },

  actions: {
    toggleSidebar() {
      this.isSidebarMinimized = !this.isSidebarMinimized
    },

    setUserName(userName: string) {
      this.userName = userName
    },

    setToken(token: string): void {
      this.token = token
    },

    setUserId(id: string) {
      this.userId = id
    },

    setDevices(devices: any) {
      this.devices = devices;
    }
  },

  getters:  {
    isTokenAlreadySet(): boolean {
      return this.token.length > 0;
    },
    isUserInformationsAlreadySet(): boolean {
      if(this.token.length === 0) {
        if (getUsername() && getToken() && getUserId()) {
          this.userName = getUsername()!;
          console.log( getUsername())
          this.token = getToken()!;
          this.userId = getUserId()!;
          return true;
        }
        return false;
      }
      return true;
    },
    getDevices(): Promise<any> {
      if (this.devices.length > 0 && !this.userHasNoDevice)
        return Promise.resolve(this.devices);
      return Promise.reject();
    },
    getGardenLines(): Promise<any> {
      if (this.gardenLines.length > 0)
        return Promise.resolve(this.gardenLines);
      return Promise.reject();
    },
  }
})
