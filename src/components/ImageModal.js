import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { REACT_APP_IMG_URL } from '../global_variable';

function ImageModal(props) {
  const { imgUrl } = props;
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

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

  return (
    <>
      <Button type='primary' onClick={showModal}>
        View
      </Button>

      <Modal
        title='View KTP'
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
      >
        <div style={{ padding: '0 24px' }}>
          {imgUrl ? (
            <img
              style={{ width: '100%' }}
              src={`${REACT_APP_IMG_URL}/${imgUrl}`}
              alt='Default image'
            />
          ) : (
            <div>Tidak ada gambar!</div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default ImageModal;
