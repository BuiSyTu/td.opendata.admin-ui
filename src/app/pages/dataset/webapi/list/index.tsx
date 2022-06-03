import { Divider, Input, Popconfirm, Tag, Typography, notification } from 'antd'
import { State, TypeModal, setDisableDataTab } from 'src/setup/redux/slices/dataset'
import { danger, secondary, success } from 'src/app/constants/color'
import { useEffect, useState } from 'react'

import FormModal from 'src/app/pages/dataset/components/FormModal'
import { PageTitle } from 'src/_metronic/layout/core'
import TableList from 'src/app/components/TableList'
import { datasetApi } from 'src/app/apis'
import { openJsonInNewTab } from 'src/utils/common'
import { useDispatch } from 'react-redux'

const { Text } = Typography
const { Search } = Input

const ListPage = () => {
  const dispatch = useDispatch()

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
          <Text style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {index + 1}
          </Text>
        )
      },
      width: '5%',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code',
      width: '10%',
    },
    {
      title: 'Trạng thái dữ liệu',
      dataIndex: 'state',
      key: 'state',
      width: '20%',
      render: (text: any, record: any, index: any) => {
        const getApproveState = () => {
          let color = secondary
          let textDisplay = 'Không xác định'

          switch (record?.approveState) {
            case State.pending:
              textDisplay = 'Chưa duyệt'
              break;
            case State.approved:
              color = success
              textDisplay = 'Đã duyệt'
              break;
            case State.rejected:
              color = danger
              textDisplay = 'Bị từ chối'
              break;
            default:
              break;
          }

          return {
            color,
            textDisplay
          }
        }

        const getIsSynced = () => {
          return {
            color: record?.isSynced ? success : secondary,
            textDisplay: record?.isSynced ? 'Đã đồng bộ' : 'Đang đồng bộ',
          }
        }

        const { color: colorApproveState, textDisplay: textApproveState } = getApproveState()
        const { color: colorSynced, textDisplay: textSynced } = getIsSynced()

        return (
          <>
            <Tag color={colorApproveState}>
              {textApproveState}
            </Tag>
            <Tag color={colorSynced}>
              {textSynced}
            </Tag>
          </>
        );
      },
    },
    {
      title: 'Thao tác',
      width: '15%',
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
            title='Sửa'
            onClick={() => {
              handleEdit(record.id)
            }}
          >
            <i className='la la-edit' style={{ marginLeft: -7 }}></i>
          </button>
          <Popconfirm
            title='Xóa dữ liệu？'
            okText='Ok'
            cancelText='Hủy'
            onConfirm={() => {
              handleDelete(record.id)
            }}
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
    {
      title: 'Dữ liệu',
      width: '15%',
      dataIndex: '',
      key: '',
      align: 'center',
      render: (text: any, record: any) => (
        <div>
          <button
            className='btn btn-light-primary m-btn m-btn--icon btn-sm m-btn--icon-only'
            data-toggle='m-tooltip'
            title='Đồng bộ lại'
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
            title='Xem dữ liệu mẫu'
            onClick={() => {
              handleGetData(record.id)
            }}
          >
            <i className='la la-eye' style={{ marginLeft: -7 }}></i>
          </button>
        </div>
      ),
    },
    {
      title: 'Xét duyệt',
      width: '15%',
      dataIndex: '',
      key: '',
      align: 'center',
      render: (text: any, record: any) => (
        <div>
          <button
            className='btn btn-light-success m-btn m-btn--icon btn-sm m-btn--icon-only'
            data-toggle='m-tooltip'
            title='Duyệt'
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
            title='Từ chối'
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        var res = await datasetApi.getAll({ dataTypeCode: 'webapi' })
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
    return () => { }
  }, [update])

  useEffect(() => {
    setUpdate(true)
    return () => { }
  }, [offset, size, inputValue])

  const handleEdit = (id: string) => {
    setModalVisible(true)
    setModalId(id)
    setTypeModal(TypeModal.edit)

    dispatch(setDisableDataTab(false))
  }

  const handleView = (id: string) => {
    setModalVisible(true)
    setModalId(id)
    setTypeModal(TypeModal.view)

    dispatch(setDisableDataTab(false))
  }

  const handleAdd = () => {
    setModalVisible(true)
    setTypeModal(TypeModal.add)
  }

  const handleDelete = async (id: string) => {
    var res = await datasetApi.delete(id)
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

  const handleApproved = async (id: string) => {
    var res = await datasetApi.approved(id)
    if (res) {
      notification.success({
        message: 'Thành công!',
        duration: 1,
        placement: 'bottomRight',
      })

      setUpdate(true)
    } else {
      notification.error({
        message: `Thất bại!`,
        description: 'Không thành công.',
      })
    }
  }

  const handleRejected = async (id: string) => {
    var res = await datasetApi.rejected(id)
    if (res) {
      notification.success({
        message: 'Thành công!',
        duration: 1,
        placement: 'bottomRight',
      })

      setUpdate(true)
    } else {
      notification.error({
        message: 'Thất bại!',
        description: 'Không thành công.',
      })
    }
  }

  const handleSyncData = async (id: string) => {
    notification.warning({
      message: 'Đang đồng bộ!',
      duration: 2,
      placement: 'bottomRight',
    });

    var res = await datasetApi.syncData(id)
    if (res) {
      notification.success({
        message: 'Thành công!',
        duration: 1,
        placement: 'bottomRight',
      })

      setUpdate(true)
    } else {
      notification.error({
        message: `Thất bại!`,
        description: 'Không thành công.',
      })
    }
  }

  const handleGetData = async (id: string) => {
    var res = await datasetApi.getData(id)
    if (res) {
      openJsonInNewTab(res)
    } else {
      notification.error({
        message: `Thất bại!`,
        description: 'Không thành công.',
      })
    }
  }

  return (
    <div>
      <PageTitle breadcrumbs={[]}>Danh sách tập dữ liệu</PageTitle>
      <div className='card mb-5 mb-xl-12 p-10'>
        <div className='d-flex row justify-content-between align-items-center px-5'>
          <div className='col-xl-8 d-flex align-items-center'>
            <Search
              style={{ width: '40%', height: 35, borderRadius: 10 }}
              placeholder='Tìm kiếm'
              onSearch={(e) => {
                setInputValue(e)
              }}
            />
          </div>
          <div className='col-xl-4 d-flex justify-content-end'>
            <button
              className=' btn btn-success btn-sm m-btn m-btn--icon'
              onClick={() => handleAdd()}
            >
              <i className='bi bi-plus-square'></i> Thêm
            </button>
          </div>
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
      />
    </div>
  )
}

export default ListPage
