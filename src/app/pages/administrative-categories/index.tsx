import { Route, Switch } from 'react-router-dom'

import { lazy } from 'react'

const AdministrativeCategoriesPage = () => {
  const DataSourcePage = lazy(() => import('./dataSource'))
  const DocumentTypePage = lazy(() => import('./documentType'))
  const MiningSourcePage = lazy(() => import('./miningSource'))

  return (
    <Switch>
      <Route path='/administrative-categories/data-source' component={DataSourcePage}></Route>
      <Route path='/administrative-categories/document-type' component={DocumentTypePage}></Route>
      <Route path='/administrative-categories/mining-source' component={MiningSourcePage}></Route>
    </Switch>
  )
}

export default AdministrativeCategoriesPage
