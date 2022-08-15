import { useEffect, useState } from 'react'

import type { DatePickerProps } from 'antd'
import { Select, Form, DatePicker, Row, Col, Button, Divider } from 'antd'

import { PageTitle } from 'src/_metronic/layout/core'
import { categoryApi } from 'src/app/apis'
import { Category } from 'src/app/models'

const { Option } = Select

const StatisticPage = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await categoryApi.getAll()

      if (res) {
        setCategories(res?.data ?? [])
      }
    }

    fetchCategories()
  }, [])

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString)
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>Thống kê</PageTitle>
      <div className='card mb-5 mb-xl-12 p-10'>
        <Form {...layout} form={form}>
          <Row>
            <Col span={12}>
              <Form.Item label='Lĩnh vực' name='categoryId'>
                <Select placeholder='Tất cả lĩnh vực' allowClear>
                  {categories.map(category => (
                    <Option key={category.id}>{category.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item label='Từ ngày'>
                <DatePicker onChange={onChange} className='w-100' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='Đến ngày'>
                <DatePicker onChange={onChange} className='w-100' />
              </Form.Item>
            </Col>
          </Row>

          <div className="d-flex justify-content-center">
            <Button type='primary' size='large'>Thống kê</Button>
          </div>
        </Form>
      </div>

      <div className='card mb-5 mb-xl-12 p-15'>
        <h3>Kết quả thống kê</h3>
        <Divider />
        <Row>
          <Col span={12}><p className='lead'>Số tập dữ liệu: 12</p></Col>
          <Col span={12}><p className='lead'>Tổng lượt xem: 563</p></Col>
        </Row>

        <Row>
          <Col span={12}><p className='lead'>Số lần đông bộ: 26</p></Col>
          <Col span={12}><p className='lead'>Được xuất bản lên cổng: 8</p></Col>
        </Row>

        <Row>
          <Col span={12}><p className='lead'>Số tổ chức đẩy dữ liệu lên: 3</p></Col>
          <Col span={12}><p className='lead'>Số hình thức cung cấp: 2</p></Col>
        </Row>

        <Row>
          <Col span={12}><p className='lead'>Số giấy phép cấp: 2</p></Col>
        </Row>
      </div>
    </>
  )
}

export default StatisticPage