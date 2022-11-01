/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from 'react'

import { Widget } from 'src/app/models'
import { statsApi } from 'src/app/apis'

const _color = ['#1976d2', '#FF9800', '#7cb342', '#f44336', '#9C27B0', '#009688']

type Props = {
    className?: string
    title?: string
}

const Widget1: React.FC<Props> = ({ title, className }) => {
    const [data, setData] = useState<Widget | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const [status, res] = await statsApi.getWidget()

            if (status === 200) {
                setData(res.data)
            }
        }

        fetchData()
        return () => {}
    }, [])

    //GetNhacViec
    return (
        <div className={`card ${className}`}>
            {/* begin::Header */}
            <div className={`card-header border-0 `}>
                <h3 className='card-title fw-bolder text-gray-800'>{title}</h3>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            <div className='card-body p-0 d-flex flex-column'>
                <div className='card-p pt-5 bg-body flex-grow-1'>
                    {/*begin::Row*/}
                    <div className='row g-0'>
                        {/*begin::Col*/}

                        {/* begin::WebAPI */}
                        <a
                            className='col col-4 mr-8 rounded d-flex justify-content-between cursor-pointer p-2 border border-white td-dbcont-content '
                            key={Math.random().toString(36)}
                            style={{ backgroundColor: _color[0] }}
                            href=''
                        >
                            <div className='d-flex flex-grow-1 flex-column'>
                                <p
                                    className='wg-title text-truncate1 w-100 text-white text-nowrap1'
                                    title='Web API'
                                >
                                    Web API
                                </p>
                                <div className='d-flex flex-row align-items-center justify-content-between'>
                                    <span className='wg-val text-white' style={{ fontSize: 30 }}>
                                        {data?.webAPI ?? 0}
                                    </span>
                                </div>
                            </div>
                            <div
                                className='d-flex align-items-center justify-content-center rounded-circle'
                                style={{
                                    backgroundColor: 'rgba(247, 247, 247, 0.25)',
                                    width: 60,
                                    height: 60,
                                }}
                            >
                                <i className='fas fa-code fs-1 text-white'></i>
                            </div>
                        </a>
                        {/* end::WebAPI */}

                        {/* begin::Excel */}
                        <a
                            className='col col-4 mr-8 rounded d-flex justify-content-between cursor-pointer p-2 border border-white td-dbcont-content '
                            key={Math.random().toString(36)}
                            style={{ backgroundColor: _color[2] }}
                            href=''
                        >
                            <div className='d-flex flex-grow-1 flex-column'>
                                <p
                                    className='wg-title text-truncate1 w-100 text-white text-nowrap1'
                                    title='Excel'
                                >
                                    Excel
                                </p>
                                <div className='d-flex flex-row align-items-center justify-content-between'>
                                    <span className='wg-val text-white' style={{ fontSize: 30 }}>
                                        {data?.excel ?? 0}
                                    </span>
                                </div>
                            </div>
                            <div
                                className='d-flex align-items-center justify-content-center rounded-circle'
                                style={{
                                    backgroundColor: 'rgba(247, 247, 247, 0.25)',
                                    width: 60,
                                    height: 60,
                                }}
                            >
                                <i className='fas fa-file-excel fs-1 text-white'></i>
                            </div>
                        </a>
                        {/* end::Excel */}

                        {/* begin::Database */}
                        <a
                            className='col col-4 mr-8 rounded d-flex justify-content-between cursor-pointer p-2 border border-white td-dbcont-content '
                            key={Math.random().toString(36)}
                            style={{ backgroundColor: _color[1] }}
                            href=''
                        >
                            <div className='d-flex flex-grow-1 flex-column'>
                                <p
                                    className='wg-title text-truncate1 w-100 text-white text-nowrap1'
                                    title='Database'
                                >
                                    Database
                                </p>
                                <div className='d-flex flex-row align-items-center justify-content-between'>
                                    <span className='wg-val text-white' style={{ fontSize: 30 }}>
                                        {data?.database ?? 0}
                                    </span>
                                </div>
                            </div>
                            <div
                                className='d-flex align-items-center justify-content-center rounded-circle'
                                style={{
                                    backgroundColor: 'rgba(247, 247, 247, 0.25)',
                                    width: 60,
                                    height: 60,
                                }}
                            >
                                <i className='fas fa-database fs-1 text-white'></i>
                            </div>
                        </a>
                        {/* end::Database */}

                        {/*end::Col*/}
                    </div>
                    {/*end::Row*/}
                </div>
            </div>
            {/* end::Body */}
        </div>
    )
}

export default Widget1
