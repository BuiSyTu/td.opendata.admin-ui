import { Divider, Input, Tag, Typography } from 'antd'
import { danger, secondary, success } from 'src/app/constants/color'
import { useEffect, useState } from 'react'

import { ApproveState } from 'src/app/models'
import { PageTitle } from 'src/_metronic/layout/core'
import { State } from 'src/setup/redux/slices/dataset'
import TableList from 'src/app/components/TableList'
import { datasetApi } from 'src/app/apis'

const { Text } = Typography
const { Search } = Input

const StatisticByDataTypePage = () => {
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
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        var res = await datasetApi.getAll({
          approveState: ApproveState.REJECTED,
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
  }, [offset, size, inputValue])

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
    </div>
  )
}

export default StatisticByDataTypePage
