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

  const ByCategoryPage = lazy(() => import('./by-category'))

  return (
    <Switch>
      <Route path='/dataset/webapi/list' component={WebApiListPage}></Route>
      <Route path='/dataset/webapi/statistic' component={WebApiStatisticPage}></Route>
      <Route path='/dataset/webapi/sync-history' component={WebApiSyncHistoryPage}></Route>
      <Route path='/dataset/webapi/categories/giao-duc-dao-tao' render={() => (
        <ByCategoryPage title='Giáo dục đào tạo' datasetId='6b0f0000-8df8-549b-2f17-08da63db22a5' />
      )} />
      <Route path='/dataset/webapi/categories/y-te' render={() => (
        <ByCategoryPage title='Y tế' datasetId='6b0f0000-8df8-549b-4ed7-08da63dc4430' />
      )} />
      <Route path='/dataset/webapi/categories/lao-dong-thuong-binh-xa-hoi' render={() => (
        <ByCategoryPage title='Lao động thương binh xã hội' datasetId='6b0f0000-8df8-549b-1c68-08da63dc90ea' />
      )} />
      <Route path='/dataset/webapi/categories/cong-thuong' render={() => (
        <ByCategoryPage title='Công thương' datasetId='6b0f0000-8df8-549b-f146-08da63dcb228' />
      )} />
      <Route path='/dataset/webapi/categories/nong-lam-ngu-nghiep' render={() => (
        <ByCategoryPage title='Nông lâm ngư nghiệp' datasetId='6b0f0000-8df8-549b-70d2-08da63dcbf07' />
      )} />

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
