import { FC, useState, useEffect } from 'react'
import { useIntl } from 'react-intl'

import { PageTitle } from 'src/_metronic/layout/core'
import CardPieChart from './components/CardPieChart';
import CardColumnChart from './components/CardColumnChart';
import WidgetStatistic from './components/WidgetStatistic';
import { datasetApi, statsApi } from 'src/app/apis';

const DashboardPage: FC = () => {
  const intl = useIntl();

  const [overViewData, setOverViewData] = useState<any>([])
  const [dataByOrganization, setDataByOrganization] = useState([])
  const [dataByCategory, setDataByCategory] = useState([])
  const [maxValueCategory, setMaxValueCategory] = useState(0)

  useEffect(() => {
    const fetchOverViewData = async () => {
      const responseOverView = await statsApi.getOverview()

      const data = responseOverView?.data
      if (!data) {
        return;
      }

      const template: any = {
        dataset: {
          name: 'Dữ liệu',
          icon: 'statistical (3).png',
        },
        organization: {
          name: 'Tổ chức',
          icon: 'statistical (2).png',
        },
        category: {
          name: 'Lĩnh vực',
          icon: 'statistical (1).png',
        },
        dataType: {
          name: 'Loại dữ liệu',
          icon: 'statistical (4).png',
        },
        providerType: {
          name: 'Hình thức cung cấp',
          icon: 'statistical (5).png',
        },
        view: {
          name: 'Tổng lượt xem',
          icon: 'statistical (6).png',
        },
      }

      let result: any = []

      for (let prop in data) {
        if (template[prop] && data[prop]) {
          result.push({
            name: template[prop]?.name ?? '',
            icon: template[prop]?.icon ?? '',
            count: data[prop] ?? 0,
          })
        }
      }

      setOverViewData(result)
    }

    const fetchDataByOrganization = async () => {
      const data = await datasetApi.statsByCategory()
      if (!data) {
        return
      }

      setDataByCategory(data ?? [])
      setMaxValueCategory(Math.max(...data.map((o: any) => o.count), 0))
    }

    const fetchDataByCategory = async () => {
      const data = await datasetApi.statsByOrganization()
      if (!data) {
        return
      }

      const mapData = data.map((x: any) => ({
        name: x.name,
        y: x.count,
      }))

      setDataByOrganization(mapData ?? [])
    }

    fetchOverViewData()
    fetchDataByOrganization()
    fetchDataByCategory()
  }, [])

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>

      <div className="row">
        {overViewData.map((item: any, index: any) => (
          <div className="col-lg-4 col-xl-4 mb-4 mb-xl-0 my-4" key={index}>
            <WidgetStatistic
              data={item}
            />
          </div>
        ))}
      </div>
      <div className="row mt-5">
        <div className="col-12 col-xl-6 mb-4 mb-xl-0">
          <CardPieChart
            data={dataByOrganization}
            title='Dữ liệu mở theo tổ chức'
          />
        </div>
        <div className="col-12 col-xl-6">
          <CardColumnChart
            data={dataByCategory}
            maxValue={maxValueCategory}
            title='Dữ liệu mở theo lĩnh vực'
          />
        </div>
      </div>
    </>
  )
}


export default DashboardPage
