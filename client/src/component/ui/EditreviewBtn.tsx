import { useState } from "react";
import { Button, message } from "antd";
import { EditOutlined} from "@ant-design/icons";
import axios from "axios";

interface FollowButtonProps {
  userID: string | null;
  campaignID: number;
  isFollow: boolean;
}

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const FollowButton: React.FC<FollowButtonProps> = ({
  userID,
  campaignID,
  isFollow,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckin, setIsCheckin] = useState(isFollow);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const result = await axios.post(`${API_ENDPOINT}/set-follow`, {
        userID,
        campaignID,
      });
      setIsLoading(false);
      if (result.data.success) {
        setIsCheckin(!isCheckin);
      } else {
        message.error(result.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      message.error("An error occurred while processing your request.");
    }
  };

  return (
    <Button
      type="primary"
      onClick={handleClick}
      icon={
        isLoading ? (
          <LoadingOutlined />
        ) : isCheckin ? (
          <UserDeleteOutlined />
        ) : (
          <UserAddOutlined />
        )
      }
    >
      {isCheckin ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
