import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Tag, Typography, Popconfirm, notification } from 'antd'

import { Colors } from 'src/app/constants'
import { PageTitle } from 'src/_metronic/layout/core'
import { TableList } from 'src/app/components'
import { syncHistoryApi } from 'src/app/apis'
import { SyncHistory } from 'src/app/models'
import { RootState } from 'src/setup'
import FormModal from './FormModal'

const { Text } = Typography

interface SyncHistoryPageProps {
    dataTypeCode?: 'webapi' | 'file'
    isPortal: boolean
}

const SyncHistoryPage: React.FC<SyncHistoryPageProps> = ({ dataTypeCode, isPortal }) => {
    const userInfo = useSelector((state: RootState) => state.global.userInfo)

    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(true)
    const [dataTable, setDataTable] = useState([])
    const [size, setSize] = useState(10)
    const [count, setCount] = useState(0)
    const [offset, setOffset] = useState(0)

    const [modalVisible, setModalVisible] = useState(false)
    const [modalId, setModalId] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                var res = await syncHistoryApi.getAll({
                    dataTypeCode,
                    isPortal,
                    ...(!isPortal && { officeCode: userInfo?.Info?.UserOffice?.GroupCode ?? '' }),
                })
                setDataTable(res?.data ?? [])
                setCount(res?.totalCount ?? 0)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
            setUpdate(false)
        }
        if (update) {
            fetchData()
        }
        return () => {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [update])

    useEffect(() => {
        setUpdate(true)
        return () => {}
    }, [offset, size])

    const columns = [
        {
            title: 'STT',
            dataIndex: '',
            key: '',
            align: 'center',
            render: (text: unknown, record: unknown, index: any) => {
                return (
                    <Text
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {index + 1}
                    </Text>
                )
            },
            width: '5%',
        },
        {
            title: 'Id',
            dataIndex: '',
            key: '',
            align: 'center',
            render: (text: any, record: SyncHistory, index: any) => {
                return record?.dataset?.id ?? ''
            },
            width: '20%',
        },
        {
            title: 'Tên',
            dataIndex: '',
            key: '',
            align: 'center',
            render: (text: any, record: SyncHistory, index: any) => {
                return record?.dataset?.name ?? ''
            },
            width: '20%',
        },
        {
            title: 'Trạng thái',
            dataIndex: '',
            key: '',
            align: 'center',
            render: (text: any, record: SyncHistory, index: any) => {
                return record?.dataset?.isSynced ? (
                    <Tag color={Colors.success}>Đã đồng bộ</Tag>
                ) : (
                    <Tag color={Colors.danger}>Đồng bộ lỗi</Tag>
                )
            },
            width: '15%',
        },
        {
            title: 'Thời gian',
            dataIndex: '',
            key: '',
            align: 'center',
            render: (text: any, record: SyncHistory, index: any) => {
                return record?.syncTime ?? ''
            },
            width: '15%',
        },
        {
            title: 'Thao tác',
            width: '10%',
            dataIndex: '',
            key: '',
            align: 'center',
            render: (text: any, record: any) => (
                <div>
                    <button
                        className='btn btn-light-success m-btn m-btn--icon btn-sm m-btn--icon-only'
                        data-toggle='m-tooltip'
                        title='Xem'
                        onClick={() => handleView(record.id)}
                    >
                        <i className='la la-file-text-o' style={{ marginLeft: -7 }}></i>
                    </button>
                    <Popconfirm
                        title='Xóa dữ liệu？'
                        okText='Ok'
                        cancelText='Hủy'
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <button
                            style={{ marginLeft: 10 }}
                            className='btn btn-light-danger m-btn m-btn--icon btn-sm m-btn--icon-only'
                            data-toggle='m-tooltip'
                            title='Xóa'
                        >
                            <i className='la la-trash' style={{ marginLeft: -7 }}></i>
                        </button>
                    </Popconfirm>
                </div>
            ),
        },
    ]

    const handleDelete = async (id: string) => {
        var res = await syncHistoryApi.delete(id)
        if (res) {
            notification.success({
                message: 'Xóa thành công!',
                duration: 1,
                placement: 'bottomRight',
            })
            setUpdate(true)
        } else {
            notification.error({
                message: `Thất bại!`,
                description: 'Xóa không thành công.',
            })
        }
    }

    const handleView = (id: string) => {
        setModalId(id)
        setModalVisible(true)
    }

    return (
        <div>
            <PageTitle breadcrumbs={[]}>Lịch sử đồng bộ</PageTitle>
            <div className='card mb-5 mb-xl-12 p-10'>
                <TableList
                    dataTable={dataTable}
                    columns={columns}
                    isPagination={true}
                    size={size}
                    count={count}
                    setOffset={setOffset}
                    setSize={setSize}
                    loading={loading}
                />
            </div>

            <FormModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                modalId={modalId}
                setModalId={setModalId}
            />
        </div>
    )
}

export default SyncHistoryPage
