import {useState, useEffect} from 'react';
import {
  Typography,
  Input,
  Popconfirm,
  Dropdown,
  Menu,
  notification,
} from 'antd';
import TableList from '../../../../components/TableList';
import FormModal from './FormModal';
import {HOST_API, requestGET, requestDELETE} from '../../../../utils/basicAPI';
const {Text} = Typography;
const GioiTinhPage = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [update, setUpdate] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [inputValue, setInputValue] = useState('');
  const [dataTable, setDataTable] = useState([]);
  const [size, setSize] = useState(10);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [modalId, setModalId] = useState(0);
  const [typeModal, setTypeModal] = useState('');
  const [selectedKeys, setSelectedKeys] = useState([]);

  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      key: '',
      align: 'center',
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
      title: 'Họ tên',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text, record, index) => {
        return (
          <Text style={{}}>{`${record?.lastName + ' ' ?? ''}${record?.firstName ?? ''}`}</Text>
        );
      },
      width: '25%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '25%',
    },
    {
      title: 'Tài khoản',
      dataIndex: 'userName',
      key: 'userName',
      width: '25%',
    },
    {
      title: 'Thao tác',
      width: '15%',
      dataIndex: '',
      key: '',
      render: (text, record) => (
        <div>
          <button
            className='btn btn-icon btn-bg-light btn-clean btn-active-color-success btn-sm me-1'
            data-toggle='m-tooltip'
            title='Sửa'
            onClick={() => {
              handleEdit(record.userName);
            }}
          >
            <i className='fas fa-edit'></i>
          </button>
          <Popconfirm
            title='Xóa dữ liệu？'
            okText='Ok'
            cancelText='Hủy'
            onConfirm={() => {
              handleDelete(record.userName);
            }}
          >
            <button
              className='btn btn-icon btn-bg-light btn-clean btn-active-color-danger btn-sm me-1'
              data-toggle='m-tooltip'
              title='Xóa'
            >
              <i className='fas fa-trash-alt'></i>
            </button>
          </Popconfirm>
          <Dropdown overlay={menu} trigger={['click']}>
            <button
              className='btn btn-icon btn-bg-light btn-clean btn-active-color-info btn-sm me-1'
              onClick={(e) => e.preventDefault()}
            >
              <i className='fas fa-ellipsis-h'></i>
            </button>
          </Dropdown>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        var res = await requestGET(
          `${HOST_API}/User?orderBy=name&keySearch=${inputValue}&pageNumber=${offset}&pageSize=${size}`
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  useEffect(() => {
    setUpdate(true);
    return () => {};
  }, [offset, size, inputValue]);
  
  const handleEdit = (id) => {
    setModalId(id);
    setTypeModal('edit');
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    var res = await requestDELETE(`${HOST_API}/User/${id}`);
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

  const onSelectChange = (selectedRowKeys) => {
    setSelectedKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: selectedKeys,
    onChange: onSelectChange,
  };

  const menu = () => {
    return (
      <Menu>
        <Menu.Item key='0'>
          <button class='btn btn-light-white btn-sm'>
            <i class='fas fa-info-circle text-danger'></i>
            <span class='m-nav__link-text ps-2 '>Chi tiết</span>
          </button>
        </Menu.Item>
        <Menu.Item key='1'>
          <button class='btn btn-light-white btn-sm '>
            <i class='fas fa-key text-danger'></i>
            <span class='m-nav__link-text ps-2'>Cấp lại mật khẩu</span>
          </button>
        </Menu.Item>
        <Menu.Item key='2'>
          <button class='btn btn-light-white btn-sm'>
            <i class='fas fa-certificate text-danger'></i>
            <span class='m-nav__link-text ps-2'>Cấp quyền</span>
          </button>
        </Menu.Item>
      </Menu>
    );
  };
  return (
    <div>
      <div className='mb-5'>
        <button
          className=' btn btn-info btn-sm m-btn m-btn--icon ms-5'
          onClick={() => {
            setModalVisible(true);
          }}
        >
          <i className='fas fa-plus-square'></i> Thêm
        </button>
        <button className=' btn btn-danger btn-sm m-btn m-btn--icon ms-5' onClick={() => {}}>
          <i className='fas fa-trash-alt'></i> Xóa
        </button>
        <button className=' btn btn-warning btn-sm m-btn m-btn--icon ms-5' onClick={() => {}}>
          <i className='fas fa-certificate'></i> Cấp quyền
        </button>
      </div>
      <div className='d-flex justify-content-end algin-items-center mb-5 me-5'>
        <Text>Tìm kiếm</Text>
        <Input
          className=''
          style={{maxWidth: 200, marginLeft: 10}}
          placeholder=''
          prefix={<i class='fas fa-search'></i>}
        />
      </div>
      <TableList
        dataTable={dataTable}
        columns={columns}
        isPagination={true}
        size={size}
        count={count}
        setOffset={setOffset}
        setSize={setSize}
        loading={loading}
        rowSelection={rowSelection}
        rowKey={'userName'}
      />
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

export default GioiTinhPage;
