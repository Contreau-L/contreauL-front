import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      isSidebarMinimized: false,
      userName: 'Vasili S',
      token: '',
      api_url: window.API_URL ? window.API_URL : "",
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
    }
  },

  getters:  {
    isTokenAlreadySet(): boolean {
      return this.token.length > 0;
    }
  }
})
