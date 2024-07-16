import { element, exact } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Safety'))
const Itemwisetool=React.lazy(()=>import('./views/itemwisetools/Itemwisetools'))
const itemwiseppe =React.lazy(()=>import('./views/itemwiseppe/Itemwiseppe'))
const itemwisedress=React.lazy(()=>import('./views/itemwisedress/Itemwisedress'))
const employeewiseserach=React.lazy(()=>import('./views/employeewisesearch/Employeewisesearch'))
const aftersearchbody=React.lazy(()=>import('./views/aftersearchbody/Afterseachbody'))
const organizationalreportbody=React.lazy(()=>import('./views/organizationalreportbody/Organizationalreportbody'))
const AfterSearchBody = React.lazy(() => import('./views/aftersearchbody/Afterseachbody'))
const upcoming15daysbody=React.lazy(()=>import('./views/upcoming15daysbody/Upcoming15daysbody'))
const upcoming30daysbody=React.lazy(()=>import('./views/upcoming30daysbody/Upcoming30daysbody'))
const upcoming45daysbody=React.lazy(()=>import('./views/upcoming45daysbody/Upcoming45daysbody'))
const trainingdetails=React.lazy(()=>import('./views/trainingdetails/Trainingdetails'))
const trainerdetails=React.lazy(()=>import('./views/trainerdetails/Trainerdetails'))
const empregister=React.lazy(()=>import('./views/employeeregisterform/EmployeeRegister'))
const newissuance=React.lazy(()=>import('./views/newissuance/Newissuance'))
const safetytraining=React.lazy(()=>import('./views/safetytraining/Safetytraining'))
const accidentform=React.lazy(()=>import('./views/accidentform/Accident'))
// const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// // Base
// const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
// const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
// const Cards = React.lazy(() => import('./views/base/cards/Cards'))
// const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
// const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
// const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
// const Navs = React.lazy(() => import('./views/base/navs/Navs'))
// const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
// const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
// const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
// const Progress = React.lazy(() => import('./views/base/progress/Progress'))
// const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
// const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
// const Tables = React.lazy(() => import('./views/base/tables/Tables'))
// const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// // Buttons
// const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
// const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
// const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

// //Forms
// const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
// const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
// const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
// const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
// const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
// const Range = React.lazy(() => import('./views/forms/range/Range'))
// const Select = React.lazy(() => import('./views/forms/select/Select'))
// const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

// const Charts = React.lazy(() => import('./views/charts/Charts'))

// // Icons
// const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
// const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
// const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// // Notifications
// const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
// const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
// const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
// const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

// const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  {path: '/itemwisetools',name:'Itemwisetool',element:Itemwisetool},
  {path:'/itemwiseppe',name:'itemwiseppe',element:itemwiseppe},
  {path:'/itemwisedress',name:'itemwisedress',element:itemwisedress},
  {path:'/employeewisesearch',name:'employeewiseserach',element:employeewiseserach},
  {path:'/aftersearchbody',name:'aftersearchbody',element:aftersearchbody},
  {path:'/organizationalreportbody',name:'organizationalreportbody',element:organizationalreportbody},
  { path:"/aftersearch", name:'AfterSearchBody',element:AfterSearchBody},
  {path:"/upcoming15daysbody",name:'upcoming15daysbody',element:upcoming15daysbody},
  {path:"/upcoming30daysbody",name:'upcoming30daysbody',element:upcoming30daysbody},
  {path:"/upcoming45daysbody",name:'upcoming45daysbody',element:upcoming45daysbody},
  {path:"/trainingdetails",name:'trainingdetails',element:trainingdetails},
  {path:"/trainerdetails",name:'trainerdetails',element:trainerdetails},
  {path:"/empregister",name:'empregister',element:empregister},
  {path:"/newissuance",name:'newissuance',element:newissuance},
  {path:"/safetytraining",name:'safetytraining',element:safetytraining},
  {path:"/safetytrainingsafety",name:'safetytrainingsafety',element:safetytraining},
  {path:"/accidentform/",name:'accidentform',element:accidentform},
  // { path: '/theme/typography', name: 'Typography', element: Typography },
  // { path: '/base', name: 'Base', element: Cards, exact: true },
  // { path: '/base/accordion', name: 'Accordion', element: Accordion },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  // { path: '/base/cards', name: 'Cards', element: Cards },
  // { path: '/base/carousels', name: 'Carousel', element: Carousels },
  // { path: '/base/collapses', name: 'Collapse', element: Collapses },
  // { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  // { path: '/base/navs', name: 'Navs', element: Navs },
  // { path: '/base/paginations', name: 'Paginations', element: Paginations },
  // { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  // { path: '/base/popovers', name: 'Popovers', element: Popovers },
  // { path: '/base/progress', name: 'Progress', element: Progress },
  // { path: '/base/spinners', name: 'Spinners', element: Spinners },
  // { path: '/base/tabs', name: 'Tabs', element: Tabs },
  // { path: '/base/tables', name: 'Tables', element: Tables },
  // { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  // { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  // { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  // { path: '/charts', name: 'Charts', element: Charts },
  // { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  // { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  // { path: '/forms/select', name: 'Select', element: Select },
  // { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  // { path: '/forms/range', name: 'Range', element: Range },
  // { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  // { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  // { path: '/forms/layout', name: 'Layout', element: Layout },
  // { path: '/forms/validation', name: 'Validation', element: Validation },
  // { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', element: Flags },
  // { path: '/icons/brands', name: 'Brands', element: Brands },
  // { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  // { path: '/notifications/badges', name: 'Badges', element: Badges },
  // { path: '/notifications/modals', name: 'Modals', element: Modals },
  // { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  // { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes

// routes.js

// import React from 'react';
// const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
// const Colors = React.lazy(() => import('./views/theme/colors/Safety'));
// const Itemwisetool = React.lazy(() => import('./views/itemwisetools/Itemwisetools'));
// const Itemwiseppe = React.lazy(() => import('./views/itemwiseppe/Itemwiseppe'));
// const Itemwisedress = React.lazy(() => import('./views/itemwisedress/Itemwisedress'));
// const Employeewisesearch = React.lazy(() => import('./views/employeewisesearch/Employeewisesearch'));
// const AfterSearchBody = React.lazy(() => import('./views/aftersearchbody/Afterseachbody'));
// const Organizationalreportbody = React.lazy(() => import('./views/organizationalreportbody/Organizationalreportbody'));
// const Upcoming15daysbody = React.lazy(() => import('./views/upcoming15daysbody/Upcoming15daysbody'));
// const Upcoming30daysbody = React.lazy(() => import('./views/upcoming30daysbody/Upcoming30daysbody'));
// const Upcoming45daysbody = React.lazy(() => import('./views/upcoming45daysbody/Upcoming45daysbody'));
// const Trainingdetails = React.lazy(() => import('./views/trainingdetails/Trainingdetails'));
// const Trainerdetails = React.lazy(() => import('./views/trainerdetails/Trainerdetails'));
// const EmployeeRegister = React.lazy(() => import('./views/employeeregisterform/EmployeeRegister'));
// const Newissuance = React.lazy(() => import('./views/newissuance/Newissuance'));
// const Safetytraining = React.lazy(() => import('./views/safetytraining/Safetytraining'));
// const Accident = React.lazy(() => import('./views/accidentform/Accident'));

// const routes = [
//   { path: '/', exact: true, name: 'Home' },
//   { path: '/dashboard', name: 'Dashboard', element: <Dashboard /> },
//   { path: '/theme/colors', name: 'Colors', element: <Colors /> },
//   { path: '/itemwisetools', name: 'Itemwisetool', element: <Itemwisetool /> },
//   { path: '/itemwiseppe', name: 'itemwiseppe', element: <Itemwiseppe /> },
//   { path: '/itemwisedress', name: 'itemwisedress', element: <Itemwisedress /> },
//   { path: '/employeewisesearch', name: 'employeewiseserach', element: <Employeewisesearch /> },
//   { path: '/aftersearchbody', name: 'aftersearchbody', element: <AfterSearchBody /> },
//   { path: '/organizationalreportbody', name: 'organizationalreportbody', element: <Organizationalreportbody /> },
//   { path: '/upcoming15daysbody', name: 'upcoming15daysbody', element: <Upcoming15daysbody /> },
//   { path: '/upcoming30daysbody', name: 'upcoming30daysbody', element: <Upcoming30daysbody /> },
//   { path: '/upcoming45daysbody', name: 'upcoming45daysbody', element: <Upcoming45daysbody /> },
//   { path: '/trainingdetails', name: 'trainingdetails', element: <Trainingdetails /> },
//   { path: '/trainerdetails', name: 'trainerdetails', element: <Trainerdetails /> },
//   { path: '/empregister', name: 'empregister', element: <EmployeeRegister /> },
//   { path: '/newissuance', name: 'newissuance', element: <Newissuance /> },
//   { path: '/safetytraining', name: 'safetytraining', element: <Safetytraining /> },
//   { path: '/safetytrainingsafety', name: 'safetytrainingsafety', element: <Safetytraining /> },
//   { path: '/accidentform', name: 'accidentform', element: <Accident /> },
// ];

// export default routes;
