import React from "react";
import Review from "./Review";
import Reviews from "./DisplayOtherReviews";
import { Space, Divider } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../auth/AuthContext";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;


const ReviewPage: React.FC<{ campaignID: number }> = ({ campaignID }) => {

    const [reviews, setReviews] = useState<any[]>([]);
    const auth = useAuth();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINT}/get-reviews/${campaignID}`, { 
                    headers: {
                        'ngrok-skip-browser-warning': true
                    }
                }); 
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="flex flex-col">
            <Space direction="vertical" size={15}>
                {auth.isLoggedIn 
                    ? <Review setReviews={setReviews} campaignID={campaignID}></Review> 
                    : <p>Please log in to write your review!</p>}
                <Divider style={{ borderTop: "0.3px solid gray"}}></Divider>

                <Reviews reviews={reviews}></Reviews>

            </Space>
        </div>
    )
}
export default ReviewPage