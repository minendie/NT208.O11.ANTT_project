//src/component/DisplayOtherReviews
import React from "react";
import { UserOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
import { Avatar, Rate, Input, Form, Button } from "antd";

import "./style.css"
interface ReView {
    username: string;
    comment: string;        
    rating: any   
}

interface ReviewProps{
    reviews: ReView[]
}
const { TextArea } = Input;

const Reviews: React.FC <ReviewProps>= ({reviews}) =>{
    const handleEdit = (reviewIndex: number) => {
        // Thực hiện các bước để mở giao diện chỉnh sửa đánh giá
        // Ví dụ: setShowEditForm(true);
        console.log(`Editing review at index ${reviewIndex}`);
    };
    const handleDelete = (reviewIndex: number) => {
        // Thực hiện các bước để xác nhận việc xóa đánh giá
        // Ví dụ: setShowDeleteConfirmation(true);
        console.log(`Deleting review at index ${reviewIndex}`);
      };
    return(
    
        <> 
        {reviews.map((review, index) => (
        <Form
            key={index}
            name={`review${index}`}
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
                    <TextArea name="Comment"className="self-start..."            
                            style={{ width: "100%" }}
                            autoSize
                            disabled
                            >
                    </TextArea>
                </Form.Item>
                </div>
                <Button type="link" onClick={() => handleEdit(index)} icon={<EditOutlined />} />
                <Button type="link" onClick={() => handleDelete(index)} icon={<DeleteOutlined />} />
                <div className="review-container"> 
                <Form.Item name="rating" 
                        label="" 
                        style={{width: "100%"}} 
                        rules={[{ required: true, message: 'Please rating for campaign' }]}>
                    <Rate disabled/>
                </Form.Item>
                </div> 
            </div>
        </div>
        </Form>
        ))} 
    </>
    )

}
export default Reviews;


