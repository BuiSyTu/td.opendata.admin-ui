import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useIntl } from 'react-intl'

import CardStatistical from './components/CardStatistical'
import { PageTitle } from 'src/_metronic/layout/core'
import { setFirstAccess } from 'src/setup/redux/global/Slice'

const DashboardPage: FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    dispatch(setFirstAccess(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>

      <div className='row gy-5 g-xl-8'>
        <CardStatistical />
      </div>
    </>
  )
}


export default DashboardPage
