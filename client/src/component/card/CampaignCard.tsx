import React from 'react'
import {Space, Tag, Tabs} from 'antd'
import campaignImage from  "/../../assets/campaign.jpg";
import CustomButton from "../ui/CustomButton";
import WhiteButton from "../ui/WhiteButton";

interface Item{
    title: string;
}
interface DataCampaign {
    organizer_name: string;
    address: string;
    start_date: string;
    end_date: string;
    open_hour: string;
    close_hour: string;
    description: string;
    recycling_items: Item[]
}



const styles = {
    title: "text-[#33BBC5] font-bold",
    detail: "text-black font-normal",
    tag: "text-white font-normal"
};

const DetailCampaign = (props: DataCampaign) => {
    return(
        
        
            <div className = " flex flex-col h-full items-start flex-start p-12 gap-2.5 margin">
                
                <div className={styles.title}>
                  Organizer:{"   "}
                  <span className={styles.detail}> {props.organizer_name}</span>{" "}
                </div>
                
                <div className={styles.title}>
                  Address:{" "}
                  <span className={styles.detail}> {props.address}</span>{" "}
                </div>
                <div className={styles.title}>
                  Date:{" "}
                  <span className={styles.detail}> {props.start_date} {"-"} {props.end_date} </span>
                </div>
                <div className={styles.title}>
                  Working hour:{" "}
                  <span className={styles.detail}> {props.open_hour} {"-"} {props.close_hour} </span>
                </div>
                <div className={styles.title}>Accepted trash:
                 
                 {props.recycling_items.map((item,index) =>(
                        
                    
                        <span className={styles.tag}>
                            <Space size={[0, 8]} wrap>
                            <Tag color="#33BBC5">{item.title}</Tag>
                            </Space>
                        </span>
                    
                ))}
                </div> 
                <div className={styles.title}>
                  Description: <span className={styles.detail}> {props.description}</span>
                </div>
                
            </div>
                //Data test UI:

              // <DetailCampaign
              // organizer_name="Tên tổ chức"
              // address="Địa chỉ tổ chức"
              // start_date="Ngày bắt đầu"
              // end_date="Ngày kết thúc"
              // open_hour="Giờ mở cửa"
              // close_hour="Giờ đóng cửa"
              // description="Mô tả chi tiết"
              // recycling_items={[{ title: 'Mục tái chế 1' }, { title: 'Mục tái chế 2' }]} // Mảng các mục tái chế
              // />
    
    )

} 

export default DetailCampaign
