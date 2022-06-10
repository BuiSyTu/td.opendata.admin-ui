import styles from './CardColumnChart.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface CardColumnChartProps {
    title: string,
    data: any,
    maxValue: any,
}

const CardColumnChart: React.FC<CardColumnChartProps> = ({ title, data, maxValue }) => {
    return (
        <div className={cx('card shadow-sm min-h-100', 'wrapper')}>
            <div className="card-header px-4">
                <div className="card-title text-center">Dữ liệu mở theo lĩnh vực</div>
            </div>
            <div className="card-body p-4 scroll mh-350px">
                {data.map((i: any, index: any) => (
                    <div className="row align-items-center mb-2" key={index}>
                        <div className="col-xl-5 col-xxl-4">
                            <span className={cx('text-gray-800 d-block fs-6 text-xl-end', 'item-group-name')}>{i.name}</span>
                        </div>
                        <div className="col-xl-7 col-xxl-8 d-flex align-items-center">
                            <div className="progress h-15px w-100 me-2 bg-secondary" style={{ borderRadius: '4px' }}>
                                <div
                                    className={cx('progress-bar', 'bg-danger')}
                                    role="progressbar"
                                    style={{ width: (i.count / maxValue) * 100 + '%' }}
                                    aria-valuenow={i.count}
                                    aria-valuemin={0}
                                    aria-valuemax={maxValue}>
                                </div>
                            </div>
                            <span className="text-gray-800 fs-6 fs-xxl-5 min-w-30px text-center">{i.count}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardColumnChart