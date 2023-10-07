//src/component/Review
import React, { useEffect, useState } from "react";
import axios from "axios"
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Rate, Input, Form, Button, ConfigProvider, message } from "antd";
import "./style.css";



const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const { TextArea } = Input;
interface ReviewProps {
    setReviews: React.Dispatch<React.SetStateAction<any[]>>;
    campaignID: number;
  }


const Review: React.FC<ReviewProps> = ({ setReviews, campaignID }) =>{
    const [value, setValue] = useState('');
    
    const onFinish = async (values: any) => {
        try {
            const userID = localStorage.getItem('userID');
            values['campaignID'] = campaignID;
            values['userID'] = parseInt(String(userID));
            const response = await axios.post(`${API_ENDPOINT}/write-review`, values); 
            if (response.data.success) {
                setReviews((prevReviews: any[]) => [...prevReviews, {
                                                    comment: values.comment,
                                                    rating: values.rating,
                                                    username: localStorage.getItem('username'),
                                                }]);

            
            }
            else (
                message.error(response.data.message)
            )
          } catch (error) {
            console.error("Error submitting review:", error);
          }
    };
      
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    
    return(
        <>       
            <ConfigProvider
                theme={{
                token: {
                    // Seed Token
                    colorPrimary: '#33BBC5',
                    borderRadius: 8,
                    // Alias Token
                    colorBgContainer: '#FFFFFF',
                },
                }}
            >
                <Form
                    name="basic"
                    layout="vertical"         
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                <div className="flex flex-row w-full items-scretch  text-transparent gap-2">    
                    <Avatar className="flex-none"icon={<UserOutlined />} />
                <div className="flex-col grow" >
                    <div className="flex self-center flex-row gap-5">
                         <Form.Item 
                    name= "comment" 
                    label="" 
                    rules={[
                        {whitespace: true},
                        {max:500},
                        {min:5},
                    ]}
                    style={{width:"100%"}}>
                        <TextArea name="Comment"className="self-start..."            
                                style={{ width: "100%" }}                                
                                placeholder="Write your review here ..."
                                autoSize
                                >            
                        </TextArea>
                    </Form.Item>
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                    </div>
                    <div className="review-container"> 
                        <Form.Item name="rating" label="" style={{width: "100%"}} rules={[{ required: true, message: 'Please rating for campaign' }]}>
                            <Rate/>
                        </Form.Item>
                    </div> 
            
            </div>
        </div>
        </Form>
            </ConfigProvider>
        </>

    )
}

export default Review
