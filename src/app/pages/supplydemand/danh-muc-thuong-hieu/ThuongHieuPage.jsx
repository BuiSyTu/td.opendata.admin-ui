import React, { useState, useEffect } from 'react';
import { Row, Col, Layout, Table, Button, Input, Typography, Select, Popconfirm, notification, Image } from 'antd';
import {Redirect, Route, Switch} from 'react-router-dom';
import {PageLink, PageTitle} from '../../../../_metronic/layout/core';
import { requestDELETE, requestGET, requestPATCH, HOST_FILE, HOST_API } from '../../../../utils/basicAPI'
import TableList from './components/TableList'
import ModalItem from './components/ModalItem';
import { FaEdit, FaTrashAlt, FaFileAlt, FaEye } from 'react-icons/fa';

const { Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const chatBreadCrumbs = [
  {
    title: 'Thương hiệu',
    path: '/supplydemand/brandlist',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
];
const ThuongHieuPage = () => {
  const [dataTable, setDataTable] = useState([]);
  const [modalId, setModalId] = useState(null);
  const [update, setUpdate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const [size, setSize] = useState(10);
  const [count, setCount] = useState('');
  const [offset, setOffset] = useState(1);
  const [typeModal, setTypeModal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      var res = await requestGET(`${HOST_API}/Brand?keySearch=${searchText}&pageNumber=${offset}&pageSize=${size}`)
      if (res && res.succeeded && res.data) {
        setDataTable(res.data)
        setCount(res.totalCount)
      }
      setLoading(false)
    }
    fetchData()
    return () => { }
  }, [update, size, offset, searchText])
  
  const handleChangeModalData = (data) => {
    setModalId(data.id);
    setTypeModal('view');
    setModalVisible(true);
  };

  const handleEditModalData = (data) => {
    setModalId(data.id);
    setTypeModal('edit');
    setModalVisible(true);
  };

  const handleDeleteModalData = async (id) => {
    var res = await requestDELETE(`${HOST_API}/Brand/${id}`);
    if (res) {
      notification.success({
        message: 'Xóa thành công!',
        duration: 1,
        placement: 'bottomRight',
      });
      setUpdate(true);
    } else {
      notification.error({
        message: `Thất bại!`,
        description: 'Xóa không thành công.',
      });
    }
  };

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      align : 'center',
      render: (text, record, index) => {
        return <Text style={{}}>{index + (offset - 1) * 10 + 1}</Text>;
      },
      width: '2%'
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      width: '10%',
      align: 'center',
      render: (text, record, index) => {
        var img = record.image
        if (img && img.length > 0) {
          return < Image
            preview={false}
            width={60}
            height={60}
            src={(img.includes('https://') || img.includes('http://')) ? img
              : `${HOST_FILE + img}`}
          />
        }
      },
    },
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code',
      width: '10%',
      align: 'center'
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      align: 'center'
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: '',
      align: 'center',
      width: '15%',
      render: (text, record) => {
        return (
          <div>
            <a
            className='btn btn-light-success m-btn m-btn--icon btn-sm m-btn--icon-only'
            data-toggle='m-tooltip'
            title='Xem'
            onClick={() => {
              handleChangeModalData(record);
            }}
          >
            <i className='la la-eye' style={{marginLeft: -7}}></i>
          </a>

          <a
            style={{marginLeft: 10}}
            className='btn btn-light-primary m-btn m-btn--icon btn-sm m-btn--icon-only'
            data-toggle='m-tooltip'
            title='Sửa'
            onClick={() => {
              handleEditModalData(record);
            }}
          >
            <i className='la la-edit' style={{marginLeft: -7}}></i>
          </a>
          <Popconfirm
            title='Xóa dữ liệu？'
            okText='Ok'
            cancelText='Hủy'
            onConfirm={() => {
              handleDeleteModalData(record.id);
            }}
          >
            <a
              style={{marginLeft: 10}}
              className='btn btn-light-danger m-btn m-btn--icon btn-sm m-btn--icon-only'
              data-toggle='m-tooltip'
              title='Xóa'
            >
              <i className='la la-trash' style={{marginLeft: -7}}></i>
            </a>
          </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <Switch>
      <Route path='/supplydemand/brandlist'>
        <PageTitle breadcrumbs={chatBreadCrumbs}>Danh sách cung cầu</PageTitle>
        
        <Layout style={{background : '#eff2f5'}}>
          <Row justify="space-between" style={{ alignItems: 'center' , padding: '5px 10px'}}>
            <Col span={16} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ width: 'auto', marginTop: 10 }}>Tìm kiếm: </Text>
              <Search style={{ width: '40%', height: 33, marginLeft: 10,marginTop: 10, borderRadius: 10 }} placeholder="Tìm kiếm"
                onChange={(e) => {
                  var value = e.target.value;
                  setSearchText(value)
                }}
              />
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
            <a
              className=' btn btn-success btn-sm m-btn m-btn--icon'
              onClick={() => {
                setModalVisible(true);
              }}
            >
              <i className='bi bi-plus-square'></i> Thêm
            </a>
          </Col>
          </Row>
          <Row justify='start' style={{ width: '100%', display: 'block', marginTop: 10 }}>
            <TableList
              loading={loading}
              dataTable={dataTable}
              setUpdate={setUpdate}
              columns={columns}
              isPagination={true}
              size={size}
              count={count}
              setOffset={setOffset}
              setSize={setSize}
            />
          </Row>
          <ModalItem
            modalId={modalId}
            modalVisible={modalVisible}
            setModalId={setModalId}
            setUpdate={setUpdate}
            update={update}
            setModalVisible={setModalVisible}
          />
      </Layout>
      </Route>

      <Redirect from='/supplydemand' exact={true} to='/supplydemand/supplydemandlist' />
      <Redirect to='/supplydemand/supplydemandlist' />
    </Switch>
  );
};

export default ThuongHieuPage;
