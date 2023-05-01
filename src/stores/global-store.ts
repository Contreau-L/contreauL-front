import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      isSidebarMinimized: false,
      userName: '',
      token: '',
      api_url: window.API_URL ? window.API_URL : "",
      devices: []
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

    setDevices(devices: any) {
      this.devices = devices;
    }
  },

  getters:  {
    isTokenAlreadySet(): boolean {
      return this.token.length > 0;
    },
    getDevices(): any {
      return this.devices;
    }
  }
})
