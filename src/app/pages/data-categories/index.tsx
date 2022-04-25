import { Redirect, Route, Switch } from 'react-router-dom'

import { lazy } from 'react'

const DataCategoriesPage = () => {
  const CategoryPage = lazy(() => import('./category'))
  const DataTypePage = lazy(() => import('./datatype'))
  const ProviderTypePage = lazy(() => import('./providerType'))
  const TagPage = lazy(() => import('./tag'))
  const LicensePage = lazy(() => import('./license'))
  const OrganizationPage = lazy(() => import('./organization'))
  const DatasetPage = lazy(() => import('./dataset'))

  return (
    <Switch>
      <Route path='/data-categories/dataset' component={DatasetPage}></Route>
      <Route path='/data-categories/data-type' component={DataTypePage}></Route>
      <Route path='/data-categories/fields' component={CategoryPage}></Route>
      <Route path='/data-categories/provider-type' component={ProviderTypePage}></Route>
      <Route path='/data-categories/tag' component={TagPage}></Route>
      <Route path='/data-categories/license' component={LicensePage}></Route>
      <Route path='/data-categories/organization' component={OrganizationPage}></Route>
      <Redirect from='/data-categories' exact={true} to='/data-categories/fields' />
      <Redirect to='/data-categories/fields' />
    </Switch>
  )
}

export default DataCategoriesPage
