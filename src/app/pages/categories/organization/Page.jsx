import { Col, Divider, Input, Popconfirm, Row, Typography, notification } from 'antd'
import { useEffect, useState } from 'react'

import FormModal from './components/FormModal'
import { PageTitle } from '../../../../_metronic/layout/core'
import TableList from '../../../components/TableList'
import { organizationApi } from '../../../apis/organization'

const { Text } = Typography
const { Search } = Input

const CustomPage = () => {
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [update, setUpdate] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [dataTable, setDataTable] = useState([])
  const [size, setSize] = useState(10)
  const [count, setCount] = useState(0)
  const [offset, setOffset] = useState(0)
  const [modalId, setModalId] = useState('')
  const [typeModal, setTypeModal] = useState('')

  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      key: '',
      render: (text, record, index) => {
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
      width: '40%',
    },
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code',
      width: '35%',
    },
    {
      title: 'Thao tác',
      width: '20%',
      dataIndex: '',
      key: '',
      render: (text, record) => (
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
              <i className='fas fa-trash-alt' style={{ marginLeft: -7 }}></i>
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ]

  useEffect(() => {
    setUpdate(true)
    return () => { }
  }, [offset, size, inputValue])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        var res = await organizationApi.getAll()
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

  const handleEdit = (id) => {
    setModalId(id)
    setTypeModal('edit')
    setModalVisible(true)
  }

  const handleView = (id) => {
    setModalId(id)
    setTypeModal('view')
    setModalVisible(true)
  }

  const handleDelete = async (id) => {
    var res = await organizationApi.delete(id)
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

  return (
    <div>
      <PageTitle breadcrumbs={[]}>Danh sách tổ chức</PageTitle>
      <div className='card mb-5 mb-xl-12 py-5'>
        <Row justify='space-between' style={{ alignItems: 'center', padding: '5px 10px' }}>
          <Col span={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Search
              style={{ width: '40%', height: 35, borderRadius: 10 }}
              placeholder='Tìm kiếm'
              onSearch={(e) => {
                setInputValue(e)
              }}
            />
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <button
              className=' btn btn-success btn-sm m-btn m-btn--icon'
              onClick={() => {
                setModalVisible(true)
              }}
            >
              <i className='bi bi-plus-square'></i> Thêm
            </button>
          </Col>
        </Row>
        <Divider style={{ margin: '10px 0' }} />
        <Row>
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
        </Row>
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

export default CustomPage
