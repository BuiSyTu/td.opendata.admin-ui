import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  notification,
  Typography,
  Select,
  Modal,
  Checkbox,
  Divider,
  DatePicker,
  FormModal,
  Spin,
  Empty,
  Image,
  Popconfirm
} from 'antd';
import { HOST_API, requestGET, requestPOST, requestPUT, HOST_FILE, requestDELETE, HOST_API_Image } from '../../../../utils/basicAPI';
import Cookies from 'js-cookie';
import TableList from '../../../../components/TableList';
import { handleImage, convertImage } from '../../../../../utils/utils';
import ImageUpload from '../../../../components/ImageUpload';
// import ModalTrip from '../components/ModalTrip';

const { TextArea } = Input;
const { Text } = Typography;
const { Option } = Select;
const { Search } = Input;

const ModalCategory = (props) => {
  const { modalVisible, setModalVisible, modalId, setModalId, typeModal, setTypeModal, setUpdate } =
    props;
  const [form] = Form.useForm();
  const [disable, setDisable] = useState(false);
  const [size, setSize] = useState(10);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [vehicletype, setVehicleType] = useState([]);
  const [carutility, setCarUtility] = useState([]);
  const [listCarUtility, setListCarUtility] = useState([]);
  const [logoList, setLogoList] = useState([]);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagesList, setImagesList] = useState([]);
  const [trips, setTrips] = useState([]);
  const { Text } = Typography
  const [company, setCompany] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const token = Cookies.get('user') ? JSON.parse(Cookies.get('user')).token : '';

  const [modalIdTrip, setModalIdTrip] = useState(null);
  const [updateTrip, setUpdateTrip] = useState(false);
  const [modalVisibleTrip, setModalVisibleTrip] = useState(false);
  const [typemodaltrip, setTypeModalTrip] = useState('');

  const columns = [
        {
          title: 'STT',
          dataIndex: '',
          key: '',
          align: 'center',
          render: (text, record, index) => {
            return (
              <Text style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {index + 1}
              </Text>
            );
          },
          width: '5%',
        },
        {
          title: 'Tên chuyến đi',
          dataIndex: 'name',
          key: 'name',
          width: '15%',
        },
        {
          title: 'Giá',
          dataIndex: 'companyName',
          key: 'companyName',
          width: '20%',
        },
        {
          title: 'Thời gian khởi hành',
          dataIndex: 'timeStart',
          key: 'timeStart',
          width: '20%',
        },
        {
          title: 'Thời gian di chuyển',
          dataIndex: 'duration',
          key: 'duration',
          width: '10%',
        },
        {
          title: 'Thao tác',
          width: '15%',
          dataIndex: '',
          key: '',
          align: 'center',
          render: (text, record) => (
            <div>
              <a
                className='btn btn-light-success m-btn m-btn--icon btn-sm m-btn--icon-only'
                data-toggle='m-tooltip'
                title='Xem'
                onClick={() => {
                  handleViewTrip(Number(record.id));
                }}
              >
                <i className='la la-eye' style={{ marginLeft: -7 }}></i>
              </a>
              <a
                style={{ marginLeft: 10 }}
                className='btn btn-light-primary m-btn m-btn--icon btn-sm m-btn--icon-only'
                data-toggle='m-tooltip'
                title='Sửa'
                onClick={() => {
                  handleEditTrip(Number(record.id));
                }}
              >
                <i className='la la-edit' style={{ marginLeft: -7 }}></i>
              </a>
              <Popconfirm
                title='Xóa dữ liệu？'
                okText='Ok'
                cancelText='Hủy'
                onConfirm={() => {
                  handleDeleteTrip(Number(record.id));
                }}
              >
                <a
                  style={{ marginLeft: 10 }}
                  className='btn btn-light-danger m-btn m-btn--icon btn-sm m-btn--icon-only'
                  data-toggle='m-tooltip'
                  title='Xóa'
                >
                  <i className='la la-trash' style={{ marginLeft: -7 }}></i>
                </a>
              </Popconfirm>
            </div>
          ),
        },
      ];
 
  const handleEditTrip = (id) => {
    setModalIdTrip(id);
    setTypeModalTrip('edit');
    setModalVisibleTrip(true);
  };

  const handleViewTrip = (id) => {
    setModalIdTrip(id);
    setTypeModalTrip('view');
    setModalVisibleTrip(true);
  };

  const handleDeleteTrip = async (id) => {
    var res = await requestDELETE(`${HOST_API}/trip/${id}`);
    if (res) {
      notification.success({
        message: 'Xóa thành công!',
        duration: 1,
        placement: 'bottomRight',
      });
      setUpdateTrip(true);
    } else {
      notification.error({
        message: `Thất bại!`,
        description: 'Xóa không thành công.',
      });
    }
  };

  const DATA_STATUS = [
    {
      id: 1,
      status: true,
      name: 'Đang hoạt động',
    },
    {
      id: 2,
      status: false,
      name: 'Ngừng hoạt động',
    },
  ];

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  useEffect(() => {
    const fetchData = async () => {
      const vehicletype = await requestGET(`${HOST_API}/vehicletype?pageNumber=1&pageSize=100&keySearch&orderBy`);
      setVehicleType(vehicletype?.data ?? []);
      const company = await requestGET(`${HOST_API}/company?pageNumber=1&pageSize=100&keySearch&orderBy`);
      setCompany(company?.data ?? []);
      const carutility = await requestGET(`${HOST_API}/carutility?pageNumber=1&pageSize=100&keySearch&orderBy`);
      setCarUtility(carutility?.data ?? []);
    }
    fetchData();
    return () => { };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        var res = await requestGET(`${HOST_API}/vehicle/${modalId}`);
        var res_1 = await requestGET(`${HOST_API}/Trip?vehicleId=${modalId}&keySearch=${inputValue}&pageNumber=${offset}&pageSize=${size}`);
        if (res?.data) {
          setData(res.data);
          if (res?.data && res?.data?.image) {
            setLogoList(handleImage(res.data?.image ?? '', HOST_FILE));
          }
          if (res?.data && res?.data.images) {
            setImagesList(handleImage(res?.data?.images ?? '', HOST_FILE));
          }
          let _data = res.data;
          let listCarUtility = []
          _data.carUtilities.map((i) => listCarUtility.push(i.id))
          _data.listCarUtilityId = listCarUtility
          setListCarUtility(listCarUtility)
          form.setFieldsValue(res?.data);
        }
        if (res_1?.data) {
          setTrips(res_1.data)
          setCount(res_1?.totalCount ?? 0);
        }
        setIsLoading(false);
        setLoading(false)
      } catch (error) {
        setIsLoading(false);
        setLoading(false);
      }
    };
    setDisable(typeModal == 'view' ? true : false);
    if (modalId > 0) {
      fetchData();
    }
    return () => { };
  }, [modalId]);

  const handleCancel = () => {
    form.resetFields();
    setTypeModal('');
    setModalId(0);
    setListCarUtility([])
    setImagesList([]);
    setLogoList([])
    setData([]);
    setTrips([]);
    setModalVisible(false);
  };

  const handleOk = async () => {
    try {
      const formData = form.getFieldsValue(true);
      let _listCarUtility = []
      listCarUtility.map((i) => {
        carutility.map((j) => {
          if (j.id == i) {
            _listCarUtility.push(i)
          }
        })
      })
      if (logoList.length > 0) {
        form.setFieldsValue({ image: logoList[0]?.response?.data[0]?.url ?? logoList[0].path })
      }
      if (imagesList.length > 0) {
        var images = convertImage(imagesList)
        form.setFieldsValue({ images: images })
      }

      formData.carUtilities = _listCarUtility.length > 0 ? _listCarUtility : null
      typeModal == 'edit' ? putData(formData) : postData(formData);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  

  const postData = async (data) => {
    try {
      setButtonLoading(true);
      var res = await requestPOST(`${HOST_API}/vehicle`, data);
      if (res) {
        notification.success({
          message: 'Thêm mới thành công!',
          duration: 1,
        });
      } else {
        notification.error({
          message: `Lỗi ${res}`,
          description: `${res}`,
        });
      }
      setButtonLoading(false);
    } catch (error) {
      setButtonLoading(false);
    }
    setUpdate(true);
    handleCancel();
  };

  const putData = async (data) => {
    try {
      setButtonLoading(true);
      var res = await requestPUT(`${HOST_API}/vehicle/${modalId}`, data);
      if (res) {
        notification.success({
          message: 'Cập nhập thành công!',
          duration: 1,
        });
      } else {
        notification.error({
          message: 'Thất bại!',
          description: 'Xảy ra lỗi trong quá trình thực hiện!',
        });
      }
      setButtonLoading(false);
    } catch (error) {
      setButtonLoading(false);
    }
    setUpdate(true);
    handleCancel();
  };

  return (
    <Modal
      visible={modalVisible}
      title={<Text style={{ fontWeight: '500', color: '#fff' }}>Phương tiện</Text>}
      width='100%'
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={<i className='las la-times' style={{ color: '#fff', fontSize: 20 }}></i>}
      footer={[
        typeModal == 'view' ? (
          <></>
        ) : (
          <Button
            key='Ok'
            type='primary'
            htmlType='submit'
            size='middle'
            style={{
              borderRadius: 5,
              padding: '5px 12px',
              backgroundColor: '#34bfa3',
              borderColor: '#34bfa3',
            }}
            icon={<i className='las la-save' style={{ color: '#fff' }}></i>}
            onClick={() => {
              handleOk();
            }}
            loading={buttonLoading}
          >
            <Text style={{ color: '#FFF', paddingLeft: 5 }}> {'Lưu'}</Text>
          </Button>
        ),
        <Button
          key='Cancle'
          type='primary'
          size='middle'
          style={{
            borderRadius: 5,
            padding: '5px 12px',
            backgroundColor: '#FAFAFA',
            borderColor: '#BDBDBD',
          }}
          icon={<i className='las la-times' style={{ color: '#757575' }}></i>}
          onClick={() => {
            handleCancel();
          }}
        >
          <Text style={{ color: '#757575', paddingLeft: 5 }}>
            {' '}
            {typeModal == 'view' ? 'Đóng' : 'Hủy'}
          </Text>
        </Button>,
      ]}
    >
      <Spin spinning={isLoading}>
        <Form layout='vertical' labelAlign='left' form={form}>
          <div className='row'>
            <div className='col-4'>
              <Form.Item
                label='Tên'
                name='name'
                rules={[{ required: true, message: 'Không được để trống!' }]}
              >
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item
                label='Tài xế'
                name='driverName'
              >
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item
                label='Số điện thoại'
                name='driverPhone'
              >
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item
                label='Số ghế'
                name='seatLimit'
              >
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item
                label='Loại ghế'
                name='seatType'
              >
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item
                label='Icon'
                name='icon'
              >
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item
                label='Tiện ích'
                name='listCarUtilityId'
              >
                <Select
                  style={{ width: '100%', borderRadius: 5 }}
                  mode="multiple"
                  onChange={(val) => setListCarUtility(val)}
                >
                  {carutility.map((item, index) => {
                    return (
                      <Option key={item.id} value={item.id}>{item.name}</Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item
                label='Công ty'
                name='companyId'>
                <Select
                  showSearch
                  placeholder="Công ty"
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {company.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item
                label='Biển số'
                name='registrationPlate'
              >
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item
                label='Loại phương tiện'
                name='vehicleTypeId'>
                <Select
                  showSearch
                  placeholder="Loại phương tiện"
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {vehicletype.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item
                label='Trạng thái'
                name='status'
                initialValue={form.getFieldValue('status') ? (form.getFieldValue('status') == true ? 'Đang hoạt động' : 'Dừng hoạt động') : 'Dừng hoạt động'}
              >
                <Select
                  showSearch
                  placeholder="Trạng thái"
                  style={{ fontWeight: '500' }} >
                  {DATA_STATUS.map((item) => {
                    return (
                      <Option key={item.id} value={item.status}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item
                label='Mô tả'
                name='description'
              >
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item
                label='Ảnh đại diện'
                name='image'
              >
                <ImageUpload
                  URL={`${HOST_API_Image}`}
                  fileList={logoList}
                  onChange={(e) => setLogoList(e.fileList)}
                  headers={{
                    Authorization: `Bearer ${token}`,
                  }}
                />
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item
                label='Hình ảnh'
                name='images'
              >
                <ImageUpload
                  multiple={true}
                  URL={`${HOST_API_Image}`}
                  fileList={imagesList}
                  onChange={(e) => setImagesList(e.fileList)}
                  headers={{
                    Authorization: `Bearer ${token}`,
                  }}
                />
              </Form.Item>
            </div>
            <Divider orientation="left" className="second">
              Danh sách chuyến xe
            </Divider>
            <div>
              <div className='card mb-5 mb-xl-12 py-5'>
                <Row justify='space-between' style={{ alignItems: 'center', padding: '5px 10px' }}>
                  <Col span={16} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Search
                      style={{ width: '40%', height: 35, borderRadius: 10 }}
                      placeholder='Tìm kiếm'
                      onSearch={(e) => {
                        setInputValue(e);
                      }}
                    />
                  </Col>
                  <Col span={8} style={{ textAlign: 'right' }}>
                    <a
                      className=' btn btn-success btn-sm m-btn m-btn--icon'
                      onClick={() => {
                        setModalVisibleTrip(true);
                      }}
                    >
                      <i className='bi bi-plus-square'></i> Thêm
                    </a>
                  </Col>
                </Row>
                <Divider style={{ margin: '10px 0' }} />
                <Row>
                  <TableList
                    dataTable={trips}
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
              {/* <ModalTrip
                modalVisible={modalVisibleTrip}
                setModalVisible={setModalVisibleTrip}
                modalId={modalIdTrip}
                setModalId={setModalIdTrip}
                typeModal={typemodaltrip}
                setTypeModal={setTypeModalTrip}
                setUpdate={setUpdateTrip}
              /> */}
            </div>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ModalCategory;
