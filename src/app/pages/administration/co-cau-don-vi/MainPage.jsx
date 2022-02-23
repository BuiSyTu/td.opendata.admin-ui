import React, {useState, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {shallowEqual, useSelector, connect, useDispatch, ConnectedProps} from 'react-redux';

import {PageLink, PageTitle} from '../../../../_metronic/layout/core';
import {
  Row,
  Col,
  Typography,
  Divider,
  Input,
  Button,
  Popconfirm,
  notification,
  Tabs,
  Tree,
} from 'antd';
import TableList from '../../../components/TableList';
import FormModal from './components/FormModal';
import ListUser from './components/ListUser';
import {HOST_API, requestGET, requestDELETE} from '../../../utils/basicAPI';
import DATA_DEMO from './data';
const {Text} = Typography;
const {Search} = Input;
const {TabPane} = Tabs;
const MainPage = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [update, setUpdate] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // var res = await requestGET(
        //   `${HOST_API}/Gender?orderBy=name&keySearch=${inputValue}&pageNumber=${offset}&pageSize=${size}`
        // );
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
    return () => {};
  }, []);

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
    var res = await requestDELETE(`${HOST_API}/Gender/${id}`);
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
  const onSelect = (selectedKeys) => {
    console.log('selected', selectedKeys);
  };
  return (
    <div>
      <PageTitle breadcrumbs={[]}>Cơ cấu tổ chức</PageTitle>
      <div className='row gy-5 g-xl-12'>
        <div className='col-xl-4'>
          <div className='card card-xl-stretch mb-xl-8'>
            <div className='card-header' style={{minHeight: 55}}>
              <Text className='card-title fw-bolder'>Nhóm người dùng</Text>
            </div>
            <div className='d-flex flex-column p-5'>
              <Input size='large' placeholder='Tìm kiếm' prefix={<i class='fas fa-search'></i>} />
              <div className='d-flex flex-column pt-5'>
                <Tree
                  showLine={{showLeafIcon: false}}
                  defaultExpandedKeys={['']}
                  onSelect={onSelect}
                  treeData={DATA_DEMO} 
                />
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-8'>
          <div className='card card-xl-stretch mb-xl-8'>
            <Tabs
              defaultActiveKey='1'
              className='card-title'
              size='large'
              style={{}}
              tabBarStyle={{minHeight: 55, paddingLeft: 10, fontWeight: '600', color: '#181c32'}}
            >
              <TabPane
                tab={
                  <span>
                    <i className='fas fa-users ant-tabs-tab-btn pe-5'></i>
                    Danh sách người dùng
                  </span>
                }
                key='1'
              >
                <div>
                  <ListUser />
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <i className='fas fa-info-circle ant-tabs-tab-btn pe-5'></i>
                    Thông tin
                  </span>
                }
                key='2'
              ></TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
