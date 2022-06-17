import { Route, Switch } from 'react-router-dom'
import { lazy } from 'react'

const ConfigPage = () => {
    const HeaderConfigPage = lazy(() => import('./header'))
    const FooterConfigPage = lazy(() => import('./footer'))
    const BannerConfigPage = lazy(() => import('./banner'))

    return (
        <Switch>
            <Route path='/configs/header' component={HeaderConfigPage}></Route>
            <Route path='/configs/footer' component={FooterConfigPage}></Route>
            <Route path='/configs/banner' component={BannerConfigPage}></Route>
        </Switch>
    )
}

export default ConfigPage
