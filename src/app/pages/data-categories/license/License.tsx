import { Divider, Input, Popconfirm, Typography, notification } from 'antd'
import { useEffect, useState } from 'react'

import FormModal from './components/FormModal'
import { PageTitle } from 'src/_metronic/layout/core'
import { TableList } from 'src/app/components'
import { licenseApi } from 'src/app/apis'

const { Text } = Typography
const { Search } = Input

const CategoryPage = () => {
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
      width: '45%',
    },
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code',
      width: '30%',
    },
    {
      title: 'Thao tác',
      width: '20%',
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
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        var res = await licenseApi.getAll()
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
    setModalId(id)
    setTypeModal('edit')
    setModalVisible(true)
  }

  const handleView = (id: string) => {
    setModalId(id)
    setTypeModal('view')
    setModalVisible(true)
  }

  const handleDelete = async (id: string) => {
    var res = await licenseApi.delete(id)
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
      <PageTitle breadcrumbs={[]}>Giấy phép</PageTitle>
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
              onClick={() => {
                setModalVisible(true)
              }}
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

export default CategoryPage
