// //src/component/DisplayOtherReviews
// import React, { useState } from "react";
// import { UserOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
// import { Avatar, Rate, Input, Form, Button, Modal } from "antd";

// import "./style.css"
// interface ReView {
//     username: string;
//     comment: string;
//     rating: any   ;
// }

// interface ReviewProps{
//     reviews: ReView[]
// }
// const { TextArea } = Input;

// const Reviews: React.FC <ReviewProps>= ({reviews}) =>{
//     const [editingIndex, setEditingIndex] = useState<number | null>(null);
//     const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//     const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
//     const handleEdit = (reviewIndex: number) => {
//         if (editingIndex === reviewIndex) {
//           setEditingIndex(null);
//         } else {
//           setEditingIndex(reviewIndex);
//         }
//     };

//     const handleDelete = (reviewIndex: number) => {
//         setShowDeleteConfirmation(true);
//         setDeletingIndex(reviewIndex);
//       };
//     return(

//         <>
//         {reviews.map((review, index) => (
//         <Form
//             key={index}
//             name={`review${index}`}
//             layout="vertical"
//             initialValues={{
//                 comment: review.comment,
//                 rating: review.rating
//             }}
//             autoComplete="off"
//         >

//        <div className="flex flex-row w-full items-scretch  text-transparent gap-2">

//             <div className="pt-5">
//             <Avatar className="flex-none"icon={<UserOutlined />} />
//             </div>

//             <div className="flex-col grow" >

//                 <div key={index} className="review-container">
//                 <label style={{color:"black"}}> {review.username}</label>
//                 </div>

//                 <div className="flex self-center flex-row gap-5">
//                 <Form.Item
//                     name= "comment"
//                     label=""
//                     rules={[
//                     {whitespace: true},
//                     {max:500},
//                     {min:5},
//                     ]}
//                     style={{width:"100%"}}>
//                     <TextArea name="Comment"className="self-start..."
//                             style={{ width: "100%" }}
//                             autoSize={editingIndex === index}
//                             disabled={editingIndex !== index}
//                             >
//                     </TextArea>
//                 </Form.Item>
//                 </div>

//                 <div className="review-container">
//                 <Form.Item name="rating"
//                         label=""
//                         style={{width: "100%"}}
//                         rules={[{ required: true, message: 'Please rating for campaign' }]}>
//                     <Rate disabled/>
//                 </Form.Item>
//                 <Button type="link" style={{color:'#33bbc5'}} onClick={() => handleEdit(index)} icon={<EditOutlined />} />
//                 <Button type="link" style={{color:'#33bbc5'}} onClick={() => handleDelete(index)} icon={<DeleteOutlined />} />
//                 <Modal
//                     title="Confirm Delete"
//                     visible={showDeleteConfirmation}
//                     onCancel={() => setShowDeleteConfirmation(false)}
//                     onOk={() => {
//                     // Thực hiện xóa đánh giá ở đây
//                     // Ví dụ: dispatchDeleteReview(deletingIndex);
//                     setShowDeleteConfirmation(false);
//                     setDeletingIndex(null);
//                     }}
//                 >
//                     <p>Are you sure you want to delete this review?</p>
//                 </Modal>
//                 </div>
//             </div>
//         </div>
//         </Form>
//         ))}
//     </>
//     )

// }
// export default Reviews;

// import React, { useState } from "react";
// import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { Avatar, Rate, Input, Form, Button, Modal } from "antd";

// import "./style.css";

// interface ReView {
//   username: string;
//   comment: string;
//   rating: any;
// }

// interface ReviewProps {
//   reviews: ReView[];
// }

// const { TextArea } = Input;

// const Reviews: React.FC<ReviewProps> = ({ reviews }) => {
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);
//   const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

//   const handleEdit = (reviewIndex: number) => {
//     if (editingIndex === reviewIndex) {
//       setEditingIndex(null);
//     } else {
//       setEditingIndex(reviewIndex);
//     }
//   };

//   const handleDelete = (reviewIndex: number) => {
//     setDeletingIndex(reviewIndex);
//     setShowDeleteConfirmation(true);
//   };

//   const handleCancelDelete = () => {
//     setShowDeleteConfirmation(false);
//     setDeletingIndex(null);
//   };

//   const handleConfirmDelete = () => {
//     if (deletingIndex !== null) {
//       // Tạo một bản sao của mảng reviews
//       const updatedReviews = [...reviews];
//       // Xóa đánh giá khỏi mảng
//       updatedReviews.splice(deletingIndex, 1);
//       // Cập nhật lại danh sách đánh giá
//       // Ví dụ: dispatchUpdateReviews(updatedReviews);
//     }
//     setShowDeleteConfirmation(false);
//     setDeletingIndex(null);
//   };

//   return (
//     <>
//       {reviews.map((review, index) => (
//         <Form
//           key={index}
//           name={`review${index}`}
//           layout="vertical"
//           initialValues={{
//             comment: review.comment,
//             rating: review.rating
//           }}
//           autoComplete="off"
//         >
//           <div className="flex flex-row w-full items-scretch  text-transparent gap-2">
//             <div className="pt-5">
//               <Avatar className="flex-none" icon={<UserOutlined />} />
//             </div>
//             <div className="flex-col grow">
//               <div key={index} className="review-container">
//                 <label style={{ color: "black" }}>{review.username}</label>
//               </div>
//               <div className="flex self-center flex-row gap-5">
//                 <Form.Item
//                   name="comment"
//                   label=""
//                   rules={[
//                     { whitespace: true },
//                     { max: 500 },
//                     { min: 5 },
//                   ]}
//                   style={{ width: "100%" }}
//                 >
//                   <TextArea
//                     name="Comment"
//                     className="self-start..."
//                     style={{ width: "100%" }}
//                     autoSize={editingIndex === index}
//                     disabled={editingIndex !== index}
//                   />
//                 </Form.Item>
//               </div>
//               <div className="review-container">
//                 <Form.Item
//                   name="rating"
//                   label=""
//                   style={{ width: "100%" }}
//                   rules={[{ required: true, message: "Please rating for campaign" }]}
//                 >
//                   <Rate disabled />
//                 </Form.Item>
//                 <Button
//                   type="link"
//                   style={{ color: "#33bbc5" }}
//                   onClick={() => handleEdit(index)}
//                   icon={<EditOutlined />}
//                 />
//                 <Button
//                   type="link"
//                   style={{ color: "#33bbc5" }}
//                   onClick={() => handleDelete(index)}
//                   icon={<DeleteOutlined />}
//                 />
//               </div>
//             </div>
//           </div>
//         </Form>
//       ))}
//       <Modal
//         title="Confirm Delete"
//         visible={showDeleteConfirmation}
//         onCancel={handleCancelDelete}
//         onOk={handleConfirmDelete}
//       >
//         <p>Are you sure you want to delete this review?</p>
//       </Modal>
//     </>
//   );
// };

// export default Reviews;
import React, { useState, useRef, useEffect } from "react";
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Rate, Input, Form, Button, Modal } from "antd";

import "./style.css";
import axios from "axios";
interface ReView {
  username: string;
  comment: string;
  rating: number;
  UserID: number | null;
}

interface ReviewProps {
  reviews: ReView[];
  campaignID: number;
}

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const { TextArea } = Input;
const currUserID = localStorage.getItem("userID");
const Reviews: React.FC<ReviewProps> = ({ reviews, campaignID }) => {
  // Các state và ref cần thiết
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const formRef = useRef<any>(null);

  const handleEdit = (reviewIndex: number) => {
    if (editingIndex === reviewIndex) {
      setEditingIndex(null);
    } else {
      setEditingIndex(reviewIndex);
    }
  };

  // Xử lý sự kiện xoá comment
  const handleDelete = (reviewIndex: number) => {
    setDeletingIndex(reviewIndex);
    setShowDeleteConfirmation(true);
  };

  // Xác nhận xoá comment
  const handleConfirmDelete = async () => {
    try {
      const userID = localStorage.getItem("userID");
      const values = { campaignID, userID };
      const response = await axios.delete(`${API_ENDPOINT}/delete-reviews`, {
        data: values,
      });
      if (response.data.success && deletingIndex !== null) {
        // Tạo một bản sao của mảng reviews
        const updatedReviews = [...reviews];
        // Xóa đánh giá khỏi mảng
        updatedReviews.splice(deletingIndex, 1);
        // Cập nhật lại danh sách đánh giá
        setDeletingIndex(null);
        setShowDeleteConfirmation(false);
        window.location.reload();
      }

      console.log(values);
    } catch (error: any) {
      console.error("Error deleting review:", error);
      console.log("Server error response:", error.response);
    }
  };

  // Sử dụng useEffect để reset form khi deletingIndex thay đổi
  useEffect(() => {
    formRef.current?.resetFields();
  }, [deletingIndex]);

  return (
    <>
      {reviews.map((review, index) => (
        <Form
          key={index}
          name={`review${index}`}
          layout="vertical"
          initialValues={{
            comment: review.comment,
            rating: review.rating,
          }}
          autoComplete="off"
        >
          <div className="flex flex-row w-full items-scretch  text-transparent gap-2">
            <div className="pt-5">
              <Avatar className="flex-none" icon={<UserOutlined />} />
            </div>
            <div className="flex-col grow">
              <div key={index} className="review-container">
                <label style={{ color: "black" }}>{review.username}</label>
              </div>
              <div className="flex self-center flex-row gap-5">
                <Form.Item
                  name="comment"
                  label=""
                  rules={[{ whitespace: true }, { max: 500 }, { min: 5 }]}
                  style={{ width: "100%" }}
                >
                  <TextArea
                    name="Comment"
                    className="self-start..."
                    style={{ width: "100%" }}
                    autoSize={editingIndex === index}
                    disabled={editingIndex !== index}
                  />
                </Form.Item>
              </div>
              <div className="review-container">
                <Form.Item
                  name="rating"
                  label=""
                  style={{ width: "100%" }}
                  rules={[
                    { required: true, message: "Please rating for campaign" },
                  ]}
                >
                  <Rate disabled />
                </Form.Item>
                {review.UserID?.toString() === currUserID?.toString() && (
                  <>
                    <Button
                      type="link"
                      style={{ color: "#33bbc5" }}
                      onClick={() => handleEdit(index)}
                      icon={<EditOutlined />}
                    />
                    <Button
                      type="link"
                      style={{ color: "#33bbc5" }}
                      onClick={() => handleDelete(index)}
                      icon={<DeleteOutlined />}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </Form>
      ))}
      <Modal
        title="Confirm Delete"
        open={showDeleteConfirmation}
        // onCancel={handleCancelDelete}
        onOk={handleConfirmDelete}
      >
        <p>Are you sure you want to delete this review?</p>
      </Modal>
    </>
  );
};

export default Reviews;
