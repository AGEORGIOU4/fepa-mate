import React from 'react'
import { Translation } from 'react-i18next'

const Home = React.lazy(() => import('./views/_home/index'))

const routes = [
  { path: '/', exact: true, name: <Translation>{(t) => t('home')}</Translation> },

  {
    path: '/home',
    name: <Translation>{(t) => t('home')}</Translation>,
    element: Home,
  }
]

export default routes
