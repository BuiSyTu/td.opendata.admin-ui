import React, {useState, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {shallowEqual, useSelector, connect, useDispatch, ConnectedProps} from 'react-redux';

import {PageLink, PageTitle} from '../../../../_metronic/layout/core';
import {Row, Col, Typography, Divider, Input, Button, Popconfirm, notification} from 'antd';
import TableList from '../../../components/TableList';
import FormModal from './components/FormModal';
import {HOST_API, requestGET, requestDELETE} from '../../../utils/basicAPI';

const {Text} = Typography;
const {Search} = Input;
const CustomPage = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [update, setUpdate] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [dataTable, setDataTable] = useState([]);
  const [size, setSize] = useState(10);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [modalId, setModalId] = useState(0);
  const [typeModal, setTypeModal] = useState('');
  const chatBreadCrumbs = [
    {
      title: '',
      path: '',
      isSeparator: false,
      isActive: false,
    },
  ];
  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      key: '',
      render: (text, record, index) => {
        return (
          <Text style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {index + 1}
          </Text>
        );
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
      width: '35%',
    },
    {
      title: 'Thao tác',
      width: '15%',
      dataIndex: '',
      key: '',
      render: (text, record) => (
        <div>
          <a
            className='btn btn-light-success m-btn m-btn--icon btn-sm m-btn--icon-only'
            data-toggle='m-tooltip'
            title='Xem'
            onClick={() => {
              handleView(Number(record.id));
            }}
          >
            <i className='fas fa-edit' style={{marginLeft: -7}}></i>
          </a>
          <a
            style={{marginLeft: 10}}
            className='btn btn-light-primary m-btn m-btn--icon btn-sm m-btn--icon-only'
            data-toggle='m-tooltip'
            title='Sửa'
            onClick={() => {
              handleEdit(Number(record.id));
            }}
          >
            <i className='la la-edit' style={{marginLeft: -7}}></i>
          </a>
          <Popconfirm
            title='Xóa dữ liệu？'
            okText='Ok'
            cancelText='Hủy'
            onConfirm={() => {
              handleDelete(Number(record.id));
            }}
          >
            <a
              style={{marginLeft: 10}}
              className='btn btn-light-danger m-btn m-btn--icon btn-sm m-btn--icon-only'
              data-toggle='m-tooltip'
              title='Xóa'
            >
              <i className='fas fa-trash-alt' style={{marginLeft: -7}}></i>
            </a>
          </Popconfirm>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setUpdate(true);
    return () => {};
  }, [offset, size, inputValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        var res = await requestGET(
          `${HOST_API}/PlaceType?orderBy=name&keySearch=${inputValue}&pageNumber=${offset}&pageSize=${size}`
        );
        setDataTable(res?.data ?? []);
        setCount(res?.totalCount ?? 0);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      setUpdate(false);
    };
    if (update) {
      fetchData();
    }
    return () => {};
  }, [update]);
  const handleEdit = (id) => {
    setModalId(id);
    setTypeModal('edit');
    setModalVisible(true);
  };
  const handleView = (id) => {
    setModalId(id);
    setTypeModal('view');
    setModalVisible(true);
  };
  const handleDelete = async (id) => {
    var res = await requestDELETE(`${HOST_API}/PlaceType/${id}`);
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
  return (
    <div>
      <PageTitle breadcrumbs={[]}>Danh sách loại địa điểm</PageTitle>
      <div className='card mb-5 mb-xl-12 py-5'>
        <Row justify='space-between' style={{alignItems: 'center', padding: '5px 10px'}}>
          <Col span={12} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Search
              style={{width: '40%', height: 35, borderRadius: 10}}
              placeholder='Tìm kiếm'
              onSearch={(e) => {
                setInputValue(e);
              }}
            />
          </Col>
          <Col span={12} style={{textAlign: 'right'}}>
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
        <Divider style={{margin: '10px 0'}} />
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
  );
};

export default CustomPage;
