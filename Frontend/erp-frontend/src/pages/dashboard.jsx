import { Dropdown, Layout, Menu, Space, Button,Avatar, Card, Spin, Skeleton, Table } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  LoginOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import DashboardCards from "../../components/dashboard/dashboardCards";
import ProductionChart from "../../components/dashboard/productionChart";
import { getDashboardStats } from "../features/dashboard/dashboardSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useEffect } from "react";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { stats, recentUsers,loading, error } = useSelector((state) => state.dashboard); // call the api from redux
  console.log("STATS:", stats);
 
const handleLogout = () =>{
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  }

  useEffect(()=>{   //  run API when component load
    dispatch(getDashboardStats());
  },[dispatch]);

   // Spin Loading
  {loading ? <Skeleton active/> : <DashboardCards stats={stats}/>}
  // If error comes
  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <h2 style={{ color: "red" }}>❌ {error}</h2>
      </div>
    );
  }

  // Dropdown menus
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

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Role", dataIndex: "role"},
    {
    title: "Joined",
    dataIndex: "createdAt",
    render: (date) => new Date(date).toLocaleDateString(),
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
        <Content style={{ margin: "20px" }}>

          {/*Cards*/}
          {loading ? (
            <Skeleton active/>
          ) : (
          <DashboardCards stats = {stats} />
          )}
            <Card title="Production vs Demand Trends" style={{ marginTop: 20, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
 {/*pass the props and receive in dashboardCards */}
          <ProductionChart stats = {stats} />
          </Card>

          {/*<Card title="Recent Users" style={{ margin: 20 }}>
            <Table
            dataSource={recentUsers}
            columns={columns}
            rowKey="id"
            pagination= {false}
 />

          </Card> */}

          </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

