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
            setLoading(true)
            const [status, res] = await syncHistoryApi.getAll({
                dataTypeCode,
                isPortal,
                ...(!isPortal && { officeCode: userInfo?.Info?.UserOffice?.GroupCode ?? '' }),
            })

            if (status === 200) {
                setDataTable(res?.data ?? [])
                setCount(res?.totalCount ?? 0)
            }
            setLoading(false)
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
            title: 'T??n',
            dataIndex: '',
            key: '',
            align: 'center',
            render: (text: any, record: SyncHistory, index: any) => {
                return record?.dataset?.name ?? ''
            },
            width: '20%',
        },
        {
            title: 'Tr???ng th??i',
            dataIndex: '',
            key: '',
            align: 'center',
            render: (text: any, record: SyncHistory, index: any) => {
                return record?.dataset?.isSynced ? (
                    <Tag color={Colors.success}>???? ?????ng b???</Tag>
                ) : (
                    <Tag color={Colors.danger}>?????ng b??? l???i</Tag>
                )
            },
            width: '15%',
        },
        {
            title: 'Th???i gian',
            dataIndex: '',
            key: '',
            align: 'center',
            render: (text: any, record: SyncHistory, index: any) => {
                return record?.syncTime ?? ''
            },
            width: '15%',
        },
        {
            title: 'Thao t??c',
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
                        title='X??a d??? li???u???'
                        okText='Ok'
                        cancelText='H???y'
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <button
                            style={{ marginLeft: 10 }}
                            className='btn btn-light-danger m-btn m-btn--icon btn-sm m-btn--icon-only'
                            data-toggle='m-tooltip'
                            title='X??a'
                        >
                            <i className='la la-trash' style={{ marginLeft: -7 }}></i>
                        </button>
                    </Popconfirm>
                </div>
            ),
        },
    ]

    const handleDelete = async (id: string) => {
        const [status] = await syncHistoryApi.delete(id)
        if (status === 200) {
            notification.success({
                message: 'X??a th??nh c??ng!',
                duration: 1,
                placement: 'bottomRight',
            })
            setUpdate(true)
        } else {
            notification.error({
                message: `Th???t b???i!`,
                description: 'X??a kh??ng th??nh c??ng.',
            })
        }
    }

    const handleView = (id: string) => {
        setModalId(id)
        setModalVisible(true)
    }

    return (
        <div>
            <PageTitle breadcrumbs={[]}>L???ch s??? ?????ng b???</PageTitle>
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
