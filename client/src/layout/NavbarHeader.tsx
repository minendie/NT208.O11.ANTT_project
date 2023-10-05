import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from '../auth/AuthContext'


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
      <a href="/">
      <div className={styles.nameApp} >Greendots</div>
      </a>
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
          {/* show log in button when user does not log in */}
          {!useAuth().isLoggedIn && <button className="rounded-2xl bg-[#FDA172] px-2 text-bold text-black">
            <Link to={"login"}>JOIN US ! </Link>
          </button>}
            {/* show avatar when user logged in */}
          {useAuth().isLoggedIn && <>
            <Link to={`profile/${localStorage.getItem('username')}`}>
              <Avatar shape="circle" icon={<UserOutlined />}></Avatar>
            </Link>
            {/* notification button */}
            <div className="">
              <BellOutlined className="text-3xl" />
            </div>
          </>}
        </div>
      </div>
    </div>
  );
};

export default NavbarHeader;
