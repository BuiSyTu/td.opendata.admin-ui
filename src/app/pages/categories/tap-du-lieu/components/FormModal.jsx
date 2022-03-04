import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tabs,
  Typography,
  Upload,
  message,
  notification,
} from 'antd'
import { InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

import CategoryApi from '../../../../apis/CategoryApi.js'
import DataTypeApi from '../../../../apis/DataTypeApi'
import DatasetApi from '../../../../apis/DatasetApi'
import FunctionalButton from './FunctionalButton'
import OrganizationApi from '../../../../apis/OrganizationApi'
import ProviderTypeApi from '../../../../apis/ProviderTypeApi'
import { toObject } from '../../../../utils/common'

const { TextArea } = Input
const { Text } = Typography
const { Option } = Select
const { TabPane } = Tabs
const { Dragger } = Upload
const datasetApi = new DatasetApi()
const categoryApi = new CategoryApi()
const organizationApi = new OrganizationApi()
const providerTypeApi = new ProviderTypeApi()
const dataTypeApi = new DataTypeApi()

const ModalCategory = (props) => {
  const { modalVisible, setModalVisible, modalId, setModalId, typeModal, setTypeModal, setUpdate, disableDataTab, setDisableDataTab, tabKey, setTabKey } = props
  const [form] = Form.useForm()
  const [disable, setDisable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)

  const [categories, setCategories] = useState([])
  const [organizations, setOrganizations] = useState([])
  const [providerTypes, setProviderTypes] = useState([])
  const [dataTypes, setDataTypes] = useState([])
  const [dataTypeCode, setDataTypeCode] = useState('excel')
  const [dataPreview, setDataPreview] = useState([])
  const [columnPreview, setColumnPreview] = useState([])
  const [disableTablePreview, setDisableTablePreview] = useState(true)

  const layout = {
    labelCol: { span: 22 },
    wrapperCol: { span: 22 },
  }

  const uploadProps = {
    name: 'file',
    multiple: false,
    action: 'https://192.168.2.169:5001/api/v1/attachmenthandles/excel',
    method: 'POST',
    onChange(info) {
      console.log({info})

      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await categoryApi.getAll()
      if (res?.data) {
        setCategories(res?.data)
      }
    }

    const fetchOrganizations = async () => {
      const res = await organizationApi.getAll()
      if (res?.data) {
        setOrganizations(res?.data)
      }
    }

    const fetchProviderTypes = async () => {
      const res = await providerTypeApi.getAll()
      if (res?.data) {
        setProviderTypes(res?.data)
      }
    }

    const fetchDataTypes = async () => {
      const res = await dataTypeApi.getAll()
      if (res?.data) {
        setDataTypes(res?.data)
      }
    }

    fetchCategories()
    fetchOrganizations()
    fetchProviderTypes()
    fetchDataTypes()
    return () => { }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        var res = await datasetApi.getById(modalId)
        if (res?.data) {
          form.setFieldsValue(res?.data)
        }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }

    setDisable(typeModal === 'view' ? true : false)

    if (modalId !== '') {
      fetchData()
    }
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalId])

  const handleCancel = () => {
    form.resetFields()
    setTypeModal('')
    setDisableDataTab(true)
    setTabKey('information')
    setModalId('')
    setModalVisible(false)
  }

  const handleOk = async () => {
    try {
      await form.validateFields()
      const formData = form.getFieldsValue(true)

      const headerObject = Array.isArray(formData.headers) ? toObject(formData.headers, 'key', 'value') : {}

      const bodyData = {
        ...formData,
        datasetAPIConfig: {
          method: formData?.method ?? '',
          url: formData?.url ?? '',
          headers: Object.keys(headerObject).length > 0 ? headerObject.toString() : '',
          dataKey: formData?.dataKey ?? '',
          tableName: formData?.tableName ?? '',
          data: formData?.data ?? '',
        }
      }

      typeModal === 'edit' ? putData(bodyData) : postData(bodyData)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  const handleChangeDataType = (value, event) => {
    setDataTypeCode(event.code.toLowerCase())
    setDisableDataTab(false)
  }

  const postData = async (data) => {
    try {
      setButtonLoading(true)
      var res = await datasetApi.add(data)
      if (res) {
        notification.success({
          message: 'Thêm mới thành công!',
          duration: 1,
        })
      } else {
        notification.error({
          message: `Lỗi ${res}`,
          description: `${res}`,
        })
      }
      setButtonLoading(false)
    } catch (error) {
      setButtonLoading(false)
    }
    setUpdate(true)
    handleCancel()
  }

  const putData = async (data) => {
    try {
      setButtonLoading(true)
      var res = await datasetApi.update(modalId, data)
      if (res) {
        notification.success({
          message: 'Cập nhập thành công!',
          duration: 1,
        })
      } else {
        notification.error({
          message: 'Thất bại!',
          description: 'Xảy ra lỗi trong quá trình thực hiện!',
        })
      }
      setButtonLoading(false)
    } catch (error) {
      setButtonLoading(false)
    }
    setUpdate(true)
    handleCancel()
  }

  const handleTabClick = (key, event) => {
    setTabKey(key)
  }

  return (
    <Modal
      width={1200}
      visible={modalVisible}
      title={<Text style={{ fontWeight: '500', color: '#fff' }}>Tập dữ liệu</Text>}
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={<i className='las la-times' style={{ color: '#fff', fontSize: 20 }}></i>}
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
            icon={<i className='las la-save' style={{ color: '#fff' }}></i>}
            onClick={() => {
              handleOk()
            }}
            loading={buttonLoading}
          >
            <Text style={{ color: '#FFF', paddingLeft: 5 }}> {'Lưu'}</Text>
          </Button>
        ),
        <Button
          key='Cancel'
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
            handleCancel()
          }}
        >
          <Text style={{ color: '#757575', paddingLeft: 5 }}>
            {' '}
            {typeModal === 'view' ? 'Đóng' : 'Hủy'}
          </Text>
        </Button>,
      ]}
    >
      <Spin spinning={isLoading}>
        <Form
          layout='vertical'
          {...layout}
          form={form}
          initialValues={{
            url: 'https://api.hanhchinhcong.net/covidnew/QuocTichs',
            method: 'GET',
            headers: [
              {key: 'Authorization', value: 'Bearer 3bcd9fb7-2e0e-3adb-8ba9-ecab0e37916f'}
            ],
            name: 'abc',
            dataKey: 'data',
            dataTypeId: '10090000-61d2-00d8-0224-08d9d1b30b4b',
          }}
        >
          <Tabs
            activeKey={tabKey}
            onTabClick={(key, event) => handleTabClick(key, event)}
          >
            <TabPane tab='Thông tin' key='information'>
              <Row>
                <Col span={12}>
                  <Form.Item
                    label='Tên'
                    name='name'
                    rules={[{ required: true, message: 'Không được để trống!' }]}
                  >
                    <Input disabled={disable} style={{ width: '100%', height: 32, borderRadius: 5 }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label='Mã'
                    name='code'
                  >
                    <Input disabled={disable} style={{ width: '100%', height: 32, borderRadius: 5 }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Form.Item
                    label='Tiêu hiển thị'
                    name='title'
                  >
                    <Input disabled={disable} style={{ width: '100%', height: 32, borderRadius: 5 }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label='Tag'
                    name='tags'
                  >
                    <Input disabled={disable} style={{ width: '100%', height: 32, borderRadius: 5 }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Form.Item label='Lĩnh vực' name='categoryId'>
                    <Select
                      showSearch
                      placeholder="Chọn lĩnh vực"
                    >
                      {categories.map(category => {
                        return (
                          <Option key={category.id} value={category.id}>
                            {category.name}
                          </Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Tổ chức' name='organizationId'>
                    <Select
                      showSearch
                      placeholder="Chọn tổ chức"
                    >
                      {organizations.map(organization => {
                        return (
                          <Option key={organization.id} value={organization.id}>
                            {organization.name}
                          </Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Form.Item label='Hình thức cung cấp' name='providerTypeId'>
                    <Select
                      showSearch
                      placeholder="Chọn hình thức cung cấp"
                    >
                      {providerTypes.map(providerType => {
                        return (
                          <Option key={providerType.id} value={providerType.id}>
                            {providerType.name}
                          </Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Loại dữ liệu' name='dataTypeId'>
                    <Select
                      showSearch
                      placeholder="Chọn loại dữ liệu"
                      onChange={(value, event) => handleChangeDataType(value, event)}
                    >
                      {dataTypes.map(dataType => {
                        return (
                          <Option key={dataType.id} value={dataType.id} code={dataType.code}>
                            {dataType.name}
                          </Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label='Mô tả' name='description'>
                <TextArea disabled={disable} rows={3} style={{ width: '100%', borderRadius: 5 }} />
              </Form.Item>
            </TabPane>

            <TabPane tab='Dữ liệu' disabled={disableDataTab} key='data'>
              {dataTypeCode === 'webapi'
                ? (
                  <>
                    <Row>
                      <Col span={3}>
                        <Form.Item label='Phương thức' name='method'>
                          {/* <SelectMethodHttp /> */}
                          <Select placeholder='Http action'>
                            <Option key='GET' value='GET'>Get</Option>
                            <Option key='POST' value='POST'>Post</Option>
                            <Option key='PUT' value='PUT'>Put</Option>
                            <Option key='DELETE' value='DELETE'>Delete</Option>
                            <Option key='HEAD' value='HEAD'>Head</Option>
                            <Option key='PATCH' value='PATCH'>Patch</Option>
                            <Option key='OPTIONS' value='OPTIONS'>Options</Option>
                          </Select>
                        </Form.Item>

                        <Form.Item label='Data Key' name='dataKey'>
                          <Input placeholder='Nhập data key' />
                        </Form.Item>
                      </Col>
                      <Col span={9}>
                        <Form.Item label='Địa chỉ' name='url'>
                          <Input
                            placeholder='Enter request URL' />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <p className='mb-2'>Headers</p>
                        <Form.List name="headers">
                          {(fields, { add, remove }) => (
                            <>
                              {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'key']}
                                  >
                                    <Input placeholder="Key" />
                                  </Form.Item>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'value']}
                                  >
                                    <Input placeholder="Value" />
                                  </Form.Item>
                                  <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                              ))}
                              <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                  Thêm header
                                </Button>
                              </Form.Item>
                            </>
                          )}
                        </Form.List>
                      </Col>
                    </Row>

                    <Divider />

                    <Row>
                      <Col span={12}>
                        <Form.Item label='Body' name='body'>
                          <TextArea disabled={disable} rows={5} style={{ width: '100%', borderRadius: 5 }} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </>
                )
                : (
                  <>
                    <Form.Item label='File đính kèm' name='file'>
                      <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Kéo hoặc thả file để tải lên</p>
                      </Dragger>
                    </Form.Item>
                  </>
                )
              }
              <FunctionalButton
                setDisableTablePreview={setDisableTablePreview}
                setDataPreview={setDataPreview}
                setColumnPreview={setColumnPreview}
                dataTypeCode={dataTypeCode}
                form={form} />
              <Table className='mt-4' disable={disableTablePreview} dataSource={dataPreview} columns={columnPreview}></Table>
            </TabPane>
          </Tabs>
        </Form>
      </Spin>
    </Modal>
  )
}

export default ModalCategory
