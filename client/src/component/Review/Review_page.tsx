import React from "react";
import Review from "./Review";
import Reviews from "./DisplayOtherReviews";
import { Space, Divider } from "antd";

const ReviewPage: React.FC = () => {
    return (
        
        <div className="flex flex-col">
            
            <Space direction="vertical" size={15}>
                <Review></Review>
                <Divider style={{ borderTop: "0.3px solid gray"}}></Divider>
                <Reviews reviews={[
                    {username:'nhi', comment: 'hehe', rating: '4'},
                    {username:'mai', comment: 'hehe', rating: '3'}]}
                />
            </Space>

        </div>
    )

}
export default ReviewPage