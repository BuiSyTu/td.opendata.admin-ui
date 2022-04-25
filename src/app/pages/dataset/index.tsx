import { Route, Switch } from 'react-router-dom'

import { lazy } from 'react'

const CategoriesPage = () => {
  const WebApiPage = lazy(() => import('./webapi/list'))
  const ExcelPage = lazy(() => import('./excel'))

  return (
    <Switch>
      <Route path='/dataset/webapi' component={WebApiPage}></Route>
      <Route path='/dataset/excel' component={ExcelPage}></Route>
    </Switch>
  )
}

export default CategoriesPage
