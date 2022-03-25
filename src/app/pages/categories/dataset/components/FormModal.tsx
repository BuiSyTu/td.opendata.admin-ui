import * as XLSX from 'xlsx'

import {
  Button,
  Checkbox,
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
import { Category, DataType, DatasetAPIConfig, DatasetFileConfig, License, Organization, ProviderType } from '../../../../models'
import { InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { categoryApi, dataTypeApi, datasetApi, licenseApi, organizationApi, providerTypeApi } from '../../../../apis'
import { handleModal, setColumnMetata, setDataMetadata, setDataTypeCode, setDisableDataTab, setDisableTableMetadata, setDisableTablePreview, setTabKey } from '../../../../../setup/redux/slices/dataset'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { Dataset } from '../../../../models'
import FunctionalButton from './FunctionalButton'
import MetadataTable from './MetadataTable'
import { RootState } from '../../../../../setup'
import { toObject } from '../../../../../utils/common'

const { TextArea } = Input
const { Text } = Typography
const { Option } = Select
const { TabPane } = Tabs
const { Dragger } = Upload

function ModalCategory(props: any) {
  const dispatch = useDispatch()
  const tabKey = useSelector((state: RootState) => state.dataset.tabKey)
  const modalId = useSelector((state: RootState) => state.dataset.modalId)
  const typeModal = useSelector((state: RootState) => state.dataset.typeModal)
  const modalVisible = useSelector((state: RootState) => state.dataset.modalVisible)
  const disableDataTab = useSelector((state: RootState) => state.dataset.disableDataTab)
  const dataTypeCode = useSelector((state: RootState) => state.dataset.dataTypeCode)
  const dataPreview = useSelector((state: RootState) => state.dataset.dataPreview)
  const columnPreview = useSelector((state: RootState) => state.dataset.columnPreview)
  const disableTablePreview = useSelector((state: RootState) => state.dataset.disableTablePreview)
  const dataMetadata = useSelector((state: RootState) => state.dataset.dataMetadata)

  const { setUpdate } = props
  const [form] = Form.useForm()
  const [disable, setDisable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)

  const [categories, setCategories] = useState<Category[]>([])
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [providerTypes, setProviderTypes] = useState<ProviderType[]>([])
  const [dataTypes, setDataTypes] = useState<DataType[]>([])
  const [licenses, setLicenses] = useState<License[]>([])
  const [dataExcel, setDataExcel] = useState([])

  const layout = {
    labelCol: { span: 22 },
    wrapperCol: { span: 22 },
  }

  const uploadProps = {
    name: 'file',
    multiple: false,
    action: 'https://192.168.2.169:5001/api/v1/attachmenthandles/excel',
    onChange(info: any) {
      const { status } = info.file

      // Xử lý preview và metadata ở chỗ này
      if (status !== 'uploading') {
        let reader = new FileReader()

        reader.onload = (e: any) => {
          const data = e.target.result
          const workbook = XLSX.read(data, {type: 'binary'})

          const firstSheetName = workbook.SheetNames[0]
          var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName])
          var json_object = JSON.stringify(XL_row_object)
          setDataExcel(JSON.parse(json_object))
        }

        reader.readAsBinaryString(info.file.originFileObj)
      }

      // Xử lý lưu file ở chỗ này
      if (status === 'done') {
        console.log({ info })
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e: any) {
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

    const fetchLicenses = async () => {
      const res = await licenseApi.getAll()
      if (res?.data) {
        setLicenses(res?.data)
      }
    }

    fetchCategories()
    fetchOrganizations()
    fetchProviderTypes()
    fetchDataTypes()
    fetchLicenses()
    return () => { }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        var res = await datasetApi.getById(modalId)
        if (res?.data) {
          form.setFieldsValue(res?.data)
          
          dispatch(setDataTypeCode(res?.data?.dataType?.code?.toLowerCase()))
          dispatch(setDisableTableMetadata(false))
          dispatch(setDataMetadata(JSON.parse(res?.data?.metadata)))

          const columnMetadata = [
            {key: 'Data', title: 'Data', dataIndex: 'Data'},
            {key: 'DataType', title: 'DataType', dataIndex: 'DataType', editable: true},
            {key: 'Title', title: 'Title', dataIndex: 'Title', editable: true},
            {key: 'Description', title: 'Description', dataIndex: 'Description', editable: true},
          ]
          dispatch(setColumnMetata(columnMetadata))
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
    dispatch(handleModal({
      modalId: '',
      typeModal: '',
      modalVisible: false,
      disableDataTab: true,
      tabKey: 'information'
    }))
  }

  const handleOk = async () => {
    try {
      await form.validateFields()
      const formData = form.getFieldsValue(true)

      const headerObject = Array.isArray(formData.headers) ? toObject(formData.headers, 'key', 'value') : {}

      const datasetFileConfig: DatasetFileConfig = {
        fileType: '',
        fileName: '',
        fileData: '',
        tableName: '',
        tenant: '',
        datasetId: ''
      }

      const datasetAPIConfig: DatasetAPIConfig = {
        method: formData?.method ?? '',
        url: formData?.url ?? '',
        headers: Object.keys(headerObject).length > 0 ? headerObject.toString() : '',
        dataKey: formData?.dataKey ?? '',
        tableName: formData?.tableName ?? '',
        data: formData?.data ?? ''
      }

      const bodyData = {
        ...formData,
        datasetAPIConfig,
        datasetFileConfig,
        metadata: dataMetadata.toString(),
      }

      typeModal === 'edit' ? putData(bodyData) : postData(bodyData)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  const handleChangeDataType = (value: string, event: any) => {
    dispatch(setDataTypeCode(event.code.toLowerCase()))
    dispatch(setDisableDataTab(false))
    dispatch(setDisableTableMetadata(true))
    dispatch(setDisableTablePreview(true))
  }

  const postData = async (data: Dataset) => {
    if (!data.metadata) {
      notification.error({
        message: 'Bạn chưa tạo metadata',
        description: 'Vui lòng thêm metadata trước khi thêm'
      })
    }

    console.log(data)

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

  const putData = async (data: Dataset) => {
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

  const handleTabClick = (key:string) => {
    dispatch(setTabKey(key))
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
            visibility: false,
          }}
        >
          <Tabs
            activeKey={tabKey}
            onTabClick={(key) => handleTabClick(key)}
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
                      {categories.map(category =>  (
                          <Option key={category.id} value={category.id}>
                            {category.name}
                          </Option>
                        )
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Tổ chức' name='organizationId'>
                    <Select
                      showSearch
                      placeholder="Chọn tổ chức"
                    >
                      {organizations.map(organization => (
                          <Option key={organization.id} value={organization.id}>
                            {organization.name}
                          </Option>
                        )
                      )}
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
                      {providerTypes.map(providerType => (
                          <Option key={providerType.id} value={providerType.id}>
                            {providerType.name}
                          </Option>
                        )
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label='Loại dữ liệu'
                    name='dataTypeId'
                    rules={[{ required: true, message: 'Không được để trống!' }]}
                  >
                    <Select
                      showSearch
                      placeholder="Chọn loại dữ liệu"
                      onChange={(value, event) => handleChangeDataType(value, event)}
                    >
                      {dataTypes.map(dataType => (
                          <Option key={dataType.id} value={dataType.id} code={dataType.code}>
                            {dataType.name}
                          </Option>
                        )
                      )}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Form.Item label='Giấy phép' name='licenseId'>
                    <Select
                      showSearch
                      placeholder="Chọn giấy phép"
                    >
                      {licenses.map(license => (
                          <Option key={license.id} value={license.id}>
                            {license.name}
                          </Option>
                        )
                      )}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name='visibility' valuePropName='checked'>
                <Checkbox>Xuất bản lên cổng</Checkbox>
              </Form.Item>

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
                dataExcel={dataExcel}
                form={form} />

              <MetadataTable />
              <Table
                className={`mt-4 ${disableTablePreview ? 'd-none' : 'd-block'}`}
                dataSource={dataPreview}
                columns={columnPreview} />
            </TabPane>  
          </Tabs>
        </Form>
      </Spin>
    </Modal>
  )
}

export default ModalCategory
