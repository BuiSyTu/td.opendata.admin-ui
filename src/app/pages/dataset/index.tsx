import { Route, Switch } from 'react-router-dom'

import { lazy } from 'react'

const DatasetOfficePage = () => {
  const WebApiListPage = lazy(() => import('./webapi/list'))
  const WebApiStatisticPage = lazy(() => import('./webapi/statistic'))
  const WebApiSyncHistoryPage = lazy(() => import('./webapi/sync-history'))

  const ExcelListPage = lazy(() => import('./excel/list'))
  const ExcelStatisticPage = lazy(() => import('./excel/statistic'))
  const ExcelSyncHistoryPage = lazy(() => import('./excel/sync-history'))

  const ApprovedPage = lazy(() => import('./approve/approved'))
  const PendingPage = lazy(() => import('./approve/pending'))
  const RejectedPage = lazy(() => import('./approve/rejected'))

  return (
    <Switch>
      <Route path='/dataset/webapi/list' component={WebApiListPage}></Route>
      <Route path='/dataset/webapi/statistic' component={WebApiStatisticPage}></Route>
      <Route path='/dataset/webapi/sync-history' component={WebApiSyncHistoryPage}></Route>

      <Route path='/dataset/excel/list' component={ExcelListPage}></Route>
      <Route path='/dataset/excel/statistic' component={ExcelStatisticPage}></Route>
      <Route path='/dataset/excel/sync-history' component={ExcelSyncHistoryPage}></Route>

      <Route path='/dataset/approve/approved' component={ApprovedPage}></Route>
      <Route path='/dataset/approve/rejected' component={RejectedPage}></Route>
      <Route path='/dataset/approve/pending' component={PendingPage}></Route>
    </Switch>
  )
}

export default DatasetOfficePage
