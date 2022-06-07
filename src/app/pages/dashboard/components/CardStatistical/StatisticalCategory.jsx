import styles from './CardStatistical.module.scss'

import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'

import { datasetApi } from 'src/app/apis'

const cx = classNames.bind(styles)

const StatisticalCategory = () => {
    const [dataCategory, setDataCategory] = useState([])
    const [maxValue, setMaxValue] = useState(0)

    useEffect(() => {
        datasetApi.statsByCategory()
            .then(data => {
                if (!data) {
                    return
                }

                setDataCategory(data ?? [])
                setMaxValue(Math.max(...data.map(o => o.count), 0))
            })
    }, [])

    return (
        <div className="col-12">
            {dataCategory.map((i, index) => (
                <div className="row align-items-center mb-2" key={index}>
                    <div className="col-xl-5 col-xxl-4">
                        <span className={cx('text-gray-800 d-block fs-6 text-xl-end', 'item-group-name')}>{i.name}</span>
                    </div>
                    <div className="col-xl-7 col-xxl-8 d-flex align-items-center">
                        <div className="progress h-15px w-100 me-2 bg-secondary" style={{ borderRadius: '4px' }}>
                            <div className={cx('progress-bar', 'bg-danger')} role="progressbar" style={{ width: (i.count / maxValue) * 100 + '%' }} aria-valuenow={i.count} aria-valuemin="0" aria-valuemax={maxValue}></div>
                        </div>
                        <span className="text-gray-800 fs-6 fs-xxl-5 min-w-30px text-center">{i.count}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default StatisticalCategory