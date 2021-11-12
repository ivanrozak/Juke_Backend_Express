import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, Select, Input, Tag } from 'antd';
import moment from 'moment';
import { DeleteTwoTone } from '@ant-design/icons';
import { deleteUserData, getDataEmployers } from '../API/API';
import CustomModal from '../components/CustomModal';
import ImageModal from '../components/ImageModal';
const { Option } = Select;
const { Search } = Input;

function Index() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [trigger, setTrigger] = useState(false);

  const fetchAPI = () => {
    setLoading(true);
    getDataEmployers(firstName)
      .then((result) => {
        console.log(result);
        setData(result.data.data);
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
          <CustomModal data={record} openModal={false} />
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
        <CustomModal
          openModal={true}
          setTrigger={setTrigger}
          trigger={trigger}
        />
      </div>
      <div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 4 }}
        />
      </div>
    </div>
  );
}

export default Index;
