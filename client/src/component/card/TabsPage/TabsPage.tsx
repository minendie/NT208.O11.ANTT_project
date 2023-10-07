import React, { useState, useEffect } from 'react';
import { Modal, Tabs } from 'antd';
import DetailCampaign from '../CampaignCard';
import ReviewPage from '../../Review/Review_page';
import './Tabs.css'
import axios from 'axios';


interface Campaign {
  organizerName: string,
  startDate: string,
  endDate: string,
  openHour: string,
  closeHour: string,
  description: string,
  campaignName: string,
  address: string,
  lat: number,
  long: number,
  receiveItems: string[],
  receiveGifts: string,
}

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;


const TabsPage: React.FC<{ campaignID: number }> = ({ campaignID }) => {

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [campaign, setCampaign] = useState<Campaign>({
                              organizerName: '',
                              startDate: '',
                              endDate: '',
                              openHour: '',
                              closeHour: '',
                              description: '',
                              campaignName: '',
                              address: '',
                              lat: 0,
                              long: 0,
                              receiveItems: [],
                              receiveGifts: '',
                            });

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/search/${campaignID}`, { 
            headers: {
                'ngrok-skip-browser-warning': true
            }
        }); 
        console.log(response)
        if (response.data.success) {
          var result = JSON.parse(response.data.result);
          const [description, receiveGifts] = String(result.description).split('\n Gifts: ')
          result = {
            ...result,
            description, receiveGifts
          }
          console.log(result)
          setCampaign(result);
          
        }
      } catch (error) {
        console.error('Error fetching campaign information:', error);
      }
    };

    fetchCampaign();
  }, []);
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const Page = [
    {
      label : 'Detail',
      component: <DetailCampaign 
                    campaignName={campaign.campaignName}
                    organizerName={campaign.organizerName}
                    address={campaign.address}
                    startDate={campaign.startDate}
                    endDate={campaign.endDate}
                    openHour={campaign.openHour}
                    closeHour={campaign.closeHour}
                    description={campaign.description}
                    recyclingItems={campaign.receiveItems} // Mảng các mục tái chế
                    receiveGifts={campaign.receiveGifts}
      />
    },
    {
      label: 'Review',
      component: <ReviewPage campaignID={campaignID}></ReviewPage>
    }
  ] 

  return (
    <>
      <Modal title="" open={isModalOpen} onCancel={handleCancel}  footer={null}>
        <Tabs 
          defaultActiveKey="1"
          type="card"
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
  );
};

export default TabsPage;