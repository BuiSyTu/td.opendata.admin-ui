import { Route, Switch } from 'react-router-dom'

import { lazy } from 'react'

const DataCategoriesPage = () => {
    const TrinhDoHocVanPage = lazy(() => import('./trinh-do-hoc-van'))

    return (
        <Switch>
            <Route path='/common-categories/trinh-do-hoc-van' component={TrinhDoHocVanPage}></Route>
        </Switch>
    )
}

export default DataCategoriesPage
