import React, { useState, useEffect, useContext } from 'react';
import { ExclamationCircleFilled, InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, TimePicker, Form, FormInstance, Input, message, Modal, Select, Space, Upload, ConfigProvider } from 'antd';
import { useOrgan } from '../../../contexts/OrganizerContext';
import './styles.css'

interface organizer {
    organizationName: string,
    description: string,
    address: string,
    email: string,
    phoneNumber: string,
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const OrganizerSignupForm = (
    // {organizationName,
    // description,
    // address,
    // email,
    // phoneNumber,} : organizer
    ) => {

    // Create campaign modal
    const {showOrganizerSignupForm, setShowOrganizerSignupForm} = useOrgan();
    
    const showModal = () => {
        setShowOrganizerSignupForm(true);
    };
    
    const handleOk = () => {
        form.submit()
    };
    
    const handleCancel = () => {
        showConfirmModal();
    };

    // Create campaign form
    const [form] = Form.useForm();

    const onFinish = (values: any) => {

        // // Time frame
        // let date = values.timeFrame[0]
        // let offset = date.$d.getTimezoneOffset()
        // let customDate = new Date(date.$d.getTime() - (offset*60*1000))
        // const startDate = customDate.toISOString().replace('T', ' ').substring(0, 10)

        // date = values.timeFrame[1]
        // offset = date.$d.getTimezoneOffset()
        // customDate = new Date(date.$d.getTime() - (offset*60*1000))
        // const endDate = customDate.toISOString().replace('T', ' ').substring(0, 10)

        // // Working time
        // date = values.workingTime[0]
        // offset = date.$d.getTimezoneOffset()
        // customDate = new Date(date.$d.getTime() - (offset*60*1000))
        // const openHour = customDate.toISOString().replace('T', ' ').substring(11, 19)

        // date = values.workingTime[1]
        // offset = date.$d.getTimezoneOffset()
        // customDate = new Date(date.$d.getTime() - (offset*60*1000))
        // const closeHour = customDate.toISOString().replace('T', ' ').substring(11, 19)

        // // Description and gifts
        // values.receiveGifts.join(', ')
        // values.description = values.description + "\nGift(s): " + values.receiveGifts

        // delete values.timeFrame
        // delete values.workingTime
        // delete values.receiveGifts
        // values = {
        //     ...values,
        //     startDate,
        //     endDate,
        //     openHour,
        //     closeHour,
        // }

        console.log(values)
        setShowOrganizerSignupForm(false);
        message.success('You have successfully registered as an organizer!');
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
                // initialValues={{
                //     // Initial values here
                //     organizationName,
                //     description,
                //     address,
                //     email,
                //     phoneNumber,
                // }}
                form={form}
                style={{ maxWidth: 1000 }}
            >
                <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input your organization name!' }]}
                >
                    <Input allowClear placeholder="Please input your organization name"/>
                </Form.Item>

                {/* <Form.Item
                name="address"
                label="Address"
                >
                <Select
                    allowClear
                    showSearch
                    placeholder="Search to Select address"
                    // optionFilterProp="children"
                    filterOption={(input, option) => (option?.children ?? '').toLowerCase().indexOf(input.toLowerCase()) >= 0
                    || (option?.value ?? '').toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <OptGroup label="Your location">
                        <Option value="ABcde">Battery</Option>
                        <Option value="green">Green</Option>
                        <Option value="blue">Blue</Option>
                        <Option value="r">Battery</Option>
                        <Option value="gree">Green</Option>
                        <Option value="ble">Blue</Option>
                    </OptGroup>
                    <OptGroup label="Your address">

                    </OptGroup>
                    <OptGroup label="Other locations">
                        <Option value="bttery">Battery</Option>
                        <Option value="grfefeen">Green</Option>
                        <Option value="blfefue">Blue</Option>
                        <Option value="rfef">Battery</Option>
                        <Option value="grfeffeee">Green</Option>
                        <Option value="blfefe">Blue</Option>
                    </OptGroup>
                </Select>
                </Form.Item> */}

                <Form.Item
                name="description"
                label="Description"
                >
                    <Input allowClear placeholder="Please input your description"/>
                </Form.Item>

                <Form.Item name="email" label="Email"
                rules={[{
                        type: 'email',
                        message: 'The input is not valid email!',
                    }]}
                >
                    <Input allowClear placeholder="Please input your email"/>
                </Form.Item>

                <Form.Item name="phoneNumber" label="Phone number"
                rules={[
                    (/*{ getFieldValue }*/) => ({
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
                </Form.Item>

                <Form.Item name="website" label="Website"
                rules={[{
                        type: 'url',
                        message: 'The input is not valid url!',
                    }]}
                >
                    <Input allowClear placeholder="Please input your website"/>
                </Form.Item>

                <Form.Item name="fb_Link" label="Facebook link"
                rules={[{
                        type: 'url',
                        message: 'The input is not valid url!',
                    }]}
                >
                    <Input allowClear placeholder="Please input your Facebook link"/>
                </Form.Item>

                <Form.Item name="linkedIn_Link" label="LinkedIn link"
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