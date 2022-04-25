import { Redirect, Route, Switch } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import { DashboardWrapper } from 'src/app/pages/dashboard/DashboardWrapper'
import { FallbackView } from 'src/_metronic/partials'
import { MenuTestPage } from 'src/app/pages/MenuTestPage'

export function PrivateRoutes() {
  const DatasetPage = lazy(() => import('../pages/dataset'))
  const DataCategoriesPage = lazy(() => import('../pages/data-categories'))
  const AdministrativeCategoriesPage = lazy(() => import('../pages/administrative-categories'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/dataset' component={DatasetPage} />
        <Route path='/data-categories' component={DataCategoriesPage} />
        <Route path='/administrative-categories' component={AdministrativeCategoriesPage} />
        <Route path='/menu-test' component={MenuTestPage} />
        <Redirect from='/default.aspx' to='/dashboard' />
        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
