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
import { getNames } from "country-list";
import { Country, State } from "country-state-city";
import { useDispatch } from "react-redux";
import { signUpUser } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

const { Option } = Select;
const { Title, Text } = Typography;
const countries = Country.getAllCountries();

const Signup = () => {
  const dispatch = useDispatch();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState([]);

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
                <Input size="medium" placeholder="Enter Name"/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                <Input size="medium" placeholder="Enter Name"/>
              </Form.Item>
            </Col>
            </Row>

            <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                <Input size="medium" placeholder="Enter Email"/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                <Input size="medium" />
              </Form.Item>
            </Col>
            </Row>

            <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Input.Password size="medium" placeholder="Enter Password"/>
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
                <Input.Password size="medium" placeholder="Enter Confirm Password"/>
              </Form.Item>
            </Col>
            </Row>

            <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                <Select size="medium" placeholder="Select Role">
                  <Option value="ADMIN">Admin</Option>
                  <Option value="USER">User</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="companyName" label="Company Name">
                <Input size="medium" placeholder="Enter Company Name"/>
              </Form.Item>
            </Col>
            </Row>

            <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="gstNumber" label="GST Number">
                 <Input placeholder="Enter GST Number" size="medium" />
              </Form.Item>
            </Col>

           {/*<Col span={12}>
                <Form.Item name="country" label="Country">
                <Select size="medium" showSearch placeholder="Select Country"       optionFilterProp="children">
                {
                  countries.map((country)=>{
                    return(
                      <Option key={country} value={country}>
                      {country}
                    </Option>
                    );
                })}
                </Select>
                </Form.Item>
           </Col> */}
          
           
  <Col span={12}>
    <Form.Item name="country" label="Country" rules={[{ required: true }]}>
      <Select
        showSearch
        placeholder="Select Country"
        onChange={(value) => {
          const selected = countries.find((c) => c.isoCode === value);
          const stateList = State.getStatesOfCountry(selected.isoCode);
          setStates(stateList);
        }}
      >
        {countries.map((c) => (
          <Option key={c.isoCode} value={c.isoCode}>
            {c.name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  </Col>
</Row>

<Row gutter={16}>
  <Col span={12}>
    <Form.Item name="state" label="State" rules={[{ required: true }]}>
      <Select placeholder="Select State">
        {states.map((s) => (
          <Option key={s.isoCode} value={s.name}>
            {s.name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  </Col>

  <Col span={12}>
    <Form.Item
      name="zipCode"
      label="ZIP Code"
      rules={[{ required: true }]}
    >
      <Input placeholder="Enter ZIP Code" />
    </Form.Item>
  </Col>

</Row>
            
              

            <Col span={24}>
              <Form.Item name="address" label="Address">
                <Input.TextArea rows={2} placeholder="Enter Address Here "/>
              </Form.Item>
            </Col>
          

          <Button type="primary" htmlType="submit" block size="medium">
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