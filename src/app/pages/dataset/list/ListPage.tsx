import { Divider, Input, Popconfirm, Tag, Typography, notification } from 'antd'
import {
    State,
    TypeModal,
    setDisableDataTab,
    setDataTypeCode,
} from 'src/setup/redux/slices/dataset'
import { Colors } from 'src/app/constants'
import { useEffect, useState } from 'react'

import FormModal from 'src/app/pages/dataset/components/FormModal'
import { PageTitle } from 'src/_metronic/layout/core'
import { TableList } from 'src/app/components'
import { datasetApi } from 'src/app/apis'
import { openJsonInNewTab } from 'src/utils/common'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/setup'
import { ApproveState, ViewMode } from 'src/app/models'

const { Text } = Typography
const { Search } = Input

interface ListPageProps {
    dataTypeCode?: 'webapi' | 'file'
    isPortal: boolean
    viewModes: ViewMode[]
    approveState?: ApproveState
}

const ListPage: React.FC<ListPageProps> = ({
    dataTypeCode,
    isPortal,
    approveState,
    viewModes = [],
}) => {
    const dispatch = useDispatch()
    const userInfo = useSelector((state: RootState) => state.global.userInfo)

    const [modalVisible, setModalVisible] = useState(false)
    const [modalId, setModalId] = useState('')
    const [typeModal, setTypeModal] = useState<TypeModal>(TypeModal.none)
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(true)
    const [inputValue, setInputValue] = useState('')
    const [dataTable, setDataTable] = useState([])
    const [size, setSize] = useState(10)
    const [count, setCount] = useState(0)
    const [offset, setOffset] = useState(0)

    const columns = [
        {
            title: 'STT',
            dataIndex: '',
            key: '',
            align: 'center',
            render: (text: any, record: any, index: any) => {
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
            title: 'T??n',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'M??',
            dataIndex: 'code',
            key: 'code',
        },
        ...(viewModes.includes(ViewMode.INFO) || viewModes.includes(ViewMode.APPROVE)
            ? [
                  {
                      title: 'T??? ch???c',
                      dataIndex: '',
                      key: '',
                      render: (text: any, record: any) => {
                          return record?.organization?.name ?? ''
                      },
                  },
              ]
            : []),
        ...(viewModes.includes(ViewMode.INFO) || viewModes.includes(ViewMode.APPROVE)
            ? [
                  {
                      title: 'L??nh v???c',
                      dataIndex: '',
                      key: '',
                      render: (text: any, record: any) => {
                          return record?.category?.name ?? ''
                      },
                  },
              ]
            : []),
        ...(viewModes.includes(ViewMode.CONFIG)
            ? [
                  {
                      title: 'Tr???ng th??i d??? li???u',
                      dataIndex: 'state',
                      key: 'state',
                      width: '20%',
                      render: (text: any, record: any, index: any) => {
                          const getApproveState = () => {
                              let color = Colors.secondary
                              let textDisplay = 'Kh??ng x??c ?????nh'

                              switch (record?.approveState) {
                                  case State.pending:
                                      textDisplay = 'Ch??a duy???t'
                                      break
                                  case State.approved:
                                      color = Colors.success
                                      textDisplay = '???? duy???t'
                                      break
                                  case State.rejected:
                                      color = Colors.danger
                                      textDisplay = 'B??? t??? ch???i'
                                      break
                                  default:
                                      break
                              }

                              return {
                                  color,
                                  textDisplay,
                              }
                          }

                          const getIsSynced = () => {
                              return {
                                  color: record?.isSynced ? Colors.success : Colors.secondary,
                                  textDisplay: record?.isSynced ? '???? ?????ng b???' : '??ang ?????ng b???',
                              }
                          }

                          const { color: colorApproveState, textDisplay: textApproveState } =
                              getApproveState()
                          const { color: colorSynced, textDisplay: textSynced } = getIsSynced()

                          return (
                              <>
                                  <Tag color={colorApproveState}>{textApproveState}</Tag>
                                  <Tag color={colorSynced}>{textSynced}</Tag>
                              </>
                          )
                      },
                  },
              ]
            : []),
        ...(viewModes.includes(ViewMode.INFO) || viewModes.includes(ViewMode.CONFIG)
            ? [
                  {
                      title: 'Thao t??c',
                      dataIndex: '',
                      key: '',
                      align: 'center',
                      render: (text: any, record: any) => (
                          <div>
                              <button
                                  className='btn btn-light-success m-btn m-btn--icon btn-sm m-btn--icon-only'
                                  data-toggle='m-tooltip'
                                  title='Xem'
                                  onClick={() => {
                                      handleView(record.id)
                                  }}
                              >
                                  <i className='la la-file-text-o' style={{ marginLeft: -7 }}></i>
                              </button>
                              <button
                                  style={{ marginLeft: 10 }}
                                  className='btn btn-light-primary m-btn m-btn--icon btn-sm m-btn--icon-only'
                                  data-toggle='m-tooltip'
                                  title='S???a'
                                  onClick={() => {
                                      handleEdit(record.id)
                                  }}
                              >
                                  <i className='la la-edit' style={{ marginLeft: -7 }}></i>
                              </button>
                              <Popconfirm
                                  title='X??a d??? li???u???'
                                  okText='Ok'
                                  cancelText='H???y'
                                  onConfirm={() => {
                                      handleDelete(record.id)
                                  }}
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
            : []),
        ...(viewModes.includes(ViewMode.CONFIG)
            ? [
                  {
                      title: 'D??? li???u',
                      width: '15%',
                      dataIndex: '',
                      key: '',
                      align: 'center',
                      render: (text: any, record: any) => (
                          <div>
                              <button
                                  className='btn btn-light-primary m-btn m-btn--icon btn-sm m-btn--icon-only'
                                  data-toggle='m-tooltip'
                                  title='?????ng b??? l???i'
                                  onClick={() => {
                                      handleSyncData(record.id)
                                  }}
                              >
                                  <i className='la la-sync' style={{ marginLeft: -7 }}></i>
                              </button>
                              <button
                                  style={{ marginLeft: 10 }}
                                  className='btn btn-light-success m-btn m-btn--icon btn-sm m-btn--icon-only'
                                  data-toggle='m-tooltip'
                                  title='Xem d??? li???u m???u'
                                  onClick={() => {
                                      handleGetData(record.id)
                                  }}
                              >
                                  <i className='la la-eye' style={{ marginLeft: -7 }}></i>
                              </button>
                          </div>
                      ),
                  },
              ]
            : []),
        ...(viewModes.includes(ViewMode.APPROVE)
            ? [
                  {
                      title: 'X??t duy???t',
                      width: '15%',
                      dataIndex: '',
                      key: '',
                      align: 'center',
                      render: (text: any, record: any) => (
                          <div>
                              <button
                                  className='btn btn-light-success m-btn m-btn--icon btn-sm m-btn--icon-only'
                                  data-toggle='m-tooltip'
                                  title='Duy???t'
                                  onClick={() => {
                                      handleApproved(record.id)
                                  }}
                              >
                                  <i className='la la-check' style={{ marginLeft: -7 }}></i>
                              </button>
                              <button
                                  style={{ marginLeft: 10 }}
                                  className='btn btn-light-danger m-btn m-btn--icon btn-sm m-btn--icon-only'
                                  data-toggle='m-tooltip'
                                  title='T??? ch???i'
                                  onClick={() => {
                                      handleRejected(record.id)
                                  }}
                              >
                                  <i className='la la-times' style={{ marginLeft: -7 }}></i>
                              </button>
                          </div>
                      ),
                  },
              ]
            : []),
    ]

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const [status, res] = await datasetApi.getAll({
                isPortal,
                ...(dataTypeCode && { dataTypeCode }),
                ...(!isPortal && { officeCode: userInfo?.Info?.UserOffice?.GroupCode ?? '' }),
                ...(approveState && { approveState }),
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
    }, [offset, size, inputValue])

    const handleEdit = (id: string) => {
        setModalVisible(true)
        setModalId(id)
        setTypeModal(TypeModal.edit)

        dispatch(setDisableDataTab(!viewModes.includes(ViewMode.CONFIG)))
        dispatch(setDataTypeCode(dataTypeCode))
    }

    const handleView = (id: string) => {
        setModalVisible(true)
        setModalId(id)
        setTypeModal(TypeModal.view)

        dispatch(setDisableDataTab(!viewModes.includes(ViewMode.CONFIG)))
        dispatch(setDataTypeCode(dataTypeCode))
    }

    const handleAdd = () => {
        setModalVisible(true)
        setTypeModal(TypeModal.add)

        dispatch(setDisableDataTab(!viewModes.includes(ViewMode.CONFIG)))
        dispatch(setDataTypeCode(dataTypeCode))
    }

    const handleDelete = async (id: string) => {
        const [status] = await datasetApi.delete(id)
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

    const handleApproved = async (id: string) => {
        const [status] = await datasetApi.approved(id)
        if (status === 200) {
            notification.success({
                message: 'Th??nh c??ng!',
                duration: 1,
                placement: 'bottomRight',
            })

            setUpdate(true)
        } else {
            notification.error({
                message: `Th???t b???i!`,
                description: 'Kh??ng th??nh c??ng.',
            })
        }
    }

    const handleRejected = async (id: string) => {
        const [status] = await datasetApi.rejected(id)
        if (status === 200) {
            notification.success({
                message: 'Th??nh c??ng!',
                duration: 1,
                placement: 'bottomRight',
            })

            setUpdate(true)
        } else {
            notification.error({
                message: 'Th???t b???i!',
                description: 'Kh??ng th??nh c??ng.',
            })
        }
    }

    const handleSyncData = async (id: string) => {
        notification.warning({
            message: '??ang ?????ng b???!',
            duration: 2,
            placement: 'bottomRight',
        })

        const [status] = await datasetApi.syncData(id)
        if (status === 200) {
            notification.success({
                message: 'Th??nh c??ng!',
                duration: 1,
                placement: 'bottomRight',
            })

            setUpdate(true)
        } else {
            notification.error({
                message: `Th???t b???i!`,
                description: 'Kh??ng th??nh c??ng.',
            })
        }
    }

    const handleGetData = async (id: string) => {
        const [status, res] = await datasetApi.getData(id)
        if (status === 200) {
            openJsonInNewTab(res)
        } else {
            notification.error({
                message: `Th???t b???i!`,
                description: 'Kh??ng th??nh c??ng.',
            })
        }
    }

    return (
        <div>
            <PageTitle breadcrumbs={[]}>Danh s??ch t???p d??? li???u</PageTitle>
            <div className='card mb-5 mb-xl-12 p-10'>
                <div className='d-flex row justify-content-between align-items-center px-5'>
                    <div className='col-xl-8 d-flex align-items-center'>
                        <Search
                            style={{ width: '40%', height: 35, borderRadius: 10 }}
                            placeholder='T??m ki???m'
                            onSearch={(e) => {
                                setInputValue(e)
                            }}
                        />
                    </div>
                    {viewModes.includes(ViewMode.INFO) && (
                        <div className='col-xl-4 d-flex justify-content-end'>
                            <button
                                className=' btn btn-success btn-sm m-btn m-btn--icon'
                                onClick={() => handleAdd()}
                            >
                                <i className='bi bi-plus-square'></i> Th??m
                            </button>
                        </div>
                    )}
                </div>
                <Divider style={{ margin: '10px 0' }} />
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
                typeModal={typeModal}
                setTypeModal={setTypeModal}
                setUpdate={setUpdate}
                viewModes={viewModes}
            />
        </div>
    )
}

export default ListPage
