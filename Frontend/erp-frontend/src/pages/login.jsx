import { Form, Input, Button, Card, Typography, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const { Title, Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      notification.success({
        message: "Login Successful",
        placement: "topRight",
      });
      navigate("/dashboard");
    }
  }, [token, navigate]);

  // if error comes or user added wrong username or password

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Login Failed",
        description: error?.message || "Invalid credentials",
        placement: "topRight",
      });
    }
  }, [error]);

  const onFinish = (values) => {
    dispatch(loginUser(values));
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
      }}
    >
      <Card style={{ width: 380, padding: 10, borderRadius: 10 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          ERP Login
        </Title>

        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item name="username" label="Username" rules={[{ required: true }]} autoComplete="off">
            <Input placeholder="Enter username" size="large" />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password placeholder="Enter password" size="large" autoComplete="new-password" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
          >
            Login
          </Button>
        </Form>

        <div style={{ textAlign: "center", marginTop: 15 }}>
          <Text>Don’t have an account? </Text>
          <Link to="/signup">
            <Button type="link" style={{ padding: 0 }}>
              Signup
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;