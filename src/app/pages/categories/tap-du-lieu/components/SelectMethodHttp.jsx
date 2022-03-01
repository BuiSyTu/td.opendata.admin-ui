import { Select } from 'antd'

const { Option } = Select

const SelectMethodHttp = () => {
  return (
    <Select placeholder='Phương thức' className='select-before'>
      <Option value='Get'>Get</Option>
      <Option value='Post'>Post</Option>
      <Option value='Put'>Put</Option>
      <Option value='Delete'>Delete</Option>
      <Option value='Head'>Head</Option>
      <Option value='Patch'>Patch</Option>
      <Option value='Options'>Options</Option>
    </Select>
  )
}

export default SelectMethodHttp