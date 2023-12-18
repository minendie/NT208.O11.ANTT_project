import { useState } from 'react';
import { Form, Input, message, Modal } from 'antd';
import { useOrgan } from '../../../contexts/OrganizerContext';
import { useAuth } from '../../../auth/AuthContext'
import './styles.css'
import axios from 'axios';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;


const OrganizerSignupForm = () => {

    // Create organizer modal
    const {showOrganizerSignupForm, setShowOrganizerSignupForm, setOrganizerID} = useOrgan();
    const auth = useAuth();
    
    const handleOk = () => {
        form.submit()
    };
    
    const handleCancel = () => {
        showConfirmModal();
    };

    // Create organizer form
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log(values)
        values = {
            ...values,
            userID: auth.userID,
        }
        axios.post(`${API_ENDPOINT}/create-organizer`, values)
            .then((result) => {
                console.log(result);
                setOrganizerID(result.data.organizerID);
                if (result.data.success) {
                    setShowOrganizerSignupForm(false);
                    message.success('We have received your information. We will verify within 36 hours. Results will be sent via the email you registered with. Thank you!');
                    form.resetFields()
                }
                else {
                    message.error('Please try again!')
                    
                }
            })
            
            .catch((error) => {
                console.error('Error during organizer creation:', error);
                console.log('Server error response:', error.response);
                // Xử lý lỗi, hiển thị thông báo hoặc thực hiện các thao tác cần thiết
            });
            
    };
    
    // Confirm modal
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const showConfirmModal = () => {
        setIsConfirmModalOpen(true);
    };

    const handleConfirmOk = () => {
        setShowOrganizerSignupForm(false);
        setIsConfirmModalOpen(false);
    };

    const handleConfirmCancel = () => {
        setIsConfirmModalOpen(false);
    };

    return (
        <>  
        <Modal title="Organization Information" open={showOrganizerSignupForm} onOk={handleOk} onCancel={handleCancel} centered
            okText="Confirm"
            cancelText="Cancel"
        >
            <Form
                name="createOrganizer"
                {...formItemLayout}
                onFinish={onFinish}     
                form={form}
                style={{ maxWidth: 1000 }}
            >
                <Form.Item
                name="organizer_name"
                label="Name"
                rules={[{ required: true, message: 'Please input your organization name!' }]}
                >
                    <Input allowClear placeholder="Please input your organization name"/>
                </Form.Item>

                {/* <Form.Item
                name="description"
                label="Description"
                >
                    <Input allowClear placeholder="Please input your description"/>
                </Form.Item> */}

                {/* <Form.Item name="email" label="Email"
                rules={[{
                        type: 'email',
                        message: 'The input is not valid email!',
                    }]}
                >
                    <Input allowClear placeholder="Please input your email"/>
                </Form.Item> */}

                {/* <Form.Item name="phoneNumber" label="Phone number"
                rules={[
                    () => ({
                        validator(_, value) {
                          const phoneNumberPattern = /^(\+\d{1,3}\s?)?(\(\d{1,3}\)\s?)?\d{10,14}$/
                          if (!value || !phoneNumberPattern.test(value)) {
                              return Promise.reject(new Error('The input is not valid phone number!'));
                            }
                            return Promise.resolve();
                        },
                      }),
                    ]}
                >
                    <Input allowClear placeholder="Please input your phone number"/>
                </Form.Item> */}

                <Form.Item name="website" label="Website"
                rules={[{
                        type: 'url',
                        message: 'The input is not valid url!',
                    }]}
                >
                    <Input allowClear placeholder="Please input your website"/>
                </Form.Item>

                <Form.Item name="facebook" label="Facebook link"
                rules={[{
                        type: 'url',
                        message: 'The input is not valid url!',
                    }]}
                >
                    <Input allowClear placeholder="Please input your Facebook link"/>
                </Form.Item>

                <Form.Item name="linkedin" label="LinkedIn link"
                rules={[{
                        type: 'url',
                        message: 'The input is not valid url!',
                    }]}
                >
                    <Input allowClear placeholder="Please input your LinkedIn link"/>
                </Form.Item>
            </Form>          
        </Modal>
        <Modal 
            centered 
            title = "Do you want to stop the process and close the form?"
            open={isConfirmModalOpen} 
            onOk={handleConfirmOk} onCancel={handleConfirmCancel}
            width={480}
        >
            <p>All information will be discarded.</p>
        </Modal>
        </>
    );
};

export default OrganizerSignupForm;