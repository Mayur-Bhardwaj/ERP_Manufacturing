// import { Form, Input, Button, Card, Row, Col, Select } from "antd";
// import { useDispatch } from "react-redux";
// import { signUpUser } from "../features/auth/authSlice";
// import { Link } from "react-router-dom";

// const { Option } = Select;

// const signUp = () =>{
//   const dipatch = useDispatch();

//   const onFinish = (values) =>{
//     dipatch(signUpUser(values));  
//   };

//   return(
//     <div style={{ padding: 20 }}>
//     <div style={{ display:"flex", justifyContent: "flex-end"}}>
//       <Link to="/">Login</Link>
//     </div>

//     <Card title="Signup" style={{ maxWidth: 900, margin: "20px auto"}}>
//     <Form layout="vertical" onFinish={ onFinish }>
//       <Row gutter={ 16 }>
//       {/* Basic Information */}
//         <Col span={ 12 }>
//           <Form.Item name= "name" label="Name" rules={[{ required: true }]}>
//             <Input placeholder="Enter your name" />
//           </Form.Item>
//         </Col>
//         <Col span={12}>
//           <Form.Item name= "username" label="Usernmae" rules={[{ required: true}]}>
//             <Input placeholder="Enter Username" />
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//         <Form.Item name="email" label="Email" rules={[{ required: true}]}>
//           <Input placeholder="Enter your Email" />
//         </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item name="phone" label="Phone No." rules={[{ required: true}]}>
//             <Input placeholder="Enter your number" />
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//               <Form.Item name="password" label="Password" rules={[{ required: true }]}>
//                 <Input.Password placeholder="Enter password" />
//               </Form.Item>
//          </Col>
//  <Col span={12}>
//               <Form.Item
//                 name="confirmPassword"
//                 label="Confirm Password"
//                 dependencies={["password"]}
//                 rules={[
//                   { required: true },
//                   ({ getFieldValue }) => ({
//                     validator(_, value) {
//                       if (!value || getFieldValue("password") === value) {
//                         return Promise.resolve();
//                       }
//                       return Promise.reject("Passwords do not match");
//                     },
//                   }),
//                 ]}
//               >
//                 <Input.Password placeholder="Confirm password" />
//               </Form.Item>
//             </Col>

//             {/* Role */}
//             <Col span={12}>
//               <Form.Item name="role" label="Role" rules={[{ required: true }]}>
//                 <Select placeholder="Select role">
//                   <Option value="ADMIN">Admin</Option>
//                   <Option value="USER">User</Option>
//                 </Select>
//               </Form.Item>
//             </Col>

//             {/* Company Info */}
//             <Col span={12}>
//               <Form.Item name="companyName" label="Company Name">
//                 <Input placeholder="Enter company name" />
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item name="gstNumber" label="GST Number">
//                 <Input placeholder="Enter GST number" />
//               </Form.Item>
//             </Col>
//             <Col span={24}>
//               <Form.Item name="address" label="Address">
//                 <Input.TextArea rows={2} placeholder="Enter address" />
//               </Form.Item>
//             </Col>

//             <Col span={8}>
//               <Form.Item name="country" label="Country">
//                 <Input placeholder="Country" />
//               </Form.Item>
//             </Col>

//             <Col span={8}>
//               <Form.Item name="state" label="State">
//                 <Input placeholder="State" />
//               </Form.Item>
//             </Col>

//             <Col span={8}>
//               <Form.Item name="city" label="City">
//                 <Input placeholder="City" />
//               </Form.Item>
//             </Col>

//             <Col span={8}>
//               <Form.Item name="zipCode" label="Zip Code">
//                 <Input placeholder="Zip Code" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Button type="primary" htmlType="submit" block>
//             Signup
//           </Button>
      
//     </Form>
//     </Card>
//     </div>
//   );
// }

// export default signUp;
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Select,
  Typography,
} from "antd";
import { useDispatch } from "react-redux";
import { signUpUser } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

const { Option } = Select;
const { Title, Text } = Typography;

const Signup = () => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(signUpUser(values));
  };

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh", padding: 40 }}>
      <Card
        style={{
          maxWidth: 900,
          margin: "auto",
          borderRadius: 10,
        }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Create Account
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Input.Password size="large" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  { required: true },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Passwords do not match");
                    },
                  }),
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                <Select size="large">
                  <Option value="ADMIN">Admin</Option>
                  <Option value="USER">User</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="companyName" label="Company Name">
                <Input size="large" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="gstNumber" label="GST Number">
                 <Input placeholder="Enter GST Number" size="large" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="address" label="Address">
                <Input.TextArea rows={2} />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" block size="large">
            Signup
          </Button>
        </Form>

        <div style={{ textAlign: "center", marginTop: 15 }}>
          <Text>Already have an account? </Text>
          <Link to="/">
            <Button type="link" style={{ padding: 0 }}>
              Login
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Signup;