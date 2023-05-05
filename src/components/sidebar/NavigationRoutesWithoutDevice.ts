export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'settings',
      displayName: 'menu.settings',
      meta: {
        icon: 'vuestic-iconset-settings',
      },
    }
  ] as INavigationRoute[],
}
