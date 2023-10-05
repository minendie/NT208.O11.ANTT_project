import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Tabs } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import DetailCampaign from '../CampaignCard';
import ReviewPage from '../../Review/Review_page';
import './Tabs.css'
const TabsPage: React.FC = () => {
  const [size, setSize] = useState<SizeType>('small');

  const onChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
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
    <div>
      
      <Tabs 
        defaultActiveKey="1"
        type="card"
        size={size}
        items={Page.map((_, i) => {
          const id = String(i + 1);
          return {
            label: _.label,
            key: id,
            children: _.component,
          };
        })}
      />
    </div>
  );
};

export default TabsPage;