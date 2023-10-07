import React, { useState, useEffect } from 'react';
import { ExclamationCircleFilled, InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, TimePicker, Form, FormInstance, Input, message, Modal, Select, Space, Upload, ConfigProvider } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
// import moment from "moment";
// import locale from 'antd/locale/vi_VN';
import { useCampaign } from '../../../store/CampaignContext';
import dayjs from 'dayjs';
import './styles.css'

interface campaign {
    startDate?: string,
    endDate?: string,
    openHour?: string,
    closeHour?: string,
    address?: string,
}

const { Option, OptGroup } = Select;
// const { confirm } = Modal;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const { RangePicker } = DatePicker;

// const ConfirmModal: React.FC = () => {
//     const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(true);

//     const showConfirmModal = () => {
//         setIsConfirmModalOpen(true);
//     };

//     const handleConfirmOk = () => {
//         Modal.destroyAll();
//     };

//     const handleConfirmCancel = () => {
//         setIsConfirmModalOpen(false);
//     };

//     return (
//         <>
//         <Modal title="Basic Modal" open={isConfirmModalOpen} onOk={handleConfirmOk} onCancel={handleConfirmCancel}>
//             <p>Some contents...</p>
//             <p>Some contents...</p>
//             <p>Some contents...</p>
//         </Modal>
//         </>
//     );
// }

const NewCampaignForm = ({
    startDate,
    endDate,
    openHour,
    closeHour,
    address,} : campaign) => {

    // Create campaign modal
    const {showNewCampaignForm, setShowNewCampaignForm} = useCampaign();
    
    const showModal = () => {
        setShowNewCampaignForm(true);
    };
    
    const handleOk = () => {
        form.submit()
    };
    
    const handleCancel = () => {
        // confirm({
        //     title: 'Do you want to stop the process and close the form?',
        //     icon: <ExclamationCircleFilled />,
        //     content: 'All information will be discarded.',
        //     centered: true,
        //     okText: 'Confirm',
        //     onOk() {
        //         setIsModalOpen(false);
        //     },
        //     onCancel() {},
        //     footer: (_, { OkBtn, CancelBtn }) => (
        //         <>
        //             <ConfigProvider
        //                 theme={{
        //                 token: {
        //                     // Seed Token
        //                     colorPrimary: '#33BBC5',
        //                     borderRadius: 8,

        //                     // Alias Token
        //                     colorBgContainer: '#FFFFFF',

        //                     },
        //                 }}
        //             >
        //             <CancelBtn />
        //             <OkBtn />
        //             </ConfigProvider>
        //         </>
        //       ),
        //   });
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
        values.receiveGifts.join(', ')
        values.description = values.description + "\nGift(s): " + values.receiveGifts

        delete values.timeFrame
        delete values.workingTime
        delete values.receiveGifts
        values = {
            ...values,
            startDate,
            endDate,
            openHour,
            closeHour,
        }

        console.log(values)
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

    // Checkbox
    const [checked, setChecked] = useState(false);

    const onChange = (e: CheckboxChangeEvent) => {
        setChecked(e.target.checked);
    };

    // Date range picker
    const dayRangeConfig = {
        rules: [{ type: 'array' as const, required: true, message: 'Please provide the time frame for your campaign!' }],
    };

    // Time range picker
    const timeRangeConfig = {
        rules: [{ type: 'array' as const, required: true, message: 'Please select working time!' }],
    };

    // Initial values
    const startDateInDayJSFormat = startDate ? dayjs(startDate, 'YYYY-MM-DD') : undefined
    const endDateInDayJSFormat = endDate ? dayjs(endDate, 'YYYY-MM-DD') : undefined
    const openHourInDayJSFormat = openHour ? dayjs(openHour, 'HH:mm:ss') : undefined
    const closeHourInDayJSFormat = closeHour ? dayjs(openHour, 'HH:mm:ss') : undefined

    const timeframe = (startDateInDayJSFormat && endDateInDayJSFormat) ? [startDateInDayJSFormat, endDateInDayJSFormat] : undefined
    const workingTime = (openHourInDayJSFormat  && closeHourInDayJSFormat) ? [openHourInDayJSFormat, closeHourInDayJSFormat] : undefined
    
    return (
        <>  
        <Modal title="New Campaign" open={showNewCampaignForm} onOk={handleOk} onCancel={handleCancel} centered
        // footer={(_, { CancelBtn }) => (
        //     <>
        //         <Button type="primary" onClick={handleOk}>
        //             Submit
        //         </Button>,
        //         <Button onClick={resetForm}>Reset</Button>,
        //         <CancelBtn />
        //     </>
        //   )}
            okText="Create"
            cancelText="Cancel"
        >

            <Form
                name="createCampaign"
                {...formItemLayout}
                onFinish={onFinish}
                initialValues={{
                    // Initial values here
                    timeFrame: timeframe,
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
                    {/* <ConfigProvider locale={locale}> */}
                    <RangePicker allowClear/>
                    {/* </ConfigProvider> */}
                </Form.Item>

                <Form.Item name="workingTime" label="Working time" {...timeRangeConfig}>
                    {/* <ConfigProvider locale={locale}> */}
                    <TimePicker.RangePicker allowClear/>
                    {/* </ConfigProvider> */}
                </Form.Item>

                <Form.Item
                name="address"
                label="Address"
                hasFeedback
                rules={[{ required: true, message: 'Please select your address!' }]}
                >
                <Select
                    allowClear
                    showSearch
                    placeholder="Search to Select address"
                    // optionFilterProp="children"
                    filterOption={(input, option) => (option?.children ?? '').toLowerCase().indexOf(input.toLowerCase()) >= 0
                    || (option?.value ?? '').toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    // filterSort={(optionA, optionB) =>
                    // (optionA?.children ?? '').toLowerCase().localeCompare((optionB?.children ?? '').toLowerCase())
                    // }
                //     options={
                //         [
                //     {
                //         value: '1',
                //         label: 'Not Identified',
                //     },
                //     {
                //         value: '2',
                //         label: 'Closed',
                //     },
                //     {
                //         value: '3',
                //         label: 'Communicated',
                //     },
                //     {
                //         value: '4',
                //         label: 'Identified',
                //     },
                //     {
                //         value: '5',
                //         label: 'Resolved',
                //     },
                //     {
                //         value: '6',
                //         label: 'Cancelled',
                //     },
                //     ]
                // }
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
                    filterOption={(input, option) => (option?.children ?? '').toLowerCase().indexOf(input.toLowerCase()) >= 0
                    || (option?.value ?? '').toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    mode="tags" 
                    placeholder="Please select kinds of trash"
                >
                    <Option value="Red">Battery</Option>
                    <Option value="green">Green</Option>
                    <Option value="blue">Blue</Option>
                    <Option value="r">Battery</Option>
                    <Option value="gree">Green</Option>
                    <Option value="ble">Blue</Option>
                    <Option value="ed">Battery</Option>
                    <Option value="gren">Green</Option>
                    <Option value="be">Blue</Option>
                    <Option value="redjj">Battery</Option>
                    <Option value="grejjen">Green</Option>
                    <Option value="bluhe">Blue</Option>
                    <Option value="rejd">Battery</Option>
                    <Option value="grheen">Green</Option>
                    <Option value="bljue">Blue</Option>
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
                    label="Gift(s)"
                >
                <Select 
                    allowClear
                    showSearch
                    filterOption={(input, option) => (option?.children ?? '').toLowerCase().indexOf(input.toLowerCase()) >= 0
                    || (option?.value ?? '').toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    mode="tags" 
                    placeholder="Please input gift(s)"
                >
                </Select>
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