import { Dropdown, Layout, Menu, Space, Button,Avatar } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  LoginOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () =>{
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  }

  // Dropdown menus
  // Dropdown menu
  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "2",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider",
    },
    {
      key: "3",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <Sider>
        <div style={{ color: "white", padding: 16, fontWeight: "bold" }}>
          ERP System
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "Users",
            },
            {
              type: "divider"
            },
            {
              key: "3",
              icon: <SettingOutlined />,
              label: "Settings",
            },
          ]}
        />
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header */}
        <Header
          style={{
            background: "#fff",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <h3 style={{ margin: 0 }}>Dashboard</h3>


  {/* Right */}
  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    <Avatar icon={<UserOutlined />} />
    <span>Admin</span>

        {/*<Space size="middle">
          <Avatar icon={<UserOutlined />} />
          <span style={{ fontWeight: 500 }}>Admin</span>
          </Space> */}
        {/*  <Dropdown menu={{ items}} placement="bottomRight">
            <Space style={{ cursor: "pointer" }}>
             <Avatar icon={<UserOutlined />} />
              <span>Admin</span>
            </Space>
          </Dropdown> */}
             {/* Logout Button */}
          <Button
          type="primary"
          danger
          icon={<LoginOutlined />} 
            // onClick={() => {
            //   localStorage.removeItem("token");
            //   window.location.href = "/";
            // }}
            onClick={handleLogout}
          >
            Logout
          </Button>
          </div>
        </Header>

       

        {/* Content */}
        <Content style={{ margin: "20px", background: "#fff", padding: 20 }}>
          <h2>Welcome to ERP Manufacturing Dashboard</h2>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

