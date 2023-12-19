import { useState, useEffect } from "react";
import {
  DatePicker,
  TimePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
} from "antd";
import { useCampaign } from "../../../contexts/CampaignContext";
import { useOrgan } from "../../../contexts/OrganizerContext";
import { useAuth } from "../../../auth/AuthContext";
import SearchBar from "../../ui/SearchBar";
import axios from "axios";
import "./styles.css";
// import { useMapItems } from "../../../contexts/MapItemsContext";
import dayjs from "dayjs";

interface Campaign {
  userID?: any;
  organizerName?: string;
  startDate: string;
  endDate: string;
  openHour: string;
  closeHour: string;
  description?: string;
  campaignName: string;
  address: string;
  receiveItems: string[];
  receiveGifts?: string;
  organizerID?: number;
  campaignID: number;
  lat?: number;
  long?: number;
  averageRating?: number;
  icon?: any;
}

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

interface Location {
  display_name: string;
  lat: number;
  lon: number;
}

const { RangePicker } = DatePicker;

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const EditCampaignForm = ({
  startDate,
  endDate,
  openHour,
  closeHour,
  description,
  campaignName,
  address,
  receiveItems,
  receiveGifts,
  campaignID,
  userID,
}: Campaign) => {
  const auth = useAuth();
  const organizer = useOrgan();
  // Edit campaign modal
  const { showEditCampaignForm, setShowEditCampaignForm, setNewCampaign } =
    useCampaign();

  const [currentItems, setCurrentItems] = useState([]);
  const [currAddress, setCurrAddress] = useState<Location>();
  // {
  // display_name: address,
  // lat: 0,
  // lon: 0,
  // }

  useEffect(() => {
    const fetchCurrentItems = async () => {
      try {
        // Make API request to fetch current items
        axios
          .get(`${API_ENDPOINT}/trash/all`, {
            headers: {
              "ngrok-skip-browser-warning": true,
            },
          })
          .then((result) => {
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
    form.submit();
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

  // Edit campaign form
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // Time frame
    let date = values.timeFrame[0];
    let offset = date.$d.getTimezoneOffset();
    let customDate = new Date(date.$d.getTime() - offset * 60 * 1000);
    const startDate = customDate
      .toISOString()
      .replace("T", " ")
      .substring(0, 10);

    date = values.timeFrame[1];
    offset = date.$d.getTimezoneOffset();
    customDate = new Date(date.$d.getTime() - offset * 60 * 1000);
    const endDate = customDate.toISOString().replace("T", " ").substring(0, 10);

    // Working time
    date = values.workingTime[0];
    offset = date.$d.getTimezoneOffset();
    customDate = new Date(date.$d.getTime() - offset * 60 * 1000);
    const openHour = customDate
      .toISOString()
      .replace("T", " ")
      .substring(11, 19);

    date = values.workingTime[1];
    offset = date.$d.getTimezoneOffset();
    customDate = new Date(date.$d.getTime() - offset * 60 * 1000);
    const closeHour = customDate
      .toISOString()
      .replace("T", " ")
      .substring(11, 19);

    // Description and gifts
    values.description =
      (values.description ? values.description.replaceAll("'", "''") : "") +
      "\n Gifts: " +
      (values.receiveGifts ? values.receiveGifts : "");

    delete values.timeFrame;
    delete values.workingTime;
    // delete values.receiveGifts;
    values = {
      ...values,
      startDate,
      endDate,
      openHour,
      closeHour,
      address: currAddress?.display_name,
      lat: currAddress?.lat,
      long: currAddress?.lon,
      organizerID: organizer.organizerID,
      campaignID: campaignID,
      userID: userID,
    };

    axios
      .put(`${API_ENDPOINT}/edit-campaign`, values)
      .then(() => {
        const newReceiveItems = values.receiveItems.map(
          (insertItem: string | number) => {
            if (typeof insertItem === "number") {
              const item = currentItems.find(
                (item) => item["ItemID"] == insertItem
              );
              return item?.["ItemName"];
            }
            return insertItem;
          }
        );
        values.receiveItems = newReceiveItems;

        console.log(values);
        setNewCampaign({ ...values });
        message.success("Edit campaign success!");
      })
      .catch((err) => message.error(err));
    setShowEditCampaignForm(false);
    form.resetFields();
  };

  // Confirm modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const showConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmOk = () => {
    setShowEditCampaignForm(false);
    setIsConfirmModalOpen(false);
    form.resetFields();
  };

  const handleConfirmCancel = () => {
    setIsConfirmModalOpen(false);
  };

  // Date range picker
  const dayRangeConfig = {
    rules: [
      {
        type: "array" as const,
        required: true,
        message: "Please provide the time frame for your campaign!",
      },
    ],
  };

  // Time range picker
  const timeRangeConfig = {
    rules: [
      {
        type: "array" as const,
        required: true,
        message: "Please select working time!",
      },
    ],
  };

  return (
    <>
      <Modal
        title="Edit Campaign"
        open={showEditCampaignForm}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        // footer={(_, { CancelBtn }) => (
        //     <>
        //         <Button type="primary" onClick={handleOk}>
        //             Submit
        //         </Button>,
        //         <Button onClick={resetForm}>Reset</Button>,
        //         <CancelBtn />
        //     </>
        //   )}
        okText="Edit"
        cancelText="Cancel"
      >
        <Form
          name="editCampaign"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{
            // Initial values here
            timeFrame: [
              dayjs(startDate, "YYYY-MM-DD"),
              dayjs(endDate, "YYYY-MM-DD"),
            ],
            workingTime: [
              dayjs(openHour, "HH:mm:ss"),
              dayjs(closeHour, "HH:mm:ss"),
            ],
            description: description,
            campaignName: campaignName,
            address: address,
            receiveItems: receiveItems,
            receiveGifts: receiveGifts,
          }}
          form={form}
          style={{ maxWidth: 1000 }}
        >
          <Form.Item
            name="campaignName"
            label="Name"
            hasFeedback
            rules={[
              { required: true, message: "Please input your campaign name!" },
            ]}
          >
            <Input allowClear placeholder="Please input your campaign name" />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="timeFrame"
            label="Time frame"
            {...dayRangeConfig}
          >
            {/* <ConfigProvider locale={locale}> */}
            <RangePicker allowClear />
            {/* </ConfigProvider> */}
          </Form.Item>

          <Form.Item
            name="workingTime"
            label="Working time"
            {...timeRangeConfig}
          >
            {/* <ConfigProvider locale={locale}> */}
            <TimePicker.RangePicker allowClear />
            {/* </ConfigProvider> */}
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            hasFeedback
            initialValue={currAddress}
            rules={[{ required: true, message: "Please select your address!" }]}
          >
            {/* <Select
              allowClear
              showSearch
              placeholder="Search to Select address"
              // optionFilterProp="children"
              filterOption={(input, option) => {
                const children = option?.children ?? "";
                const value = option?.value ?? "";
                return (
                  String(children).toLowerCase().indexOf(input.toLowerCase()) >=
                    0 ||
                  String(value).toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }}
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
              <OptGroup label="Your address"></OptGroup>
              <OptGroup label="Other locations">
                <Option value="bttery">Battery</Option>
                <Option value="grfefeen">Green</Option>
                <Option value="blfefue">Blue</Option>
                <Option value="rfef">Battery</Option>
                <Option value="grfeffeee">Green</Option>
                <Option value="blfefe">Blue</Option>
              </OptGroup>
            </Select> */}
            <SearchBar
              onLocationSearch={(location: any) =>
                setCurrAddress({ ...location })
              }
            />
          </Form.Item>

          <Form.Item
            name="receiveItems"
            label="Kinds of trash"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please select kinds of trash you are receiving!",
                type: "array",
              },
            ]}
          >
            <Select
              allowClear
              showSearch
              filterOption={(input, option) => {
                const children = option?.children ?? "";
                const value = option?.value ?? "";
                return (
                  String(children).toLowerCase().indexOf(input.toLowerCase()) >=
                    0 ||
                  String(value).toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }}
              mode="tags"
              placeholder="Please select kinds of trash"
            >
              {currentItems.map((val) => (
                <Option key={val["ItemID"]} value={val["ItemID"]}>
                  {val["ItemName"]}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input allowClear placeholder="Please input your description" />
          </Form.Item>

          <Form.Item name="receiveGifts" label="Gift(s) for trade">
            {/* <Select
              allowClear
              showSearch
              filterOption={(input, option) => {
                const children = option?.children ?? "";
                const value = option?.value ?? "";
                return (
                  String(children).toLowerCase().indexOf(input.toLowerCase()) >=
                    0 ||
                  String(value).toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }}
              mode="tags"
              placeholder="Please input gift(s)"
            ></Select> */}
            <Input allowClear placeholder="Please input your gift(s)" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        centered
        title="Do you want to stop the process and close the form?"
        open={isConfirmModalOpen}
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
        width={480}
      >
        <p>All information will be discarded.</p>
      </Modal>
    </>
  );
};

export default EditCampaignForm;
