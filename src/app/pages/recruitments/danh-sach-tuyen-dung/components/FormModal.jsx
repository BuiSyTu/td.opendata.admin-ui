import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
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
} from 'antd';
import ImageUpload from '../../../../components/ImageUpload/index'
import { HOST_API, requestGET, requestPOST, requestPUT, HOST_FILE, HOST_API_Image } from '../../../../utils/basicAPI';
import moment from 'moment';
import { ToSlug } from '../../../../utils/slug'
import { handleImage, convertImage } from '../../../../utils/utils';

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;
const ModalCategory = (props) => {
  const { modalVisible, setModalVisible, modalId, setModalId, typeModal, setTypeModal, setUpdate } =
    props;
  const accessToken = useSelector((state) => state.auth.accessToken)
  const [form] = Form.useForm();
  const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [company, setCompany] = useState([]);
  const [jobtype, setJobtype] = useState([]);
  const [jobname, setJobname] = useState([]);
  const [salary, setSalary] = useState([]);
  const [jobposition, setJobposition] = useState([]);
  const [jobage, setJobage] = useState([]);
  const [gender, setGender] = useState([]);
  const [degree, setDegree] = useState([]);
  const [benefit, setBenefit] = useState([]);
  const [experience, setExperience] = useState([]);

  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [imageList, setImageList] = useState([])
  const [listBenefits, setListBenefits] = useState([])


  const [dataProvince, setDataProvince] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataCommune, setDataCommune] = useState([]);

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };



  useEffect(() => {
    const fetchData = async () => {
      const company = await requestGET(`${HOST_API}/company?pageNumber=1&pageSize=100&keySearch&orderBy`);
      setCompany(company?.data ?? []);
      const jobtype = await requestGET(`${HOST_API}/jobtype?pageNumber=1&pageSize=100&keySearch&orderBy`);
      setJobtype(jobtype?.data ?? []);
      const jobname = await requestGET(`${HOST_API}/jobname?pageNumber=1&pageSize=100&keySearch&orderBy`);
      setJobname(jobname?.data ?? []);
      const salary = await requestGET(`${HOST_API}/salary?pageNumber=1&pageSize=100&keySearch&orderBy`);
      setSalary(salary?.data ?? []);
      const jobposition = await requestGET(`${HOST_API}/jobposition?pageNumber=1&pageSize=100&keySearch&orderBy`);
      setJobposition(jobposition?.data ?? []);
      const jobage = await requestGET(`${HOST_API}/jobage?pageNumber=1&pageSize=100&keySearch&orderBy`);
      setJobage(jobage?.data ?? []);
      const gender = await requestGET(`${HOST_API}/gender?pageNumber=1&pageSize=100&keySearch&orderBy`);
      setGender(gender?.data ?? []);
      const degree = await requestGET(`${HOST_API}/degree?pageNumber=1&pageSize=100&keySearch&orderBy`);
      setDegree(degree?.data ?? []);
      const benefit = await requestGET(`${HOST_API}/benefit?pageNumber=1&pageSize=100&keySearch&orderBy`);
      setBenefit(benefit?.data ?? []);
      const experience = await requestGET(`${HOST_API}/experience?pageNumber=1&pageSize=100&keySearch&orderBy`);
      setExperience(experience?.data ?? []);

    };
    fetchData();
    return () => { };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        var res = await requestGET(`${HOST_API}/recruitment/${modalId}`);
        if (res?.data) {
          let _data = res.data;
          if (_data && _data.image) {
            setImageList(handleImage(_data?.image ?? '', HOST_FILE));
          }
          let listBenefit = []
          _data.recruitmentBenefit.map((i) => listBenefit.push(i.benefitId))
          _data.listBenefitId = listBenefit
          setListBenefits(listBenefit)
          _data.resumeApplyExpired = _data.resumeApplyExpired ? moment(_data.resumeApplyExpired) : null
          _data.provinceId = _data?.place?.provinceId ?? null
          _data.districtId = _data?.place?.districtId ?? null
          _data.communeId = _data?.place?.communeId ?? null
          _data.placeName = _data?.place?.placeName ?? null
          _data.latitude = _data?.place?.latitude ?? null
          _data.longitude = _data?.place?.longitude ?? null
          if (_data.provinceId) {
            handleGetData(2, _data.provinceId, setDataDistrict)
          }
          if (_data.districtId) {
            handleGetData(3, _data.districtId, setDataCommune)
          }
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
      fetchProvince()
    }
    return () => { };
  }, [modalId]);
  const handleCancel = () => {
    form.resetFields();
    setImageList([]);
    setListBenefits([])
    setTypeModal('');
    setModalId(0);
    setModalVisible(false);
  };


  const fetchProvince = async () => {
    var res = await requestGET(`${HOST_API}/Area?level=1&pageNumber=0&pageSize=100`);
    if (res && res.data) {
      setDataProvince(res.data)
    }
  }

  const handleGetData = async (level, val, handleSet) => {
    var url = `${HOST_API}/Area?level=${level}&parentId=${val}&pageNumber=0&pageSize=100`
    var res = await requestGET(url);
    if (res && res.data) {
      handleSet(res.data)
    }
  }

  const handleChangeProvince = (val) => {
    if (val) {
      handleGetData(2, val, setDataDistrict)
    }
    form.resetFields(['districtId', 'communeId']);
  };
  const handleChangeDistrict = (val) => {
    if (val) {
      handleGetData(3, val, setDataCommune)
    }
    form.resetFields(['communeId']);
  };

  const handleChangeCompany = (val) => {
    var img = company.find(i => i.id == val)
    form.setFieldsValue({ image: img?.image ?? '' })
  };


  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = form.getFieldsValue(true);
      console.log(imageList)
      if (imageList.length > 0) {
        formData.image = imageList[0]?.response?.data[0]?.url ?? imageList[0].path
      }
      else {
        formData.image = '';
      }
      let _listBenefit = []
      listBenefits.map((i) => {
        benefit.map((j) => {
          if (j.id == i) {
            _listBenefit.push({ "name": j.name, "benefitId": i })
          }
        })
      })
      formData.listBenefit = _listBenefit.length > 0 ? _listBenefit : null
      delete formData.recruitmentBenefit
      typeModal == 'edit' ? putData(formData) : postData(formData);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  const postData = async (data) => {
    try {
      setButtonLoading(true);
      var res = await requestPOST(`${HOST_API}/recruitment`, data);
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
      var res = await requestPUT(`${HOST_API}/recruitment/${modalId}`, data);
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
      scrollable={true}
      visible={modalVisible}
      title={<Text style={{ fontWeight: '500', color: '#fff' }}>Tin tuyển dụng</Text>}
      width="80%"
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
        <Form layout='vertical' form={form} labelAlign='left'>
          <div class="row">
            <div className='col-xxl-4'>
              <Form.Item
                label='Công ty '
                name='companyId'
                rules={[{ required: true, message: 'Không được để trống!' }]}
              >
                <Select
                  onChange={(val) => { handleChangeCompany(val) }}
                  style={{ width: '100%', height: 32, borderRadius: 5 }}
                >
                  {company.map((item, index) => {
                    return (
                      <Option key={item.id} value={item.id}>{item.name}</Option>
                    )
                  })}
                </Select>

              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item
                label='Số lượng tuyển'
                name='numberOfJob'
              >
                <Input disabled={disable} style={{ width: '100%', height: 32, borderRadius: 5 }} />
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item label='Tiêu đề' name='name'>
                <Input disabled={disable} rows={1} style={{ width: '100%', borderRadius: 5 }} />
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item label='Loại hình công việc' name='jobTypeId'>
                <Select
                  showSearch
                  placeholder="Loại hình công việc"
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {jobtype.map((item) => {
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
                label='Nghề nghiệp'
                name='jobNameId'>
                <Select
                  className="basic-multi-select"
                  classNamePrefix="select"
                  isMulti
                  showSearch
                  placeholder="Nghề nghiệp"
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {jobname.map((item) => {
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
                label='Mức lương'
                name='salaryId'>
                <Select
                  showSearch
                  placeholder="Mức lương"
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {salary.map((item) => {
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
                label='Vị trí'
                name='jobPositionId'>
                <Select
                  showSearch
                  placeholder="Vị trí công việc"
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {jobposition.map((item) => {
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
                label="Quyền lợi"
                name='listBenefitId'
              >
                <Select
                  style={{ width: '100%', borderRadius: 5 }}
                  mode="multiple"
                  onChange={(val) => setListBenefits(val)}
                >
                  {benefit.map((item, index) => {
                    return (
                      <Option key={item.id} value={item.id}>{item.name}</Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </div>
            <div class='col-4'>
              <Form.Item
                label="Hạn nộp hồ sơ"
                name="resumeApplyExpired"
              >
                <DatePicker placeholder="Chọn ngày" format='DD/MM/YYYY' />
              </Form.Item>
            </div>
            <div className='col-xxl-4'>
              <Form.Item
                label="Hình ảnh"
              >
                <ImageUpload
                  URL={`${HOST_API_Image}`}
                  fileList={imageList}
                  onChange={(e) => setImageList(e.fileList)}
                  headers={{
                    Authorization: `Bearer ${accessToken}`,
                  }}
                />
              </Form.Item>

            </div>
            <div className='col-4'>
              <Form.Item label='Mô tả công việc' name='Description'>
                <TextArea disabled={disable} rows={3} style={{ width: '100%', borderRadius: 5 }} />
              </Form.Item>
            </div>
            <Divider orientation="left" className="first">
              Yêu cầu
            </Divider>
            {/* <div style={{paddingTop: "5px", borderTop: "1px dashed gray"}}></div> */}
            <div className='col-4'>
              <Form.Item
                label="Giới tính"
                name="genderId"
              >
                <Select
                  style={{ width: '100%', height: 32, borderRadius: 5 }}
                >
                  {gender.map((item, index) => {
                    return (
                      <Option key={item.id} value={item.id}>{item.name}</Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item
                label="Độ tuổi"
                name="jobAgeId"
              >
                <Select

                  style={{ width: '100%', height: 32, borderRadius: 5 }}
                >
                  {jobage.map((item, index) => {
                    return (
                      <Option key={item.id} value={item.id}>{item.name}</Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item
                label="Bằng cấp"
                name="degreeId"

              >
                <Select

                  style={{ width: '100%', height: 32, borderRadius: 5 }}
                >
                  {degree.map((item, index) => {
                    return (
                      <Option key={item.id} value={item.id}>{item.name}</Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item
                label="Kinh nghiệm làm việc"
                name="experienceId"
              >
                <Select
                  style={{ width: '100%', height: 32, borderRadius: 5 }}
                >
                  {experience.map((item, index) => {
                    return (
                      <Option key={item.id} value={item.id}>{item.name}</Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className='col-4'>
              <Form.Item
                label="Yêu cầu khác"
                name="otherRequirement"
              >
                <TextArea rows={3} style={{ width: '100%', height: 'auto', borderRadius: 5 }} />
              </Form.Item>

            </div>
            <div className='col-4'>
              <Form.Item
                label="Hồ sơ bao gồm"
                name="resumeRequirement"
              >
                <TextArea rows={3} style={{ width: '100%', height: 'auto', borderRadius: 5 }} />
              </Form.Item>
            </div>
            <Divider orientation="left" className="second">
              Địa chỉ làm việc
            </Divider>
            <div className='col-4'>
              <Form.Item label="Tỉnh/Thành phố" name="provinceId"
                rules={[{ required: true, message: 'Không được để trống!' }]}
              >
                <Select
                  showSearch
                  placeholder={'Chọn tỉnh/thành phố'}
                  filterOption={(input, option) => ToSlug(option.toLowerCase()).indexOf(ToSlug(input.toLowerCase())) >= 0}
                  onChange={handleChangeProvince}>
                  {dataProvince?.map((item) => {
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
              <Form.Item label="Quận/Huyện" name="districtId"
                rules={[{ required: true, message: 'Không được để trống!' }]}
              >
                <Select
                  showSearch
                  placeholder={'Chọn quận/huyện phố'}
                  filterOption={(input, option) => ToSlug(option.toLowerCase()).indexOf(ToSlug(input.toLowerCase())) >= 0}
                  onChange={handleChangeDistrict}>
                  {dataDistrict?.map((item) => {
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
              <Form.Item label="Xã/Phường" name="communeId"
                rules={[{ required: true, message: 'Không được để trống!' }]}
              >
                <Select
                  showSearch
                  placeholder={'Chọn xã/phường'}
                  filterOption={(input, option) => ToSlug(option.toLowerCase()).indexOf(ToSlug(input.toLowerCase())) >= 0}
                  onChange={handleChangeDistrict}>
                  {dataCommune?.map((item) => {
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
              <Form.Item
                label="Địa chỉ"
                name="placeName"
                rules={[{ required: true, message: 'Không được để trống!' }]}
              >
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
              </Form.Item>

            </div>
            <div className='col-4'>
              <Form.Item
                label="Kinh độ"
                name="latitude"
                rules={[{ required: true, message: 'Không được để trống!' }]}
              >
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
              </Form.Item>

            </div>
            <div className='col-4'>
              <Form.Item
                label="Vĩ độ"
                name="longitude"
                rules={[{ required: true, message: 'Không được để trống!' }]}
              >
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
              </Form.Item>
            </div>
            <Divider orientation="left" className="first">
              Liên hệ
            </Divider>
            <div className='col-4'>
              <Form.Item
                label="Tên người liên hệ"
                name="contactName"
              >
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
              </Form.Item>

            </div>
            <div className='col-4'>
              <Form.Item
                label="Email liên hệ"
                name="contactEmail"
              >
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
              </Form.Item>

            </div>
            <div className='col-4'>
              <Form.Item
                label="SĐT liên hệ"
                name="contactPhone"
              >
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
              </Form.Item>

            </div>
            <div className='col-4'>
              <Form.Item
                label="Địa chỉ liên hệ"
                name="contactAdress"
              >
                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
              </Form.Item>

            </div>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ModalCategory;
