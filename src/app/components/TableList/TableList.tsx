import {Table} from 'antd'
import {useState} from 'react'

interface Props {
  loading?: any,
  dataTable?: any,
  count?: any,
  size?: any,
  columns?: any,
  setOffset?: any,
  setSize?: any,
  isPagination?: any,
  rowSelection?: any,
  rowKey?: any,
}

const TableList: React.FC<Props> = ({
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
  ...props
}) => {
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
