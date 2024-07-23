import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav2 = [
  {
    component: CNavItem,
    name: 'Ems',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
 
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Upcoming Issuance',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '15 days',
        to: '/upcoming15daysbody',
      },
      {
        component: CNavItem,
        name: '30 days',
        to: '/upcoming30daysbody',
      },
      {
        component: CNavItem,
        name: '45 days',
        to: '/upcoming45daysbody',
      },
     
    ],
  },
  {
    component: CNavGroup,
    name: 'Reports',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: 'Item Wise',
        to: '/buttons/buttons',
        icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
        items:[
          {
              component: CNavItem,
              name: 'Tools',
              to: '/itemwisetools',
          },
          {
            component: CNavItem,
            name: 'PPE',
            to: '/itemwiseppe',
        },
        {
          component: CNavItem,
          name: 'Dress',
          to: '/itemwisedress',
      }
        ]
      },
      {
        component: CNavItem,
        name: 'Employee Wise',
        to: '/employeewisesearch',
      },
      {
        component: CNavItem,
        name: 'Organization Wise',
        to: '/organizationalreportbody',
      },
    ],
  },

 ]

export default _nav2




