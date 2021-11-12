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
import { EditTwoTone, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { registerEmployee } from '../API/API';
const { Option } = Select;
const { TextArea } = Input;
function CustomModal(props) {
  const { data, openModal, trigger, setTrigger } = props;
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [dates, setDate] = useState('');

  let initialFormData = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    emailAddress: '',
    provinceAddress: '',
    cityAddress: '',
    streetAddress: '',
    zipCode: '',
    ktpNumber: '',
    currentBankAcc: '',
    bankAccNumber: '',
    ktpImage: '',
  };

  const changeDate = (date, dateString) => {
    console.log(date, dateString);
    setDate(dateString);
    console.log(dates);
  };

  useEffect(() => {
    if (data) {
      // console.log(data, 'datanya ===>');
      setFormData(data);
    } else {
      setFormData(initialFormData);
    }
  }, []);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const onFinish = (values) => {
    let payload = values;
    payload.dateOfBirth = dates;
    // console.log(payload);
    const {
      firstName,
      lastName,
      dateOfBirth,
      email,
      currentBankAcc,
      bankAccountNumber,
      ktpNumber,
      ktpImage,
      provinceAddress,
      cityAddress,
      phone,
      position,
      streetAddress,
    } = payload;
    console.log(payload, 'ini nih');
    const datas = new FormData();
    datas.append('firstName', firstName);
    datas.append('lastName', lastName);
    datas.append('dateOfBirth', dateOfBirth);
    datas.append('emailAddress', email);
    datas.append('currentBankAcc', currentBankAcc);
    datas.append('bankAccNumber', bankAccountNumber);
    datas.append('ktpNumber', ktpNumber);
    datas.append('ktpImage', ktpImage?.file);
    datas.append('provinceAddress', provinceAddress);
    datas.append('cityAddress', cityAddress);
    datas.append('phoneNumber', phone);
    datas.append('position', position);
    datas.append('streetAddress', streetAddress);

    // console.log(datas, 'ini');
    // for (let pair of datas.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    registerEmployee(datas).then((result) => {
      console.log(result);
      setTrigger(!trigger);
      handleCancel();
    });
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const provinceData = ['Jawa Timur', 'DKI Jakarta'];
  const bankData = ['MANDIRI', 'BCA', 'BRI'];
  const cityData = {
    'Jawa Timur': ['Surabaya', 'Malang', 'Sidoarjo', 'Gresik'],
    'DKI Jakarta': [
      'Jakarta Timur',
      'Jakarta Pusat',
      'Jakarta Selatan',
      'Jakarta Barat',
    ],
  };
  const positionData = ['Manager', 'Supervisor', 'Staff'];
  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);

  const handleProvinceChange = (value) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };

  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };
  return (
    <>
      {openModal ? (
        <Button onClick={showModal}>
          <PlusOutlined /> Add Employee
        </Button>
      ) : (
        <Button
          icon={<EditTwoTone />}
          type='primary'
          ghost
          onClick={showModal}
        />
      )}

      <Modal
        title={openModal ? 'Add New Employee' : 'Edit Employee Data'}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
        width={700}
      >
        <Form {...formItemLayout} onFinish={onFinish}>
          <Form.Item
            name='firstName'
            label='First Name'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type='text' defaultValue={formData.firstName} />
          </Form.Item>
          <Form.Item name='lastName' label='Last Name'>
            <Input type='text' defaultValue={formData.lastName} />
          </Form.Item>
          <Form.Item name='email' label='Email Address'>
            <Input type='email' defaultValue={formData.emailAddress} />
          </Form.Item>
          <Form.Item
            name='phone'
            label='Phone Number'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type='number' defaultValue={formData.phoneNumber} />
          </Form.Item>
          <Form.Item
            name='ktpNumber'
            label='KTP Number'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input defaultValue={formData.ktpNumber} />
          </Form.Item>
          <Form.Item name='ktpImage' label='Attach KTP'>
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name='position' label='Position'>
            <Select defaultValue={formData.position} placeholder='select'>
              {positionData.map((position) => (
                <Option key={position}>{position}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='currentBankAcc' label='Bank Account'>
            <Select defaultValue={formData.currentBankAcc} allowClear>
              {bankData.map((data) => (
                <Option key={data}>{data}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='bankAccountNumber' label='Bank Account Number'>
            <Input type='number' defaultValue={formData.bankAccNumber} />
          </Form.Item>
          <Form.Item name='provinceAddress' label='Province'>
            <Select
              defaultValue={formData.provinceAddress}
              onChange={handleProvinceChange}
            >
              {provinceData.map((province) => (
                <Option key={province}>{province}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='cityAddress' label='City'>
            <Select
              defaultValue={formData.cityAddress}
              onChange={onSecondCityChange}
            >
              {cities.map((city) => (
                <Option key={city}>{city}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='streetAddress' label='Street'>
            <TextArea
              defaultValue={formData.streetAddress}
              autoSize={{ minRows: 2 }}
            />
          </Form.Item>
          <Form.Item name='dateOfBirth' label='DOB'>
            <DatePicker
              onChange={changeDate}
              defaultValue={moment(formData.dateOfBirth, 'YYYY-MM-DD')}
            />
          </Form.Item>
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
}

export default CustomModal;
