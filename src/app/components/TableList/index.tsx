import {Table} from 'antd'
import {useState} from 'react'

const TableList = (props: any) => {
  const {
    loading,
    dataTable,
    count,
    size,
    columns,
    setOffset,
    setSize,
    isPagination,
    rowSelection,
    rowKey,
  } = props

  const [current, setCurrent] = useState(1)

  const handleTableChange = async (page: number, pageSize: number) => {
    setCurrent(page)
    setOffset(page)
  }

  const handleSizeChange = async (current: any, size: number) => {
    setSize(size)
  }

  const handleShowTotal = (total: number, range: any) => {
    return `${range[0]}-${range[1]} của ${total} mục`
  }

  return (
    <Table
      {...props}
      rowKey={rowKey || 'id'}
      bordered
      style={{backgroundColor: '#fff', width: '100%'}}
      rowClassName={(record, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
      loading={loading}
      size='small'
      ellipsis='enable'
      pagination={
        isPagination
          ? {
              total: count,
              defaultPageSize: size,
              pageSizeOptions: ['10', '20', '50'],
              onChange: handleTableChange,
              showSizeChanger: true,
              onShowSizeChange: handleSizeChange,
              current,
              showTotal: handleShowTotal,
              locale: {items_per_page: '/ trang'},
              size: 'default',
            }
          : {}
      }
      columns={columns.map((item: any) => ({...item}))}
      dataSource={dataTable}
      rowSelection={rowSelection}
    />
  )
}

export default TableList
