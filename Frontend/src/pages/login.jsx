import React from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Switch,
  Typography,
  Row,
  Col,
} from "antd";
import {
  LockOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice.js";

const { Title, Text } = Typography;

function Login() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const {user, isLoading, isError, isSuccesss, message } = useSelector(
    (state) => state.auth
  );

    useEffect(() => {
    if (isSuccess && user) {
      navigate("/dashboard"); // redirect to dashboard after login
    }

    return () => {
      dispatch(reset()); // reset auth state when leaving component
    };
  }, [isSuccess, user, navigate, dispatch]);

  const onFinish = (values) => {
    dispatch(login({
      username: values.username,  // backend expects "username"
      password: values.password
    }));
  };

  return (
    <Row style={{ height: "100vh" }}>
      {/* LEFT PANEL */}
      <Col
        span={12}
        style={{
          background:
            "linear-gradient(rgba(0,0,0,.65), rgba(0,0,0,.65)), url('/machine-bg.jpg') center/cover",
          color: "#fff",
          padding: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Text
            style={{
              background: "rgba(255,255,255,0.15)",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: 12,
            }}
          >
            ENTERPRISE GRADE
          </Text>

          <Title style={{ color: "#fff", marginTop: 40 }}>
            Precision in Every{" "}
            <span style={{ color: "#4db5ff" }}>Process.</span>
          </Title>

          <Text style={{ maxWidth: 420, display: "block", opacity: 0.85 }}>
            Streamline your production, logistics, and GST compliance with
            our unified manufacturing suite.
          </Text>
        </div>

        <div style={{ display: "flex", gap: 50 }}>
          <div>
            <Title level={3} style={{ color: "#fff" }}>
              99.9%
            </Title>
            <Text style={{ color: "#bbb" }}>UPTIME SLA</Text>
          </div>

          <div>
            <Title level={3} style={{ color: "#fff" }}>
              AES-256
            </Title>
            <Text style={{ color: "#bbb" }}>ENCRYPTION</Text>
          </div>
        </div>
      </Col>

      {/* RIGHT PANEL */}
      <Col
        span={12}
        style={{
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: 380 }}>
          <Title level={3}>Welcome back</Title>
          <Text type="secondary">
            Enter your credentials to access the terminal.
          </Text>

          <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 30 }}>
            <Form.Item
              label="USERNAME / EMPLOYEE ID"
              name="employeeId"
              rules={[{ required: true, message: "Employee ID required" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="e.g. EMP-9921"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>PASSWORD</span>
                  <Text style={{ color: "#1677ff", cursor: "pointer" }}>
                    FORGOT?
                  </Text>
                </div>
              }
              name="password"
              rules={[{ required: true, message: "Password required" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Checkbox name="remember">
                Remember this device for 30 days
              </Checkbox>
            </Form.Item>

            <Form.Item
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>Biometric Login</Text>
              <Switch defaultChecked />
            </Form.Item>

            {isError && (
              <Text type="danger" style={{ marginBottom: 10 }}>
                {message}
              </Text>
            )}

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              block
            >
              Sign In to Dashboard →
            </Button>

            <div style={{ textAlign: "center", marginTop: 20 }}>
              <SafetyCertificateOutlined />{" "}
              <Text type="secondary">
                ISO 27001 Certified Infrastructure
              </Text>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default Login;
