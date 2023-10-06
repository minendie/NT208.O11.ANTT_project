import React, { useState } from 'react';

import { Modal, Tabs , Button} from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import DetailCampaign from '../CampaignCard';
import ReviewPage from '../../Review/Review_page';
import './Tabs.css'
const TabsPage: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(true);
    
  const showModal = () => {
      setIsModalOpen(true);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  

  
  const Page = [{
    label : 'Detail',
    component: <DetailCampaign
    organizer_name="Tên tổ chức"
    address="Địa chỉ tổ chức"
    start_date="Ngày bắt đầu"
    end_date="Ngày kết thúc"
    open_hour="Giờ mở cửa"
    close_hour="Giờ đóng cửa"
    description="Mô tả chi tiết"
    recycling_items={[{ title: 'Mục tái chế 1' }, { title: 'Mục tái chế 2' }]} // Mảng các mục tái chế
    />


  },
  {
    label: 'Review',
    component: <ReviewPage></ReviewPage>

  }
]

  return (
    <>
      {/* <Modal title="Hello" open={isCampaignOpen} centered footer={null}>
        {/* <Tabs 
          defaultActiveKey="1"
          type="card"
          // size={size}
          items={Page.map((_, i) => {
            const id = String(i + 1);
            return {
              label: _.label,
              key: id,
              children: _.component,
            };
          })}
        /> */}
        {/* <p>Hello</p>
      </Modal> */} 
      <>
      {/* <Button type="primary" onClick={showCampaign}>
        Open Modal
      </Button> */}
      <Modal title="" open={isModalOpen} onCancel={handleCancel}  footer={null}>
        {/* <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p> */}
        <Tabs 
          defaultActiveKey="1"
          type="card"
          // size={size}
          items={Page.map((_, i) => {
            const id = String(i + 1);
            return {
              label: _.label,
              key: id,
              children: _.component,
            };
          })}
        />

      </Modal>
    </>
      
    
    </>
      
      
  );
};

export default TabsPage;