import {useEffect, useState} from 'react';
import { useSelector} from 'react-redux';
import {
  Form,
  Button,
  Input,
  notification,
  Typography,
  Select,
  Modal,
  DatePicker,
  Spin,
} from 'antd';
import {
  HOST_API,
  HOST_API_Image,
  HOST_FILE,
  requestGET,
  requestPOST,
} from '../../../../utils/basicAPI';
import ImageUpload from '../../../../components/ImageUpload';
import {handleImage} from '../../../../utils/utils';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');
const {Text} = Typography;
const {Option} = Select;
const ModalCategory = (props) => {
  const {modalVisible, setModalVisible, modalId, setModalId, typeModal, setTypeModal, setUpdate} =
    props;
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [form] = Form.useForm();
  // eslint-disable-next-line no-unused-vars
  const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [identityTypes, setIdentityTypes] = useState([]);
  const [genders, setGenders] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [religions, setReligions] = useState([]);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);

  const [provinceId, setProvinceId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [image, setImage] = useState([]);

  // const [roles, setRoles] = useState([]);

  const layout = {
    labelCol: {xl: 8, xs: 24},
    wrapperCol: {xl: 16, xs: 24},
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        var res = await requestGET(`${HOST_API}/User/${modalId}`);
        if (res?.data) {
          var _data = res?.data;
          _data.dateOfBirth = _data?.dateOfBirth ? moment(_data.dateOfBirth) : null;
          _data.identityDateOfIssue = _data?.identityDateOfIssue
            ? moment(_data.identityDateOfIssue)
            : null;
          if (_data?.avatarUrl) {
            setImage(handleImage(_data?.avatarUrl ?? '', HOST_FILE));
          }

          form.setFieldsValue(_data);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    setDisable(typeModal === 'view' ? true : false);
    if (modalId > 0) {
      fetchData();
    }
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalId]);

  useEffect(() => {
    // const fetchRoles = async () => {
    //   const res = await requestGET(`${HOST_API}/Role?pageNumber=1&pageSize=100&keySearch&orderBy`);
    //   if (res && res.data) {
    //     let tmp = [];
    //     res.data.forEach((i) => {
    //       tmp.push({label: i.name, value: i.name});
    //     });
    //     setRoles(tmp);
    //   }
    // };

    const fetchDataIdentityType = async () => {
      const res = await requestGET(
        `${HOST_API}/IdentityType?pageNumber=1&pageSize=100&keySearch&orderBy`
      );
      if (res && res.data) {
        setIdentityTypes(res.data);
      }
    };

    const fetchDataGender = async () => {
      const res = await requestGET(
        `${HOST_API}/Gender?pageNumber=1&pageSize=100&keySearch&orderBy`
      );
      if (res && res.data) {
        setGenders(res.data);
      }
    };

    const fetchReligion = async () => {
      const res = await requestGET(
        `${HOST_API}/Religion?pageNumber=1&pageSize=100&keySearch&orderBy`
      );
      if (res && res.data) {
        setReligions(res.data);
      }
    };

    const fetchMaritalStatus = async () => {
      const res = await requestGET(
        `${HOST_API}/MaritalStatus?pageNumber=1&pageSize=100&keySearch&orderBy`
      );
      if (res && res.data) {
        setMaritalStatus(res.data);
      }
    };
    //fetchRoles();
    fetchMaritalStatus();
    fetchReligion();
    fetchDataGender();
    fetchDataIdentityType();
    return () => {};
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await requestGET(`${HOST_API}/Area?level=1&pageNumber=0&pageSize=100`);
      if (res && res.data) setProvinces(res.data);
    };
    fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    if (provinceId) {
      const fetchData = async () => {
        const res = await requestGET(
          `${HOST_API}/Area?level=2&parentId=${provinceId}&pageNumber=0&pageSize=100`
        );
        if (res && res.data) setDistricts(res.data);
      };
      fetchData();
    }
    return () => {};
  }, [provinceId]);

  useEffect(() => {
    if (districtId) {
      const fetchData = async () => {
        const res = await requestGET(
          `${HOST_API}/Area?level=3&parentId=${districtId}&pageNumber=0&pageSize=100`
        );
        if (res && res.data) setCommunes(res.data);
      };
      fetchData();
    }
    return () => {};
  }, [districtId]);

  const handleCancel = () => {
    form.resetFields();
    setTypeModal('');
    setModalId(0);
    setModalVisible(false);
  };
  const handleOk = async () => {
    try {
      await form.validateFields();
      const formData = form.getFieldsValue(true);
      if (image?.length > 0) {
        if (modalId) {
          formData.avatarUrl = image[0].url;
        } else {
          formData.avatarUrl = image[0]?.response?.data[0]?.url;
        }
      }
      typeModal === 'edit' ? putData(formData) : postData(formData);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  const postData = async (data) => {
    try {
      setButtonLoading(true);
      var res = await requestPOST(`${HOST_API}/User`, data);
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
      delete data?.commune;
      delete data?.district;
      delete data?.gender;
      delete data?.identityType;
      delete data?.maritalStatus;
      delete data?.province;
      delete data?.religion;
      var res = await requestPOST(`${HOST_API}/User/${modalId}`, data);
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
      title={<Text style={{fontWeight: '500', color: '#fff'}}>Giới tính</Text>}
      width='60%'
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={<i className='las la-times' style={{color: '#fff', fontSize: 20}}></i>}
      footer={[
        typeModal === 'view' ? (
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
            icon={<i className='las la-save' style={{color: '#fff'}}></i>}
            onClick={() => {
              handleOk();
            }}
            loading={buttonLoading}
          >
            <Text style={{color: '#FFF', paddingLeft: 5}}> {'Lưu'}</Text>
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
          icon={<i className='las la-times' style={{color: '#757575'}}></i>}
          onClick={() => {
            handleCancel();
          }}
        >
          <Text style={{color: '#757575', paddingLeft: 5}}>
            {' '}
            {typeModal === 'view' ? 'Đóng' : 'Hủy'}
          </Text>
        </Button>,
      ]}
    >
      <Spin spinning={isLoading}>
        <Form
          //layout='vertical'
          labelAlign='left'
          {...layout}
          form={form}
        >
          <div className='row gx-10'>
            <div className='col-xl-6'>
              <Form.Item label='Ảnh đại diện'>
                <div className='row'>
                  <ImageUpload
                    URL={`${HOST_API_Image}`}
                    fileList={image}
                    onChange={(e) => setImage(e.fileList)}
                    headers={{
                      Authorization: `Bearer ${accessToken}`,
                    }}
                  />
                </div>
              </Form.Item>
            </div>
            <div className='col-xl-6'>
              <div className='row'>
                <div className='col-xl-12'>
                  <Form.Item
                    label='Họ, tên đệm'
                    name='lastName'
                    //rules={[{required: true, message: 'Không được để trống!'}]}
                  >
                    <Input placeholder='Họ, tên đệm' />
                  </Form.Item>
                </div>
                <div className='col-xl-12'>
                  <Form.Item
                    label='Tên'
                    name='firstName'
                    rules={[{required: true, message: 'Không được để trống!'}]}
                  >
                    <Input placeholder='Tên' />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className='col-xl-6'>
              <Form.Item
                label='Tên đăng nhập'
                name='userName'
                rules={[{required: true, message: 'Không được để trống!'}]}
              >
                <Input placeholder='Tên đăng nhập' />
              </Form.Item>
            </div>
            <div className='col-xl-6'>
              <Form.Item label='Số điện thoại' name='phoneNumber'>
                <Input placeholder='' />
              </Form.Item>
            </div>
            <div className='col-xl-6'>
              <Form.Item label='Email' name='email'>
                <Input placeholder='' />
              </Form.Item>
            </div>
            <div className='col-xl-6'>
              <Form.Item label='Ngày sinh' name='dateOfBirth'>
                <DatePicker
                  format='DD/MM/YYYY'
                  locale='vi'
                  placeholder='Ngày sinh'
                  style={{width: '100%'}}
                />
              </Form.Item>
            </div>
            <div className='col-xl-6'>
              <Form.Item label='Giới tính' name='genderId'>
                <Select
                  showSearch
                  placeholder='Giới tính'
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {genders.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-xl-6'>
              <Form.Item label='Tôn giáo' name='religionId'>
                <Select
                  showSearch
                  placeholder='Tôn giáo'
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {religions.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-xl-6'>
              <Form.Item label='Tình trạng hôn nhân' name='maritalStatusId'>
                <Select
                  showSearch
                  placeholder='Tình trạng hôn nhân'
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {maritalStatus.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-xl-6'>
              <Form.Item label='Quốc tịch' name='nationality'>
                <Input placeholder='' />
              </Form.Item>
            </div>

            <div className='col-xl-6'>
              <Form.Item label='Loại giấy tờ' name='identityTypeId'>
                <Select
                  showSearch
                  placeholder='Loại giấy tờ'
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {identityTypes.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-xl-6'>
              <Form.Item label='Số giấy tờ' name='identityNumber'>
                <Input placeholder='' />
              </Form.Item>
            </div>
            <div className='col-xl-6'>
              <Form.Item label='Ngày cấp' name='identityDateOfIssue'>
                <DatePicker format='DD/MM/YYYY' placeholder='Ngày cấp' style={{width: '100%'}} />
              </Form.Item>
            </div>
            <div className='col-xl-6'>
              <Form.Item label='Nơi cấp' name='identityPlace'>
                <Input placeholder='' />
              </Form.Item>
            </div>
            <div className='col-xl-6'>
              <Form.Item label='Tỉnh/Thành phố' name='provinceId'>
                <Select
                  showSearch
                  placeholder='Tỉnh/Thành phố'
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(val) =>
                    setProvinceId(val) + form.resetFields(['districtId', 'communeId'])
                  }
                >
                  {provinces.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.nameWithType}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-xl-6'>
              <Form.Item label='Quận/Huyện' name='districtId'>
                <Select
                  showSearch
                  placeholder='Quận/Huyện'
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(val) => setDistrictId(val) + form.resetFields(['communeId'])}
                >
                  {districts.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.nameWithType}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-xl-6'>
              <Form.Item label='Phường/Xã' name='communeId'>
                <Select
                  showSearch
                  placeholder='Phường/Xã'
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {communes.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.nameWithType}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-xl-6'>
              <Form.Item label='Thôn/Xóm/Số nhà' name='address'>
                <Input placeholder='Địa chỉ' />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ModalCategory;
