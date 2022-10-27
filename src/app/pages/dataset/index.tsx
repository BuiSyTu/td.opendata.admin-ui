import { Route, Switch } from 'react-router-dom'

import { lazy } from 'react'
import { ApproveState, ViewMode } from 'src/app/models'

const DatasetOfficePage = () => {
    const DatasetListPage = lazy(() => import('./list'))
    const DatasetStatisticPage = lazy(() => import('./statistic'))
    const DatasetSyncHistoryPage = lazy(() => import('./sync-history'))
    const DatasetByCategoryPage = lazy(() => import('./by-category'))

    return (
        <Switch>
            <Route
                path='/dataset/webapi/list'
                render={() => (
                    <DatasetListPage
                        dataTypeCode='webapi'
                        isPortal={false}
                        viewModes={[ViewMode.INFO]}
                    />
                )}
            ></Route>
            <Route
                path='/dataset/webapi/config'
                render={() => (
                    <DatasetListPage
                        dataTypeCode='webapi'
                        isPortal={false}
                        viewModes={[ViewMode.CONFIG]}
                    />
                )}
            ></Route>
            <Route
                path='/dataset/webapi/statistic'
                render={() => <DatasetStatisticPage dataTypeCode='webapi' isPortal={false} />}
            ></Route>
            <Route
                path='/dataset/webapi/sync-history'
                render={() => <DatasetSyncHistoryPage dataTypeCode='webapi' isPortal={false} />}
            ></Route>
            <Route
                path='/dataset/webapi/categories/giao-duc-dao-tao'
                render={() => (
                    <DatasetByCategoryPage
                        title='Giáo dục đào tạo'
                        datasetId='6b0f0000-8df8-549b-2f17-08da63db22a5'
                    />
                )}
            />
            <Route
                path='/dataset/webapi/categories/y-te'
                render={() => (
                    <DatasetByCategoryPage
                        title='Y tế'
                        datasetId='6b0f0000-8df8-549b-4ed7-08da63dc4430'
                    />
                )}
            />
            <Route
                path='/dataset/webapi/categories/lao-dong-thuong-binh-xa-hoi'
                render={() => (
                    <DatasetByCategoryPage
                        title='Lao động thương binh xã hội'
                        datasetId='6b0f0000-8df8-549b-1c68-08da63dc90ea'
                    />
                )}
            />
            <Route
                path='/dataset/webapi/categories/cong-thuong'
                render={() => (
                    <DatasetByCategoryPage
                        title='Công thương'
                        datasetId='6b0f0000-8df8-549b-f146-08da63dcb228'
                    />
                )}
            />
            <Route
                path='/dataset/webapi/categories/nong-lam-ngu-nghiep'
                render={() => (
                    <DatasetByCategoryPage
                        title='Nông lâm ngư nghiệp'
                        datasetId='6b0f0000-8df8-549b-70d2-08da63dcbf07'
                    />
                )}
            />

            <Route
                path='/dataset/excel/list'
                render={() => (
                    <DatasetListPage
                        dataTypeCode='file'
                        isPortal={false}
                        viewModes={[ViewMode.INFO]}
                    />
                )}
            ></Route>
            <Route
                path='/dataset/excel/list'
                render={() => (
                    <DatasetListPage
                        dataTypeCode='file'
                        isPortal={false}
                        viewModes={[ViewMode.CONFIG]}
                    />
                )}
            ></Route>
            <Route
                path='/dataset/excel/statistic'
                render={() => <DatasetStatisticPage dataTypeCode='file' isPortal={false} />}
            ></Route>
            <Route
                path='/dataset/excel/sync-history'
                render={() => <DatasetSyncHistoryPage dataTypeCode='file' isPortal={false} />}
            ></Route>

            <Route
                path='/dataset/approve/approved'
                render={() => (
                    <DatasetListPage
                        approveState={ApproveState.APPROVED}
                        isPortal={false}
                        viewModes={[ViewMode.APPROVE]}
                    />
                )}
            ></Route>
            <Route
                path='/dataset/approve/rejected'
                render={() => (
                    <DatasetListPage
                        approveState={ApproveState.REJECTED}
                        isPortal={false}
                        viewModes={[ViewMode.APPROVE]}
                    />
                )}
            ></Route>
            <Route
                path='/dataset/approve/pending'
                render={() => (
                    <DatasetListPage
                        approveState={ApproveState.PENDING}
                        isPortal={false}
                        viewModes={[ViewMode.APPROVE]}
                    />
                )}
            ></Route>
        </Switch>
    )
}

export default DatasetOfficePage
