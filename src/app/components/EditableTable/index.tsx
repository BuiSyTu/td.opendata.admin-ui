import { Button, Form, FormInstance, Input, Table } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'

const EditableContext = React.createContext<FormInstance<any> | null>(null)

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: any;
  record: any;
  handleSave: (record: any) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<any>(null)
  const form = useContext(EditableContext)
  
  useEffect(() => {
    if (editing) {
      inputRef.current.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form?.setFieldsValue({
      [dataIndex]: record[dataIndex],
    })
  }

  const save = async () => {
    try {
      const values = await form?.validateFields()
      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

const EditableTable = (props: any) => {
  const {columns, dataSrc, disabled } = props

  const [dataSource, setDataSource] = useState(dataSrc)

  const handleAdd = (newData: any) => {
    setDataSource([...dataSource, newData])
  }

  const handleSave = (row: any) => {
    const newData = [...dataSource]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, { ...item, ...row })

    setDataSource(newData)
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  }

  const _columns = columns.map((col: any) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    }
  })

  return (
    <div className={`mt-4 ${disabled ? 'd-none' : 'd-block'}`}>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={_columns}
      />
    </div>
  )
}

export default EditableTable