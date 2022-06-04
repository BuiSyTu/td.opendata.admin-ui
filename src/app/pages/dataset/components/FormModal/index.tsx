import * as XLSX from 'xlsx'

import { Button, Checkbox, Col, Divider, Form, Input, Modal, Row, Select, Space, Spin, Table, Tabs, Typography, message, notification } from 'antd'
import { Category, DataType, DatasetAPIConfig, DatasetFileConfig, License, Organization, ProviderType } from 'src/app/models'
import { ColumnMetadata, DataTypeCode, TabKey, TypeModal, setColumnMetata, setColumnPreview, setDataMetadata, setDataPreview, setDataTypeCode, setDataUpload, setDisableDataTab, setTabKey } from 'src/setup/redux/slices/dataset'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { categoryApi, dataTypeApi, datasetApi, forwardApi, licenseApi, organizationApi, providerTypeApi } from 'src/app/apis'
import { setFileName, setFileType, setFileUrl } from 'src/setup/redux/slices/datasetFileConfig'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { Dataset } from 'src/app/models'
import FunctionalButton from '../FunctionalButton'
import MetadataTable from '../MetadataTable'
import { RootState } from 'src/setup'
import UploadDragger from '../UploadDragger'
import { toObject } from 'src/utils/common'
import { v4 as uuidv4 } from 'uuid'

const { TextArea } = Input
const { Text } = Typography
const { Option } = Select
const { TabPane } = Tabs

type Props = {
  setUpdate: any,
  modalVisible: any,
  setModalVisible: any,
  modalId: string,
  setModalId: any,
  typeModal: any,
  setTypeModal: any,
}

const FormModal: React.FC<Props> = ({
  setUpdate,
  modalVisible,
  setModalVisible,
  modalId,
  setModalId,
  typeModal,
  setTypeModal
}) => {
  const dispatch = useDispatch()

  const tabKey = useSelector((state: RootState) => state.dataset.tabKey)
  const disableDataTab = useSelector((state: RootState) => state.dataset.disableDataTab)
  const dataTypeCode = useSelector((state: RootState) => state.dataset.dataTypeCode)
  const dataPreview = useSelector((state: RootState) => state.dataset.dataPreview)
  const columnPreview = useSelector((state: RootState) => state.dataset.columnPreview)
  const dataMetadata = useSelector((state: RootState) => state.dataset.dataMetadata)
  const dataUpload = useSelector((state: RootState) => state.dataset.dataUpload)

  const fileName = useSelector((state: RootState) => state.datasetFileConfig.fileName)
  const fileType = useSelector((state: RootState) => state.datasetFileConfig.fileType)
  const fileUrl = useSelector((state: RootState) => state.datasetFileConfig.fileUrl)

  const [form] = Form.useForm()
  const [disable, setDisable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)

  const [categories, setCategories] = useState<Category[]>([])
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [providerTypes, setProviderTypes] = useState<ProviderType[]>([])
  const [dataTypes, setDataTypes] = useState<DataType[]>([])
  const [licenses, setLicenses] = useState<License[]>([])
  const [fileList, setFileList] = useState<any[]>([])
  const [disableTablePreview, setDisableTablePreview] = useState<boolean>(true)
  const [disableTableMetadata, setDisableTableMetadata] = useState<boolean>(true)

  const httpMethods = [
    'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'
  ]

  const layout = {
    labelCol: { span: 22 },
    wrapperCol: { span: 22 },
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

        if (res?.data?.datasetAPIConfig) {
          res.data = {
            ...res.data,
            ...res.data.datasetAPIConfig,
          }

          try {
            const headersObj = JSON.parse(res.data.datasetAPIConfig?.headers)
            res.data.headers = Object.keys(headersObj).map((key) => ({ key: key, value: headersObj[key] }))
          } catch (err) {
            console.error(err)
          }
        }

        if (res?.data?.datasetFileConfig) {
          res.data = {
            ...res.data,
            ...res.data.datasetFileConfig,
          }

          setFileList([{
            url: `${process.env.REACT_APP_API_URL}/${res.data.datasetFileConfig.fileUrl}`,
            name: res.data.datasetFileConfig.fileName,
            uid: uuidv4()
          }])
        }

        if (res?.data) {
          form.setFieldsValue(res?.data)

          dispatch(setDataTypeCode(res?.data?.dataType?.code?.toLowerCase()))
          dispatch(setDataMetadata(JSON.parse(res?.data?.metadata)))
        }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }

    setDisable(typeModal === TypeModal.view ? true : false)

    if (modalId !== '') {
      fetchData()
    }
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalId])

  const handleCancel = () => {
    form.resetFields()

    setDisableTablePreview(true)
    setDisableTableMetadata(true)
    setModalVisible(false)
    setModalId('')
    setTypeModal(TypeModal.none)

    dispatch(setDisableDataTab(true))
    dispatch(setTabKey(TabKey.information))
    dispatch(setColumnMetata([]))
    dispatch(setDataMetadata([]))
    dispatch(setColumnPreview([]))
    dispatch(setDataPreview([]))
    dispatch(setDataUpload([]))
  }

  const handleOk = async () => {
    try {
      await form.validateFields()
      const formData = form.getFieldsValue(true)

      const headerObject = Array.isArray(formData.headers) ? toObject(formData.headers, 'key', 'value') : {}

      if (dataTypeCode === DataTypeCode.excel) {
        // Khi file thay đổi, 3 thuộc tính này mới hết empty
        if (fileType && fileName && fileUrl) {
          const datasetFileConfig: DatasetFileConfig = {
            fileType,
            fileName,
            fileUrl,
            sheetName: formData?.sheetName ?? '',
          }

          formData.datasetFileConfig = datasetFileConfig
        }
      }

      if (dataTypeCode === DataTypeCode.webapi) {
        const datasetAPIConfig: DatasetAPIConfig = {
          method: formData?.method ?? '',
          url: formData?.url ?? '',
          headers: Object.keys(headerObject).length > 0 ? JSON.stringify(headerObject) : '',
          dataKey: formData?.dataKey ?? '',
          data: formData?.data ?? ''
        }

        formData.datasetAPIConfig = datasetAPIConfig
      }

      formData.metadata = JSON.stringify(dataMetadata)

      typeModal === TypeModal.edit ? putData(formData) : postData(formData)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  const handleChangeDataType = (value: string, event: any) => {
    setDisableTablePreview(true)
    setDisableTableMetadata(true)

    dispatch(setDataTypeCode(event.code.toLowerCase()))
    dispatch(setDisableDataTab(false))
  }

  const postData = async (data: Dataset) => {
    if (!data.metadata) {
      notification.error({
        message: 'Bạn chưa tạo metadata',
        description: 'Vui lòng tạo metadata trước khi thêm'
      })

      return;
    }

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
          message: `Lỗi khi thêm`,
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
      }
      setButtonLoading(false)
    } catch (error) {
      setButtonLoading(false)
    }
    setUpdate(true)
    handleCancel()
  }

  const handleTabClick = (key: string) => {
    dispatch(setTabKey(key))
  }

  const handleChangeDragger = (info: any) => {
    setFileList(info.fileList)
    const { response } = info.file

    // Check xem upload đã xong hay chưa
    if (!response) return;

    const { name, type, url } = response.data[0]

    dispatch(setFileName(name))
    dispatch(setFileType(type))
    dispatch(setFileUrl(url))


    let reader = new FileReader()

    reader.onload = (e: any) => {
      const data = e.target.result
      const workbook = XLSX.read(data, { type: 'binary' })

      const firstSheetName = workbook.SheetNames[0]
      var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName])
      var json_object = JSON.stringify(XL_row_object)
      dispatch(setDataUpload(JSON.parse(json_object)))
    }

    reader.readAsBinaryString(info.file.originFileObj)

    message.success(`${info.file.name} file uploaded successfully.`)
  }

  const handleClickPreview = () => {
    const handlePreview = (dataSource: any) => {
      if (!Array.isArray(dataSource)) {
        notification.info({
          message: 'Dữ liệu không hợp lệ',
          duration: 1,
        })

        return;
      }

      if (dataSource.length === 0) {
        notification.info({
          message: 'Chưa có dữ liệu',
          duration: 1,
        })

        return;
      }

      setDisableTablePreview(false)
      setDisableTableMetadata(true)

      if (dataSource.length > 5) dataSource = dataSource.slice(0, 5)
      dispatch(setDataPreview(dataSource))

      if (Array.isArray(dataMetadata) && dataMetadata.length > 0) {
        const columns = dataMetadata.map((metadata: any) => ({
          key: metadata.Data,
          title: metadata.Title,
          dataIndex: metadata.Data,
        }))

        dispatch(setColumnPreview(columns))
      } else {
        const dataTemp = dataSource[0]
        const columns = Object.keys(dataTemp).map(key => ({
          key,
          title: key,
          dataIndex: key,
        }))

        dispatch(setColumnPreview(columns))
      }
    }

    const handleWebApi = async () => {
      const formData = form.getFieldsValue(true)
      const { body, dataKey, headers, method, url } = formData

      const axiosOptions = {
        method,
        url,
        timeout: 15000,
        headers: JSON.stringify(Array.isArray(headers) ? toObject(headers, 'key', 'value') : {}),
        data: JSON.stringify(body),
      }

      const res = await forwardApi.forward(axiosOptions);

      if (res) {
        const dataSource = res[dataKey]
        handlePreview(dataSource)
      }
    }

    const handleExcel = () => {
      handlePreview(dataUpload)
    }

    switch (dataTypeCode) {
      case DataTypeCode.webapi:
        handleWebApi()
        break;
      case DataTypeCode.excel:
        handleExcel()
        break;
      default:
        break;
    }
  }

  const handleClickMetadata = () => {
    const columnMetadata = [
      new ColumnMetadata('Data', 'Data', 'Data', true),
      new ColumnMetadata('DataType', 'DataType', 'DataType', true),
      new ColumnMetadata('Title', 'Title', 'Title', true),
      new ColumnMetadata('Description', 'Description', 'Description', true),
    ]

    const handleWithDataSource = (dataSource: any) => {
      if (!Array.isArray(dataSource)) {
        notification.info({
          message: 'Dữ liệu không hợp lệ',
          duration: 1,
        })

        return;
      }

      if (dataSource.length === 0) {
        notification.info({
          message: 'Chưa có dữ liệu',
          duration: 1,
        })

        return;
      }

      setDisableTablePreview(true)
      setDisableTableMetadata(false)

      const dataTemp = dataSource[0]
      const metadata = Object.keys(dataTemp).map(key => ({
        Data: key,
        DataType: typeof dataTemp[key] === 'object' ? 'string' : typeof dataTemp[key],
        Title: key,
        Description: key,
      }))
      dispatch(setDataMetadata(metadata))
      dispatch(setColumnMetata(columnMetadata))
    }

    const handleWithoutDataSource = () => {
      setDisableTablePreview(true)
      setDisableTableMetadata(false)

      dispatch(setDataMetadata(dataMetadata))
      dispatch(setColumnMetata(columnMetadata))
    }

    const handleWebApi = async () => {
      const formData = form.getFieldsValue(true)

      if (Array.isArray(dataMetadata) && dataMetadata.length > 0) {
        handleWithoutDataSource()
        return;
      }

      const { body, dataKey, headers, method, url } = formData

      const axiosOptions = {
        method,
        url,
        timeout: 15000,
        headers: JSON.stringify(Array.isArray(headers) ? toObject(headers, 'key', 'value') : {}),
        data: JSON.stringify(body),
      }

      const res = await forwardApi.forward(axiosOptions);

      if (res) {
        let dataSource = res[dataKey]
        handleWithDataSource(dataSource)
      }
    }

    const handleExcel = () => {
      if (Array.isArray(dataMetadata) && dataMetadata.length > 0) {
        handleWithoutDataSource()
        return;
      }

      handleWithDataSource(dataUpload)
    }

    switch (dataTypeCode) {
      case DataTypeCode.webapi:
        handleWebApi();
        break;
      case DataTypeCode.excel:
        handleExcel();
        break;
      default:
        break;
    }
  }

  const footer = [
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
        onClick={handleOk}
        loading={buttonLoading}
      >
        <Text style={{ color: '#FFF', paddingLeft: 5 }}> Lưu</Text>
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
  ]

  return (
    <Modal
      width={1200}
      visible={modalVisible}
      title={<Text style={{ fontWeight: '500', color: '#fff' }}>Tập dữ liệu</Text>}
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={<i className='las la-times' style={{ color: '#fff', fontSize: 20 }}></i>}
      footer={footer}
    >
      <Spin spinning={isLoading}>
        <Form
          layout='vertical'
          {...layout}
          form={form}
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
                  <Form.Item label='Mã' name='code'>
                    <Input disabled={disable} style={{ width: '100%', height: 32, borderRadius: 5 }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Form.Item label='Tiêu hiển thị' name='title'>
                    <Input disabled={disable} style={{ width: '100%', height: 32, borderRadius: 5 }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Tag' name='tags'>
                    <Input disabled={disable} style={{ width: '100%', height: 32, borderRadius: 5 }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Form.Item label='Lĩnh vực' name='categoryId'>
                    <Select showSearch placeholder='Chọn lĩnh vực'>
                      {categories.map(category => (
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
                    <Select showSearch placeholder='Chọn tổ chức'>
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
                    <Select showSearch placeholder='Chọn hình thức cung cấp'>
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
                    <Select showSearch placeholder='Chọn loại dữ liệu'
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
                    <Select showSearch placeholder='Chọn giấy phép'>
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
              {dataTypeCode === DataTypeCode.webapi
                ? (
                  <>
                    <Row>
                      <Col span={3}>
                        <Form.Item label='Phương thức' name='method'>
                          <Select placeholder='Http action'>
                            {httpMethods.map(httpMethod => (
                              <Option key={httpMethod} value={httpMethod}>
                                {httpMethod}
                              </Option>
                            )
                            )}
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
                        <Form.List name='headers'>
                          {(fields, { add, remove }) => (
                            <>
                              {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'key']}
                                  >
                                    <Input placeholder='Key' />
                                  </Form.Item>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'value']}
                                  >
                                    <Input placeholder='Value' />
                                  </Form.Item>
                                  <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                              ))}
                              <Form.Item>
                                <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
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
                    <Form.Item label='File đính kèm' name='fileUrl'>
                      <UploadDragger
                        onChange={handleChangeDragger}
                        fileList={fileList}
                      />
                    </Form.Item>

                    <Col span={9}>
                      <Form.Item label='Tên sheet / data key' name='sheetName'>
                        <Input
                          placeholder='Điền tên sheet / data key' />
                      </Form.Item>
                    </Col>
                  </>
                )
              }
              <FunctionalButton handleClickPreview={handleClickPreview} handleClickMetadata={handleClickMetadata} />

              {!disableTableMetadata && <MetadataTable />}
              {!disableTablePreview && <Table
                dataSource={dataPreview}
                columns={columnPreview} />}
            </TabPane>
          </Tabs>
        </Form>
      </Spin>
    </Modal>
  )
}

export default FormModal
