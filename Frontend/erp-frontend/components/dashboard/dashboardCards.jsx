import { Card, Col, Row } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  AppstoreOutlined,
  ToolOutlined,
  FileTextOutlined,
  InboxOutlined
} from "@ant-design/icons";

const DashboardCards = () => {
  return (
    <Row gutter={16}>
      
      {/* Production Output */}
      <Col span={6}>
        <Card style={cardStyle}>
          <div style={headerStyle}>
            <AppstoreOutlined style={iconStyle} />
            <span>Production Output</span>
          </div>

          <h2>12,840</h2>

          <p style={{ color: "green" }}>
            <ArrowUpOutlined /> 12% growth
          </p>
        </Card>
      </Col>

      {/* Work Orders */}
      <Col span={6}>
        <Card style={cardStyle}>
          <div style={headerStyle}>
            <ToolOutlined style={iconStyle} />
            <span>Active Work Orders</span>
          </div>

          <h2>84</h2>

          <p style={{ color: "#1677ff" }}>
            +5 Running
          </p>
        </Card>
      </Col>

      {/* GST */}
      <Col span={6}>
        <Card style={cardStyle}>
          <div style={headerStyle}>
            <FileTextOutlined style={iconStyle} />
            <span>GST Payable</span>
          </div>

          <h2>12</h2>

          <p style={{ color: "red" }}>
            <ArrowDownOutlined /> 4 Days Left
          </p>
        </Card>
      </Col>

      {/* Inventory */}
      <Col span={6}>
        <Card style={cardStyle}>
          <div style={headerStyle}>
            <InboxOutlined style={iconStyle} />
            <span>Inventory Status</span>
          </div>

          <h2>8</h2>

          <p style={{ color: "orange" }}>
            Low Stock Items
          </p>
        </Card>
      </Col>

    </Row>
  );
};

export default DashboardCards;

const cardStyle = {
  borderRadius: 12,
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontWeight: 500,
  marginBottom: "10px",
};

const iconStyle = {
  fontSize: "18px",
  color: "#1677ff",
};