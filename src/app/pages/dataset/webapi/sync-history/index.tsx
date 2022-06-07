import { Tag, Typography } from 'antd'
import { useEffect, useState } from 'react'

import { danger, success } from 'src/app/constants/color'
import { PageTitle } from 'src/_metronic/layout/core'
import TableList from 'src/app/components/TableList'
import { syncHistoryApi } from 'src/app/apis'
import { SyncHistory } from 'src/app/models'

const { Text } = Typography

const SyncHistoryPage = () => {
  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(true)
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
      render: (text: unknown, record: unknown, index: any) => {
        return (
          <Text style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
      width: '25%',
    },
    {
      title: 'Trạng thái',
      dataIndex: '',
      key: '',
      align: 'center',
      render: (text: any, record: SyncHistory, index: any) => {
        return record?.dataset?.isSynced ? (
          <Tag color={success}>Đã đồng bộ</Tag>
        ) : (
          <Tag color={danger}>Đồng bộ lỗi</Tag>
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
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        var res = await syncHistoryApi.getAll({
          dataTypeCode: 'webapi',
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
    return () => { }
  }, [update])

  useEffect(() => {
    setUpdate(true)
    return () => { }
  }, [offset, size])

  return (
    <div>
      <PageTitle breadcrumbs={[]}>Thống kê đồng bộ</PageTitle>
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
    </div>
  )
}

export default SyncHistoryPage
