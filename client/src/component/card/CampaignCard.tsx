import React, { useState, useEffect } from 'react'
import {Space, Tag } from 'antd'

interface DataCampaign {
    organizerName: string,
    campaignName: string,
    address: string;
    startDate: string;
    endDate: string;
    openHour: string;
    closeHour: string;
    description: string;
    recyclingItems: string[],
    receiveGifts: string,
}
const styles = {
    title: "text-[#33BBC5] font-bold",
    detail: "text-black font-normal",
    tag: "text-white font-normal"
};

const DetailCampaign = (props: DataCampaign) => {
    return(
      <div className = " flex flex-col h-full items-start flex-start p-12 gap-2.5 margin">
          <h1>{props.campaignName}</h1>
          <div className={styles.title}>
            Organizer:{"   "}
            <span className={styles.detail}> {props.organizerName}</span>{" "}
          </div>
          <div className={styles.title}>
            Address:{" "}
            <span className={styles.detail}> {props.address}</span>{" "}
          </div>
          <div className={styles.title}>
            Date:{" "}
            <span className={styles.detail}> {props.startDate} {"-"} {props.endDate} </span>
          </div>
          <div className={styles.title}>
            Working hour:{" "}
            <span className={styles.detail}> {props.openHour} {"-"} {props.closeHour} </span>
          </div>
          <div className={styles.title}>
            Gift(s) for trade:{" "}
            <span className={styles.detail}> {props.receiveGifts} </span>
          </div>
          <div className={styles.title}>Accepted trash:{"   "}
            {props.recyclingItems.map((item, index) =>(
                  <span className={styles.tag}>
                      <Space size={[0, 8]} wrap>
                      <Tag color="#33BBC5">{item}</Tag>
                      </Space>
                  </span>
          ))}
          </div> 
          <div className={styles.title}>
            Description: <span className={styles.detail}> {props.description}</span>
          </div>
          
      </div>    
    )

} 

export default DetailCampaign
