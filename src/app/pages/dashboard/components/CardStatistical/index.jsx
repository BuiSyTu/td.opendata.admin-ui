import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind'
import styles from './CardStatistical.module.scss'

import StatisticalOrganization from './StatisticalOrganization';
import StatisticalCategory from './StatisticalCategory';
import { toAbsoluteUrl } from 'src/_metronic/helpers'
import { statsApi } from 'src/app/apis';

const cx = classNames.bind(styles)


const CardStatistical = () => {
  const [overViewData, setOverViewData] = useState([])

  useEffect(() => {
    statsApi.getOverview()
      .then(response => {
        const data = response?.data

        if (!data) {
          return;
        }

        const template = {
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

        let result = []

        for (let prop in data) {
          result.push({
            name: template[prop].name,
            icon: template[prop].icon,
            count: data[prop],
          })
        }

        setOverViewData(result)
      })
  }, [])

  return (
    <div
      className={cx('section-statistical')}
      style={{ backgroundImage: `url(${toAbsoluteUrl('/media/images/bg-graphics.png')})` }}>
      <div className="container">
        <div className="row">
          {overViewData.map((item, index) => (
            <div className="col-lg-4 col-xl-4 mb-4 mb-xl-0 my-4" key={index}>
              <div className="card shadow-sm">
                {item.slug
                  ? (
                    <Link to={item.slug} className={cx('hover-gray')}>
                      <div className="card-body p-4">
                        <div className='d-flex align-items-center justify-content-between'>
                          <div className='d-flex align-items-start flex-column'>
                            <h4 className='text-gray-800 fw-bold fs-5'>{item.name}</h4>
                            <h3 className='m-0 text-danger fs-1'>{item.count}</h3>
                          </div>
                          <div className="statistical-thumb">
                            <img src={toAbsoluteUrl(`/media/images/${item.icon}`)} className="w-60px" alt="" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="card-body p-4">
                      <div className='d-flex align-items-center justify-content-between'>
                        <div className='d-flex align-items-start flex-column'>
                          <h4 className='text-gray-800 fw-bold fs-5'>{item.name}</h4>
                          <h3 className='m-0 text-danger fs-1'>{item.count}</h3>
                        </div>
                        <div className="statistical-thumb">
                          <img src={toAbsoluteUrl(`/media/images/${item.icon}`)} className="w-60px" alt="" />
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
        <div className="row mt-5">
          <div className="col-12 col-xl-6 mb-4 mb-xl-0">
            <div className='card shadow-sm min-h-100 card-organization'>
              <div className="card-header px-4">
                <div className="card-title text-center">Dữ liệu mở theo tổ chức</div>
              </div>
              <div className="card-body p-4 scroll mh-350px">
                <StatisticalOrganization />
              </div>
            </div>
          </div>
          <div className="col-12 col-xl-6">
            <div className='card shadow-sm min-h-100'>
              <div className="card-header px-4">
                <div className="card-title text-center">Dữ liệu mở theo lĩnh vực</div>
              </div>
              <div className="card-body p-4 scroll mh-350px">
                <StatisticalCategory />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CardStatistical
