import { Redirect, Route, Switch } from 'react-router-dom'

import { lazy } from 'react'

const CategoriesPage = () => {
  const CategoryPage = lazy(() => import('./category'))
  const DataTypePage = lazy(() => import('./datatype'))
  const ProviderTypePage = lazy(() => import('./providerType'))
  const TagPage = lazy(() => import('./tag'))
  const LicensePage = lazy(() => import('./license'))
  const OrganizationPage = lazy(() => import('./organization'))
  const DatasetPage = lazy(() => import('./dataset'))

  return (
    <Switch>
      <Route path='/categories/dataset' component={DatasetPage}></Route>
      <Route path='/categories/data-type' component={DataTypePage}></Route>
      <Route path='/categories/fields' component={CategoryPage}></Route>
      <Route path='/categories/provider-type' component={ProviderTypePage}></Route>
      <Route path='/categories/tag' component={TagPage}></Route>
      <Route path='/categories/license' component={LicensePage}></Route>
      <Route path='/categories/organization' component={OrganizationPage}></Route>
      <Redirect from='/categories' exact={true} to='/categories/fields' />
      <Redirect to='/categories/fields' />
    </Switch>
  )
}

export default CategoriesPage
