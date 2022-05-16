import { Redirect, Route, Switch } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import { FallbackView } from 'src/_metronic/partials'

export function PrivateRoutes() {
  const DashboardPage = lazy(() => import('src/app/pages/dashboard'))
  const DatasetPage = lazy(() => import('src/app/pages/dataset'))
  const DataCategoriesPage = lazy(() => import('src/app/pages/data-categories'))
  const AdministrativeCategoriesPage = lazy(() => import('src/app/pages/administrative-categories'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardPage} />
        <Route path='/dataset' component={DatasetPage} />
        <Route path='/data-categories' component={DataCategoriesPage} />
        <Route path='/administrative-categories' component={AdministrativeCategoriesPage} />
        <Redirect from='/default.aspx' to='/dashboard' />
        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
