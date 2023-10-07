//src/component/DisplayOtherReviews
import React, { useEffect, useState } from "react";
import axios from "axios"
import CustomButton from "../ui/CustomButton";
import WhiteButton from "../ui/WhiteButton";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Rate, Input, Form, Button, ConfigProvider } from "antd";

import "./style.css"
interface ReView {
    username: string;
    comment: string;        
    rating: any   
       
}

interface ReviewProps{
    reviews: ReView[]
}


const Reviews: React.FC <ReviewProps>= ({reviews}) =>{
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
                },}}
        >
            {reviews.map((review, index) => (
            <Form
                name="basic"
                layout="vertical"         
                initialValues={{
                    comment: review.comment,
                    rating: review.rating
                }}
                
                autoComplete="off"
            >
                <div className="flex flex-row w-full items-scretch  text-transparent gap-2">
                    <div className="pt-5">
                        <Avatar className="flex-none"icon={<UserOutlined />} />
                    </div>
                <div className="flex-col grow" >
                        <div key={index} className="review-container">
                            <label style={{color:"black"}}> {review.username}</label>
                        </div>
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
                                    disabled
                                ></Input>
                            </Form.Item>
                        </div>
                        <div className="review-container"> 
                            <Form.Item name="rating" label="" style={{width: "100%"}} rules={[{ required: true, message: 'Please rating for campaign' }]}>
                                <Rate disabled/>
                            </Form.Item>
                        </div> 
                </div>
            </div>
            </Form>
            ))} 
        </ConfigProvider>
   </>
    )

}
export default Reviews;


