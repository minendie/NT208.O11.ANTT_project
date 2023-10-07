import React, { useState, useEffect } from 'react';
import { ExclamationCircleFilled, InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, TimePicker, Form, FormInstance, Input, message, Modal, Select, Space, Upload, ConfigProvider, Result } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAuth } from '../../../auth/AuthContext'
import { useCampaign } from '../../../store/CampaignContext';
import dayjs from 'dayjs';
import axios from 'axios';
import './styles.css'

interface Campaign {
    startDate?: string,
    endDate?: string,
    openHour?: string,
    closeHour?: string,
    address?: string,
    lat?: number,
    long?: number,
}

const { Option, OptGroup } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const { RangePicker } = DatePicker;

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const NewCampaignForm = ({
    startDate,
    endDate,
    openHour,
    closeHour,
    address,
    lat,
    long,} : Campaign) => {

    const auth = useAuth();
    const [organizerID, setOrganizerID] = useState(0);
    const userID = localStorage.getItem('userID');
    
    useEffect(() => {
        if (auth.isLoggedIn) {
            verifyOrganizer();
        }
      }, [auth.isLoggedIn]);

      // Create campaign modal
      const {showNewCampaignForm, setShowNewCampaignForm} = useCampaign();
      const [currentItems, setCurrentItems] = useState([]);
    
    // verify organizer
    const verifyOrganizer = async () => {
        try {
            const result = await axios.get(`${API_ENDPOINT}/is-organizer/${userID}`, {
                headers: {
                    'ngrok-skip-browser-warning': true,
                },
            });

            if (result.data.success) {
                setOrganizerID(result.data.organizerID);
            } else {
                message.warning('Only organizers can create a new campaign.');
                setShowNewCampaignForm(false);
            }
        } catch (err) {
            console.error(err);
            message.error('Failed to verify organizer.');
        }
    };

    useEffect(() => {
        const fetchCurrentItems = async () => {
            try {
                // Make API request to fetch current items
                axios.get(`${API_ENDPOINT}/trash/all`, {
                    headers: {
                        'ngrok-skip-browser-warning': true
                    },
                })
                .then(result => {
                    setCurrentItems(result.data);
                });
        
            } catch (error) {
                // Handle error
                console.error(error);
            }
            };
        
        fetchCurrentItems();
    }, [auth.isLoggedIn]);

    
    const handleOk = () => {
        form.submit()
    };
    
    const handleCancel = () => {
        showConfirmModal();
    };

    // Create campaign form
    const [form] = Form.useForm();

    const onFinish = (values: any) => {

        // Time frame
        let date = values.timeFrame[0]
        let offset = date.$d.getTimezoneOffset()
        let customDate = new Date(date.$d.getTime() - (offset*60*1000))
        const startDate = customDate.toISOString().replace('T', ' ').substring(0, 10)

        date = values.timeFrame[1]
        offset = date.$d.getTimezoneOffset()
        customDate = new Date(date.$d.getTime() - (offset*60*1000))
        const endDate = customDate.toISOString().replace('T', ' ').substring(0, 10)

        // Working time
        date = values.workingTime[0]
        offset = date.$d.getTimezoneOffset()
        customDate = new Date(date.$d.getTime() - (offset*60*1000))
        const openHour = customDate.toISOString().replace('T', ' ').substring(11, 19)

        date = values.workingTime[1]
        offset = date.$d.getTimezoneOffset()
        customDate = new Date(date.$d.getTime() - (offset*60*1000))
        const closeHour = customDate.toISOString().replace('T', ' ').substring(11, 19)

        // Description and gifts
        values.description = (values.description ? values.description : '') 
                                + "\n Gifts: " + (values.receiveGifts ? values.receiveGifts : '')

        delete values.timeFrame
        delete values.workingTime
        delete values.receiveGifts
        
        // tam lam cai nay de create campaign
        var lat = window.prompt('Nhap lattitude: ');
        var long = window.prompt('Nhap longtitude: ');

        values = {
            ...values,
            startDate,
            endDate,
            openHour,
            closeHour,
            lat: lat ? parseFloat(lat) : 0.0, 
            long: long ? parseFloat(long) : 0.0,
            organizerID: organizerID
        }
        console.log(values)
        // for temporarily use
        // POST to database
        axios.post(`${API_ENDPOINT}/create-campaign`, values)
        setShowNewCampaignForm(false);
        message.success('Create campaign success!');
    };
    
    // Confirm modal
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const showConfirmModal = () => {
        setIsConfirmModalOpen(true);
    };

    const handleConfirmOk = () => {
        setShowNewCampaignForm(false);
        setIsConfirmModalOpen(false);
    };

    const handleConfirmCancel = () => {
        setIsConfirmModalOpen(false);
    };

    // Date range picker
    const dayRangeConfig = {
        rules: [{ type: 'array' as const, required: true, message: 'Please provide the time frame for your campaign!' }],
    };

    // Time range picker
    const timeRangeConfig = {
        rules: [{ type: 'array' as const, required: true, message: 'Please select your working time!' }],
    };

    // Initial values
    const startDateInDayJSFormat = startDate ? dayjs(startDate, 'YYYY-MM-DD') : undefined
    const endDateInDayJSFormat = endDate ? dayjs(endDate, 'YYYY-MM-DD') : undefined
    const openHourInDayJSFormat = openHour ? dayjs(openHour, 'HH:mm:ss') : undefined
    const closeHourInDayJSFormat = closeHour ? dayjs(openHour, 'HH:mm:ss') : undefined

    const timeFrame = (startDateInDayJSFormat && endDateInDayJSFormat) ? [startDateInDayJSFormat, endDateInDayJSFormat] : undefined
    const workingTime = (openHourInDayJSFormat  && closeHourInDayJSFormat) ? [openHourInDayJSFormat, closeHourInDayJSFormat] : undefined
    return (
        <>  
        <Modal title="New Campaign" open={showNewCampaignForm} onOk={handleOk} onCancel={handleCancel} centered
            okText="Create"
            cancelText="Cancel"
        >
            <Form
                name="createCampaign"
                {...formItemLayout}
                onFinish={onFinish}
                initialValues={{
                    // Initial values here
                    timeFrame: timeFrame,
                    workingTime: workingTime,
                    address: address,
                }}
                form={form}
                style={{ maxWidth: 1000 }}
            >
                <Form.Item
                    name="campaignName"
                    label="Name"
                    hasFeedback
                    rules={[{ required: true, message: 'Please input your compaign name!' }]}
                >
                    <Input allowClear placeholder="Please input your compaign name"/>
                </Form.Item>

                <Form.Item name="timeFrame" label="Time frame" {...dayRangeConfig}>
                    <RangePicker />
                </Form.Item>

                <Form.Item name="workingTime" label="Working time" {...timeRangeConfig}>
                    <TimePicker.RangePicker />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Address"
                    hasFeedback
                    rules={[{ required: true, message: 'Please type in your address!' }]}
                >
                    <Input allowClear placeholder="Please type in your address"/>
                </Form.Item>

                <Form.Item
                    name="receiveItems"
                    label="Kinds of trash"
                    hasFeedback
                    rules={[{ required: true, message: 'Please select kinds of trash you are receiving!', type: 'array' }]}
                >
                <Select 
                    allowClear
                    showSearch
                    filterOption={(input, option) => {
                        const children = option?.children ?? '';
                        const value = option?.value ?? '';
                        return String(children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                        || String(value).toLowerCase().indexOf(input.toLowerCase()) >= 0;
                    }}
                    mode="tags" 
                    placeholder="Please select kinds of trash"
                >
                    {currentItems.map((val, idx) => (
                        <Option key={val['ItemID']} value={val['ItemID']}>
                        {val['ItemName']}
                        </Option>
                    ))}
                </Select>
                </Form.Item>

                <Form.Item
                name="description"
                label="Description"
                >
                    <Input allowClear placeholder="Please input your description"/>
                </Form.Item>

                <Form.Item
                    name="receiveGifts"
                    label="Gift(s) for trade"
                >
                    <Input allowClear placeholder="Please input your gift(s)"/>
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

export default NewCampaignForm;