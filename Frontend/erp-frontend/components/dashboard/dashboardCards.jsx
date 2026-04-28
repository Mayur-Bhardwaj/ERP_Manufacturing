import { Card, Col, Row } from "antd";
import {  AppstoreOutlined,
 ShoppingCartOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  DollarOutlined,
  CalculatorOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

// const DashboardCards = ({ stats }) => {
//   return (
//     <Row gutter={16}>
      
//       {/* Production Output */}
//       <Col span={6}>
//         <Card style={cardStyle}>
//           <div style={headerStyle}>
//             <AppstoreOutlined style={iconStyle} />
//             <span>Production Output</span>
//           </div>

//           <h2>{ stats?.productionOutput || 0 }</h2>

//           <p style={{ color: "green" }}>
//             <ArrowUpOutlined /> 12% growth
//           </p>
//         </Card>
//       </Col>

//       {/* Work Orders */}
//       <Col span={6}>
//         <Card style={cardStyle}>
//           <div style={headerStyle}>
//             <ToolOutlined style={iconStyle} />
//             <span>Active Work Orders</span>
//           </div>

//           <h2>{stats?.activeWorkOrders || 0}</h2>

//           <p style={{ color: "#1677ff" }}>
//             +5 Running
//           </p>
//         </Card>
//       </Col>

//       {/* GST */}
//       <Col span={6}>
//         <Card style={cardStyle}>
//           <div style={headerStyle}>
//             <FileTextOutlined style={iconStyle} />
//             <span>GST Payable</span>
//           </div>

//           <h2>{ stats?.gstPayable || 0 }</h2>

//           <p style={{ color: "red" }}>
//             <ArrowDownOutlined /> 4 Days Left
//           </p>
//         </Card>
//       </Col>

//       {/* Inventory */}
//       <Col span={6}>
//         <Card style={cardStyle}>
//           <div style={headerStyle}>
//             <InboxOutlined style={iconStyle} />
//             <span>Inventory Status</span>
//           </div>

//           <h2>{stats?.lowStockItems || 0}</h2>  {/*//receive the props for real data comming */}

//        {/*   //   stats?.value || 0 ?
//           //   stats? → prevents crash when API not loaded
//           //   || 0 → shows default value instead of blank */}
//           <p style={{ color: "orange" }}>
//             Low Stock Items
//           </p>
//         </Card>
//       </Col>

//     </Row>
//   );
// };

// export default DashboardCards;

// const cardStyle = {
//   borderRadius: 12,
//   boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
// };

// const headerStyle = {
//   display: "flex",
//   alignItems: "center",
//   gap: "8px",
//   fontWeight: 500,
//   marginBottom: "10px",
// };

// const iconStyle = {
//   fontSize: "18px",
//   color: "#1677ff",
// };

const cardStyle = {
  borderRadius: 12,
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};



const DashboardCards = ({ stats }) => {
 

const data = [
  // {
  //   title: "Total Production",
  //   value: stats?.totalProduction ?? 0,
  //   icon: <AppstoreOutlined />,
  //   color: "#1677ff",
  //   bg: "#e6f4ff",
  // },
  {
    title: "Active Orders",
    value: stats?.activeOrders ?? 0,
    icon: <ShoppingCartOutlined />,
    color: "#52c41a",
    bg: "#f6ffed",
  },
  {
    title: "Pending Orders",
    value: stats?.pendingOrders ?? 0,
    icon: <ClockCircleOutlined />,
    color: "#faad14",
    bg: "#fffbe6",
  },
  {
    title: "Revenue (₹)",
    value: stats?.totalInvoices ?? 0,
    icon: <FileTextOutlined />,
    color: "#722ed1",
    bg: "#f9f0ff",
  },
  // {
  //   title: "Payments",
  //   value: stats?.totalPayments ?? 0,
  //   icon: <DollarOutlined />,
  //   color: "#13c2c2",
  //   bg: "#e6fffb",
  // },
  {
    title: "GST Payable",
    value: `₹${stats?.gstPayable ?? 0}`,
    icon: <CalculatorOutlined />,
    color: "#ff4d4f",
    bg: "#fff1f0",
  },
];

  return (
    <Row gutter={16}>
      {data.map((item, index) => (
        <Col span={5} key={index}>
          <Card
            style={{
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              borderLeft: `5px solid ${item.color}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              
              {/* Left */}
              <div>
                <p style={{ margin: 0, color: "#888", fontSize:15}}>{item.title}</p>
                <h2 style={{ margin: 0 }}>{item.value}</h2>
              </div>

              {/* Right Icon */}
              <div
                style={{
                  fontSize: 30,
                  color: item.color,
                  background: item.bg,
                  padding: 10,
                  borderRadius: "20%",
                }}
              >
                {item.icon}
              </div>
             
            </div>
          </Card>
        </Col>
      ))}
         <Col span={4}>
              <Card style= {cardStyle}>
              {/*Overdue Payments*/}
              <div
            style={{
              borderBottom: "1px solid #f0f0f0",
              paddingBottom: 8,
              marginBottom: 8,
            }}
          >
           <p style={{ margin: 0, fontSize: 12, color: "#888" }}>
              Overdue Payments
            </p>
              <h3 style={{ margin: 0, color: "#ff4d4f" }}>
              {stats?.overduePayments ?? 0}
            </h3>
          </div>
          {/* Low Stock Alerts */}
          <div>
            <p style={{ margin: 0, fontSize: 12, color: "#888" }}>
              Low Stock Alerts
            </p>
            <h3 style={{ margin: 0, color: "#faad14" }}>
              {stats?.lowStockItems ?? 0}
            </h3>
          </div>
              </Card>
              </Col>
    </Row>
  );
};


export default DashboardCards;

