import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilHome
} from '@coreui/icons'
import { CNavItem } from '@coreui/react-pro'
import { Translation } from 'react-i18next'

const _nav = [
  {
    component: CNavItem,
    name: <Translation>{(t) => t('home')}</Translation>,
    to: '/home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  }
]

export default _nav
