import React, { useState, useEffect } from 'react';
import { Table, Spin } from 'antd';

const TableList = (props) => {
  const { loading, dataTable, count, size } = props;
  const [searchText, setSearchText] = useState('');

  const [current, setCurrent] = useState(1);

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const handleTableChange = async (page, pageSize) => {
    setCurrent(page);
    props.setOffset(page);
  };

  const handleSizeChange = async (current, size) => {
    props.setSize(size);
  };

  const handleShowTotal = (total, range) => {
    return `${range[0]}-${range[1]} của ${total} mục`;
  };

  return (
    <Table
      {...props}
      bordered={true}
      style={{ backgroundColor: '#fff' }}
      loading={loading}
      size="default"
      ellipsis="enable"
      pagination={
        props.isPagination
          ? {
              total: count,
              defaultPageSize: size,
              pageSizeOptions: ['10', '20', '50'],
              onChange: handleTableChange,
              showSizeChanger: true,
              onShowSizeChange: handleSizeChange,
              current,
              showTotal: handleShowTotal,
            }
          : {}
      }
      columns={props.columns.map((item) => ({ ...item }))}
      dataSource={dataTable}
      rowKey="id"
      locale={{ filterConfirm: 'Đồng ý', emptyText: 'Không có dữ liệu', filterReset: 'Làm lại' }}
    />
  );
};

export default TableList;
