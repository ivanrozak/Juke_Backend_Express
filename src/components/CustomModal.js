import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Divider,
  DatePicker,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { registerEmployee, updateDatabyId } from '../API/API';

const { Option } = Select;

// Data Reference
const positionData = ['Manager', 'Supervisor', 'Staff'];
const bankOption = ['MANDIRI', 'BCA', 'BRI'];
const provinceData = ['Jawa Timur', 'DKI Jakarta'];
const cityData = {
  'Jawa Timur': ['Surabaya', 'Malang', 'Sidoarjo', 'Gresik'],
  'DKI Jakarta': [
    'Jakarta Timur',
    'Jakarta Pusat',
    'Jakarta Selatan',
    'Jakarta Barat',
  ],
};

const CustomModal = (props) => {
  const { sendData, modalVisible, setModalVisible, trigger, setTrigger } =
    props;
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [cities, setCities] = useState(cityData[provinceData[0]]);

  const onProvinceChange = (value) => {
    setCities(cityData[value]);
  };

  const formList = [
    {
      id: 1,
      label: 'First Name',
      name: 'firstName',
      type: 'input',
      required: true,
    },
    {
      id: 2,
      label: 'Last Name',
      name: 'lastName',
      type: 'input',
    },
    {
      id: 3,
      label: 'Email Address',
      name: 'emailAddress',
      format: 'email',
      type: 'input',
      required: true,
    },
    {
      id: 4,
      label: 'Phone Number',
      name: 'phoneNumber',
      format: 'number',
      type: 'input',
      required: true,
    },
    {
      id: 5,
      label: 'KTP Number',
      name: 'ktpNumber',
      format: 'number',
      type: 'input',
      required: true,
    },
    {
      id: 6,
      label: 'Attach KTP',
      name: 'ktpImage',
      type: 'file',
    },
    {
      id: 7,
      label: 'Position',
      name: 'position',
      option: positionData,
      type: 'select',
    },
    {
      id: 8,
      label: 'Province',
      name: 'provinceAddress',
      option: provinceData,
      onChange: onProvinceChange,
      type: 'select',
    },
    {
      id: 9,
      label: 'City',
      name: 'cityAddress',
      option: cities,
      type: 'select',
    },
    {
      id: 10,
      label: 'Street Address',
      name: 'streetAddress',
      type: 'input',
    },
    {
      id: 11,
      label: 'Date of Birth',
      name: 'dateOfBirth',
      type: 'datepicker',
    },
    {
      id: 12,
      label: 'Bank Account',
      name: 'currentBankAcc',
      option: bankOption,
      type: 'select',
    },
    {
      id: 13,
      label: 'Bank Account Number',
      name: 'bankAccNumber',
      format: 'number',
      type: 'input',
    },
  ];

  const onFill = () => {
    form.setFieldsValue({
      bankAccNumber: sendData.bankAccNumber,
      currentBankAcc: sendData.currentBankAcc,
      dateOfBirth: moment(sendData.dateOfBirth, 'YYYY-MM-DD'),
      emailAddress: sendData.emailAddress,
      firstName: sendData.firstName,
      // ktpImage: sendData.ktpImage,
      ktpNumber: sendData.ktpNumber,
      lastName: sendData.lastName,
      phoneNumber: sendData.phoneNumber,
      position: sendData.position,
      cityAddress: sendData.cityAddress,
      provinceAddress: sendData.provinceAddress,
      streetAddress: sendData.streetAddress,
    });
  };

  useEffect(() => {
    if (sendData.userId) {
      onFill();
    }
  }, [modalVisible]);

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setModalVisible(false);
  };

  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      dateOfBirth: fieldsValue['dateOfBirth']?.format('YYYY-MM-DD'),
    };

    const {
      bankAccNumber,
      cityAddress,
      currentBankAcc,
      dateOfBirth,
      emailAddress,
      firstName,
      ktpImage,
      ktpNumber,
      lastName,
      phoneNumber,
      position,
      provinceAddress,
      streetAddress,
    } = values;

    const data = new FormData();
    data.append('firstName', firstName);
    data.append('lastName', lastName);
    data.append('dateOfBirth', dateOfBirth);
    data.append('emailAddress', emailAddress);
    data.append('currentBankAcc', currentBankAcc);
    data.append('bankAccNumber', bankAccNumber);
    data.append('ktpNumber', ktpNumber);
    data.append('ktpImage', ktpImage?.file);
    data.append('provinceAddress', provinceAddress);
    data.append('cityAddress', cityAddress);
    data.append('phoneNumber', phoneNumber);
    data.append('position', position);
    data.append('streetAddress', streetAddress);

    console.log(data, 'ini');
    for (let pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    if (!sendData.userId) {
      registerEmployee(data).then((result) => {
        console.log(result);
        setTrigger(!trigger);
        handleCancel();
      });
    } else if (sendData.userId) {
      console.log('ini yg jalan');
      updateDatabyId(sendData.userId, data).then((result) => {
        console.log(result);
        setTrigger(!trigger);
        handleCancel();
      });
    }
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const rules = [
    {
      required: true,
    },
  ];

  return (
    <>
      <Modal
        title={!sendData.userId ? 'Add New Employee' : 'Edit Employee Data'}
        visible={modalVisible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
        width={700}
      >
        <Form
          {...formItemLayout}
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {formList.map((item, index) => (
            <div key={index}>
              {item.type === 'input' ? (
                <Form.Item
                  name={item.name}
                  label={item.label}
                  rules={item.required ? rules : null}
                >
                  <Input type={item.format ? item.format : 'text'} />
                </Form.Item>
              ) : item.type === 'select' ? (
                <Form.Item name={item.name} label={item.label}>
                  <Select
                    onChange={item.onChange}
                    placeholder='Select an option'
                    allowClear
                  >
                    {item.option.map((key) => (
                      <Option value={key}>{key}</Option>
                    ))}
                  </Select>
                </Form.Item>
              ) : item.type === 'datepicker' ? (
                <Form.Item name={item.name} label={item.label}>
                  <DatePicker placeholder='Select date' />
                </Form.Item>
              ) : (
                <Form.Item name={item.name} label={item.label}>
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              )}
            </div>
          ))}
          <Divider style={{ margin: '15px 0' }} />
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              style={{ margin: '0 24px' }}
            >
              Submit
            </Button>
            <Button htmlType='button' onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CustomModal;
