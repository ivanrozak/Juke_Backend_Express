import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, Select, Input, Tag } from 'antd';
import moment from 'moment';
import { DeleteTwoTone, PlusOutlined, EditTwoTone } from '@ant-design/icons';
import { deleteUserData, getDataEmployers } from '../API/API';
import CustomModal from '../components/CustomModal';
import ImageModal from '../components/ImageModal';
const { Option } = Select;
const { Search } = Input;

function Index() {
  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [trigger, setTrigger] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [sendData, setSendData] = useState({});

  const fetchAPI = () => {
    setLoading(true);
    getDataEmployers(firstName)
      .then((result) => {
        console.log(result);
        setDataTable(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchAPI();
  }, [trigger, firstName]);
  const columns = [
    {
      title: 'Name',
      key: 'firstName',
      dataIndex: 'firstName',
      fixed: 'left',
      width: 120,
    },
    {
      title: 'Phone',
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Date of Birth',
      key: 'dateOfBirth',
      dataIndex: 'dateOfBirth',
      render: (dataIndex) => <div>{moment(dataIndex).format('L')}</div>,
    },
    {
      title: 'Address',
      key: 'cityAddress',
      dataIndex: 'cityAddress',
    },
    {
      title: 'Current Position',
      key: 'position',
      dataIndex: 'position',
      render: (dataIndex) => (
        <Tag color='green'>{dataIndex ? dataIndex : 'default'}</Tag>
      ),
    },

    {
      title: 'KTP File',
      key: 'ktpImage',
      dataIndex: 'ktpImage',
      render: (dataIndex) => <ImageModal imgUrl={dataIndex} />,
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'key',
      fixed: 'right',
      width: 120,
      render: (dataIndex, record) => (
        <div style={{ display: 'flex' }}>
          <Button
            icon={<EditTwoTone />}
            type='primary'
            ghost
            onClick={() => {
              setModalVisible(true);
              setSendData(record);
            }}
          />
          <Popconfirm
            title='Sure want to delete?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => handleDelete(record.userId)}
          >
            <Button
              icon={<DeleteTwoTone twoToneColor='red' />}
              danger
              style={{ marginLeft: '10px' }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];
  const handleDelete = (key) => {
    console.log(key);
    deleteUserData(key).then((result) => {
      console.log(result);
      if (result.status === 200) {
        setTrigger(!trigger);
      }
    });
  };
  const onSearch = (value) => setFirstName(value);

  return (
    <div>
      <div
        style={{
          marginBottom: '15px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Search
          placeholder='Search Employee'
          onSearch={onSearch}
          enterButton='Search'
          allowClear
          defaultValue={firstName}
          style={{ width: 240 }}
        />
        <Button
          onClick={() => {
            setModalVisible(true);
            setSendData({});
          }}
        >
          <PlusOutlined /> Add Employee
        </Button>
      </div>
      <div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataTable}
          pagination={{ pageSize: 4 }}
        />
      </div>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        sendData={sendData}
        trigger={trigger}
        setTrigger={setTrigger}
      />
    </div>
  );
}

export default Index;
