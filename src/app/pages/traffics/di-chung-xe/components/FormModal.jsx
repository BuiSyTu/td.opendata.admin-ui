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
  Spin,
  Empty,
  TimePicker,
  InputNumber
} from 'antd';
import { HOST_API, requestGET, requestPOST, requestPUT } from '../../../../../utils/basicAPI';
import { ToSlug } from '../../../../utils/slug';
import moment from 'moment';
const { TextArea } = Input;
const { Text } = Typography;
const { Option } = Select;
const ModalCategory = (props) => {
  const { modalVisible, setModalVisible, modalId, setModalId, typeModal, setTypeModal, setUpdate, currentUser } =
    props;
  const [form] = Form.useForm();
  const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [dataProvinceFrom, setDataProvinceFrom] = useState([]);
  const [dataDistrictFrom, setDataDistrictFrom] = useState([]);
  const [dataCommuneFrom, setDataCommuneFrom] = useState([]);
  const [dataProvinceTo, setDataProvinceTo] = useState([]);
  const [dataDistrictTo, setDataDistrictTo] = useState([]);
  const [dataCommuneTo, setDataCommuneTo] = useState([]);
  const [dataVehicleType, setDataVehicleType] = useState([]);

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const DATA_ROLE = [
    {
      id: 1,
      name: 'Hành khách',
    },
    {
      id: 2,
      name: 'Chủ xe',
    },
  ];


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        var res = await requestGET(`${HOST_API}/CarPool/${modalId}`);
        if (res?.data) {
          if (res.data.departureDate) {
            res.data.departureDate = moment(res.data.departureDate)
          }
          if (res.data.departureTimeText) {
            res.data.departureTimeText = moment(res.data.departureTimeText, "HH:mm")
          }
          var placeFrom = res.data?.placeDeparture ?? null
          var placeTo = res.data?.placeArrival ?? null
          if (placeTo?.provinceId) {
            res.data.departureProvinceId = placeTo?.provinceId
            handleChangeDepartureProvince(placeFrom?.provinceId)
          }
          if (placeFrom?.districtId) {
            res.data.departureDistrictId = placeFrom?.districtId
            handleChangeDepartureDistrict(placeFrom?.districtId)
          }
          if (placeTo?.provinceId) {
            res.data.arrivalProvinceId = placeTo?.provinceId
            handleChangeArrivalProvince(placeTo?.provinceId)
          }
          if (placeTo?.districtId) {
            res.data.arrivalDistrictId = placeTo?.districtId
            handleChangeArrivalDistrict(placeTo?.districtId)
          }
          res.data.departureCommuneId = res.data?.placeDeparture?.communeId ?? null
          res.data.arrivalCommuneId = res.data?.placeArrival?.communeId ?? null

          res.data.departurePlaceName = res.data?.placeDeparture?.placeName ?? null
          res.data.departureLatitude = res.data?.placeDeparture?.latitude ?? null
          res.data.departureLongitude = res.data?.placeDeparture?.longitude ?? null

          res.data.arrivalPlaceName = res.data?.placeArrival?.placeName ?? null
          res.data.arrivalLatitude = res.data?.placeArrival?.latitude ?? null
          res.data.arrivalLongitude = res.data?.placeArrival?.longitude ?? null

          form.setFieldsValue(res?.data);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    setDisable(typeModal == 'view' ? true : false);
    if (modalId > 0) {
      fetchData();
      fetchVehicleType();
      fetchProvince();
      fetchCurrent();
    }
    return () => { };
  }, [modalId]);

  const fetchCurrent = () => {
    if (currentUser) {
      form.setFieldsValue({ name: currentUser?.fullName ?? '' })
      form.setFieldsValue({ phoneNumber: currentUser?.phoneNumber ?? '' })
    }
  }


  const handleCancel = () => {
    form.resetFields();
    setTypeModal('');
    setModalId(0);
    setModalVisible(false);
  };
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = form.getFieldsValue(true);
      typeModal == 'edit' ? putData(formData) : postData(formData);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  const postData = async (data) => {
    try {
      setButtonLoading(true);
      var res = await requestPOST(`${HOST_API}/CarPool`, data);
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
      var res = await requestPUT(`${HOST_API}/CarPool/${modalId}`, data);
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

  const fetchProvince = async () => {
    var res = await requestGET(`${HOST_API}/Area?level=1&pageNumber=0&pageSize=100`);
    if (res && res.data) {
      setDataProvinceTo(res.data)
      setDataProvinceFrom(res.data)
    }
  }
;

  const fetchVehicleType = async () => {
    var res = await requestGET(`${HOST_API}/VehicleType?pageNumber=0&pageSize=100`);
    if (res && res.data) {
      setDataVehicleType(res.data)
    }
  }

  const handleChangeDepartureProvince = (val) => {
    if (val) {
      var url = `${HOST_API}/Area?level=2&parentId=${val}&pageNumber=0&pageSize=100`
      handleGetData(url, setDataDistrictFrom)
    }
    form.resetFields(['departureDistrictId', 'departureCommuneId']);
  };
  const handleChangeDepartureDistrict = (val) => {
    if (val) {
      var url = `${HOST_API}/Area?level=3&parentId=${val}&pageNumber=0&pageSize=100`
      handleGetData(url, setDataCommuneFrom)
    }
    form.resetFields(['departureCommuneId']);
  };
  const handleChangeArrivalProvince = (val) => {
    if (val) {
      var url = `${HOST_API}/Area?level=2&parentId=${val}&pageNumber=0&pageSize=100`
      handleGetData(url, setDataDistrictTo)
    }
    form.resetFields(['arrivalDistrictId', 'arrivalCommuneId']);
  };
  const handleChangeArrivalDistrict = (val) => {
    if (val) {
      var url = `${HOST_API}/Area?level=3&parentId=${val}&pageNumber=0&pageSize=100`
      console.log(url)
      handleGetData(url, setDataCommuneTo)
    }
    form.resetFields(['arrivalCommuneId']);
  };
  const handleGetData = async (url, handleSet) => {
    var res = await requestGET(url);
    if (res && res.data) {
      handleSet(res.data)
    }
  }


  return (
    <Modal
      visible={modalVisible}
      title={<Text style={{ fontWeight: '500', color: '#fff' }}>Đi chung xe</Text>}
      width='90%'
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
        <Form layout='vertical' form={form}>
          <div className='row'>
            <div className='col-4'>
              <Form.Item
                label='Tên'
                name='name'
                rules={[{ required: true, message: 'Không được để trống!' }]}
              >
                <Input disabled={disable} style={{ width: '100%', height: 32, borderRadius: 5 }} />
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item label="Vai trò" name="role" rules={[{ required: true, message: 'Không được để trống!' }]}>
                <Select>
                  {DATA_ROLE?.map((item) => {
                    return (
                      <Option key={item.id} value={item.name}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item
                label='Số điện thoại'
                name='phoneNumber'
                rules={[{ required: true, message: 'Không được để trống!' }]}
              >
                <Input disabled={disable} style={{ width: '100%', height: 32, borderRadius: 5 }} />
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item label="Mục đích" name="description">
                <TextArea style={{ width: '100%', height: 32, borderRadius: 5 }} placeholder="" rows={1} />
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item label="Loại phương tiện"
                name="vehicleTypeId"
                rules={[{ required: true, message: 'Không được để trống!' }]}>
                <Select
                  placeholder={'Loại phương tiện'}
                >
                  {dataVehicleType?.map((item) => {
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
              <Form.Item label="Số chỗ ngồi" name="seatCount" rules={[{ required: true, message: 'Không được để trống!' }]}>
                <InputNumber style={{ width: '100%', height: 32, borderRadius: 5 }} placeholder="Số chỗ ngồi" />
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item label="Giá vé" name="price" rules={[{ required: true, message: 'Không được để trống!' }]}>
                <InputNumber
                  formatter={value => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '50%' }}
                />
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item label="Ngày xuất phát" name="departureDate" rules={[{ required: true, message: 'Không được để trống!' }]}>
                <DatePicker format="DD/MM/YYYY" style={{ width: '50%' }} />
              </Form.Item>

            </div>
            <div className='col-4'>
              <Form.Item label="Giờ xuất phát" name="departureTimeText" rules={[{ required: true, message: 'Không được để trống!' }]}>
                <TimePicker format="HH:mm" style={{ width: '50%' }} />
              </Form.Item>
            </div>
            <Divider orientation="left" className="first">
              Nơi đi
            </Divider>
            <div className='col-4'>
              <Form.Item label="Tỉnh/Thành phố" name="departureProvinceId" rules={[{ required: true, message: 'Không được để trống!' }]}>
                <Select
                  showSearch
                  placeholder={'Chọn tỉnh/thành phố'}
                  filterOption={(input, option) => ToSlug(option.children.toLowerCase()).indexOf(ToSlug(input.toLowerCase())) >= 0}
                  onChange={handleChangeDepartureProvince}>
                  {dataProvinceFrom?.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.nameWithType}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item label="Quận/Huyện" name="departureDistrictId" rules={[{ required: true, message: 'Không được để trống!' }]}>
                <Select
                  showSearch
                  placeholder={'Chọn quận/huyện phố'}
                  filterOption={(input, option) => ToSlug(option.children.toLowerCase()).indexOf(ToSlug(input.toLowerCase())) >= 0}
                  onChange={handleChangeDepartureDistrict}>
                  {dataDistrictFrom?.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.nameWithType}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item label="Phường/Xã" name="departureCommuneId" rules={[{ required: true, message: 'Không được để trống!' }]}>
                <Select
                  showSearch
                  placeholder={'Chọn phường/xã phố'}
                  filterOption={(input, option) => ToSlug(option.children.toLowerCase()).indexOf(ToSlug(input.toLowerCase())) >= 0}
                >
                  {dataCommuneFrom?.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.nameWithType}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item label="Địa điểm" name="departurePlaceName" >
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} placeholder="Địa điểm" />
              </Form.Item>

            </div>
            <div className='col-4'>
              <Form.Item label="Kinh độ" name="departureLatitude" >
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} placeholder="Kinh độ" />
              </Form.Item>

            </div>
            <div className='col-4'>
              <Form.Item label="Vĩ độ" name="departureLongitude" >
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} placeholder="Vĩ độ" />
              </Form.Item>
            </div>
            <Divider orientation="left" className="second">
              Nơi đến
            </Divider>
            <div className='col-4'>
              <Form.Item label="Tỉnh/Thành phố" name="arrivalProvinceId" rules={[{ required: true, message: 'Không được để trống!' }]}>
                <Select
                  showSearch
                  placeholder={'Chọn tỉnh/thành phố'}
                  filterOption={(input, option) => ToSlug(option.children.toLowerCase()).indexOf(ToSlug(input.toLowerCase())) >= 0}
                  onChange={handleChangeArrivalProvince}>
                  {dataProvinceTo?.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.nameWithType}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item label="Quận/Huyện" name="arrivalDistrictId" rules={[{ required: true, message: 'Không được để trống!' }]}>
                <Select
                  showSearch
                  placeholder={'Chọn quận/huyện phố'}
                  filterOption={(input, option) => ToSlug(option.children.toLowerCase()).indexOf(ToSlug(input.toLowerCase())) >= 0}
                  onChange={handleChangeArrivalDistrict}>
                  {dataDistrictTo?.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.nameWithType}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item label="Phường/Xã" name="arrivalCommuneId" rules={[{ required: true, message: 'Không được để trống!' }]}>
                <Select
                  showSearch
                  placeholder={'Chọn phường/xã phố'}
                  filterOption={(input, option) => ToSlug(option.children.toLowerCase()).indexOf(ToSlug(input.toLowerCase())) >= 0}
                >
                  {dataCommuneTo?.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.nameWithType}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item label="Địa điểm" name="arrivalPlaceName">
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} placeholder="Địa điểm" />
              </Form.Item>

            </div>
            <div className='col-4'>
              <Form.Item label="Kinh độ" name="arrivalLatitude">
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} placeholder="Kinh độ" />
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item label="Vĩ độ" name="arrivalLongitude">
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} placeholder="Vĩ độ" />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ModalCategory;
