import { Route, Switch } from 'react-router-dom'

import { lazy } from 'react'

const CategoriesPage = () => {
  const WebApiListPage = lazy(() => import('./webapi/list'))
  const WebApiStatisticPage = lazy(() => import('./webapi/statistic'))
  const WebApiSyncHistoryPage = lazy(() => import('./webapi/sync-history'))

  const ExcelListPage = lazy(() => import('./excel/list'))
  const ExcelStatisticPage = lazy(() => import('./excel/statistic'))
  const ExcelSyncHistoryPage = lazy(() => import('./excel/sync-history'))

  const CollectListPage = lazy(() => import('./collect/list'))
  const CollectByCategoryPage = lazy(() => import('./collect/by-category'))
  const CollectByProviderTypePage = lazy(() => import('./collect/by-provider-type'))
  const CollectByStatusPage = lazy(() => import('./collect/by-status'))
  const CollectByOrganizationPage = lazy(() => import('./collect/by-organization'))

  const ApprovedPage = lazy(() => import('./approve/approved'))
  const PendingPage = lazy(() => import('./approve/pending'))
  const RejectedPage = lazy(() => import('./approve/rejected'))
  const ApproveStatisticByCategoryPage = lazy(() => import('./approve/statistic-by-category'))
  const ApproveStatisticByDataTypePage = lazy(() => import('./approve/statistic-by-data-type'))
  const ApproveStatisticByOrganizationPage = lazy(() => import('./approve/statistic-by-organization'))
  const ApproveStatisticByProviderTypePage = lazy(() => import('./approve/statistic-by-provider-type'))
  const ApproveStatisticPage = lazy(() => import('./approve/statistic'))

  return (
    <Switch>
      <Route path='/dataset/webapi/list' component={WebApiListPage}></Route>
      <Route path='/dataset/webapi/statistic' component={WebApiStatisticPage}></Route>
      <Route path='/dataset/webapi/sync-history' component={WebApiSyncHistoryPage}></Route>

      <Route path='/dataset/excel/list' component={ExcelListPage}></Route>
      <Route path='/dataset/excel/statistic' component={ExcelStatisticPage}></Route>
      <Route path='/dataset/excel/sync-history' component={ExcelSyncHistoryPage}></Route>

      <Route path='/dataset/collect/list' component={CollectListPage}></Route>
      <Route path='/dataset/collect/by-category' component={CollectByCategoryPage}></Route>
      <Route path='/dataset/collect/by-provider-type' component={CollectByProviderTypePage}></Route>
      <Route path='/dataset/collect/by-status' component={CollectByStatusPage}></Route>
      <Route path='/dataset/collect/by-organization' component={CollectByOrganizationPage}></Route>

      <Route path='/dataset/approve/approved' component={ApprovedPage}></Route>
      <Route path='/dataset/approve/rejected' component={RejectedPage}></Route>
      <Route path='/dataset/approve/pending' component={PendingPage}></Route>
      <Route path='/dataset/approve/statistic-by-category' component={ApproveStatisticByCategoryPage}></Route>
      <Route path='/dataset/approve/statistic-by-data-type' component={ApproveStatisticByDataTypePage}></Route>
      <Route path='/dataset/approve/statistic-by-organization' component={ApproveStatisticByOrganizationPage}></Route>
      <Route path='/dataset/approve/statistic-by-provider-type' component={ApproveStatisticByProviderTypePage}></Route>
      <Route path='/dataset/approve/statistic' component={ApproveStatisticPage}></Route>
    </Switch>
  )
}

export default CategoriesPage
