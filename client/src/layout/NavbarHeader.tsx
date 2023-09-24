import { UserOutlined } from "@ant-design/icons";

import { Avatar } from "antd";

import { BellOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const styles = {
  container: "h-[4em] border-xl flex justify-between border-2",
  nameApp: "text-4xl text-bold",
  navContainer: "flex items-center",

  menuNavbarItem: "flex",
  menuNavbarButton: "px-4 flex space-x-2",
};
const NavbarHeader = () => {
  const NavigationItem = [
    { name: "Home", path: "/" },
    { name: " AI Tool", path: "/tool" },

    { name: "About us", path: "/about" },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.nameApp}>Greendots</div>

      <div className={styles.navContainer}>
        <div className={styles.menuNavbarItem}>
          {NavigationItem.map((item, index) => (
            <div key={index}>
              <a
                href={item.path}
                className="  hover:text-gray-300 px-4 text-lg"
              >
                {item.name}
              </a>
            </div>
          ))}
        </div>
        <div className={styles.menuNavbarButton}>
          <button className="rounded-2xl bg-[#FDA172] px-2">
            <Link to={"login"}>JOIN US ! </Link>
          </button>

          <Link to={"profile"}>
            <Avatar shape="circle" icon={<UserOutlined />}></Avatar>
          </Link>
          <div className="">
            <BellOutlined className="text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarHeader;
