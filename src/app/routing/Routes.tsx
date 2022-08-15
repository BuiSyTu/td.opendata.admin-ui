import { FC } from 'react'
import { Switch, Route } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import { PrivateRoutes } from './PrivateRoutes'
import { Logout } from '../modules/auth'
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import { MasterInit } from '../../_metronic/layout/MasterInit'

const Routes: FC = () => {
  return (
    <>
      <Switch>
        <Route path='/error' component={ErrorsPage} />
        <Route path='/logout' component={Logout} />

        <>
          <MasterLayout>
            <PrivateRoutes />
          </MasterLayout>
        </>
      </Switch>
      <MasterInit />
    </>
  )
}

export { Routes }
