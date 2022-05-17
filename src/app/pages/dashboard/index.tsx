/* eslint-disable jsx-a11y/anchor-is-valid */

import { FC } from 'react'
import { PageTitle } from 'src/_metronic/layout/core'
import Widget1 from './components/Widget1'
import { useIntl } from 'react-intl'

const DashboardPage: FC = () => {
  const intl = useIntl();

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>

      {/* begin::Row */}
      <div className='row gy-5 g-xl-8'>
        {/* <div className='col-xxl-6'>
          <MixedWidget2
            className='card-xl-stretch mb-xl-8'
            chartColor='danger'
            chartHeight='200px'
            strokeColor='#cb1e46'
          />
        </div> */}
        <div className='col-xxl-12'>
          <Widget1
            title='Thống kê'
            className='card-xl-stretch mb-xl-8'
          />
        </div>
      </div>
      {/* end::Row */}
    </>
  )
}


export default DashboardPage
