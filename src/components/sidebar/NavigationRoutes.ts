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
      name: 'dashboard',
      displayName: 'menu.dashboard',
      meta: {
        icon: 'vuestic-iconset-dashboard',
      },
    },
    {
      name: 'statistics',
      displayName: 'menu.statistics',
      meta: {
        icon: 'vuestic-iconset-statistics',
      },
    },
    {
      name: 'settings',
      displayName: 'menu.settings',
      meta: {
        icon: 'vuestic-iconset-forms',
      },
    },
    {
      name: 'tables',
      displayName: 'menu.tables',
      meta: {
        icon: 'vuestic-iconset-tables',
      },
    }
  ] as INavigationRoute[],
}
