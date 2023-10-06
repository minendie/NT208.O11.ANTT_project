//src/component/Review
import React, { useEffect, useState } from "react";
import axios from "axios"
import CustomButton from "../ui/CustomButton";
import WhiteButton from "../ui/WhiteButton";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Rate, Input, Form, Button, ConfigProvider } from "antd";
import "./style.css";

const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

const Review: React.FC = () =>{
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
        {/* //<div className="pb-5"> */}
        <Avatar className="flex-none"icon={<UserOutlined />} />
        {/* </div> */}
       

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
                    <Input name="Comment"className="self-start..."            
                            style={{ width: "100%" }}
                            type="text"
                            // disabled
                            placeholder="Write your review here ..."
                            >            
                    </Input>
                </Form.Item>
                
                {/* <CustomButton title="Send" onClick= {handleSend} />  */}
                
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