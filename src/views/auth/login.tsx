import { Button, Form, Input } from "antd";
import { authStore } from "../../store";
import { ApiOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../router";
import { useState } from "react";
// @ts-ignore
import { loginToFile, getLoginJson } from "../../../electron/helper/filehelper";

const Login = () => {
  const navigate = useNavigate();
  const loginData = getLoginJson();
  const loginParse = loginData && JSON.parse(loginData);
  const [ipAddress, setIpAddress] = useState(loginParse?.ip);

  const { login, loginLoading } = authStore();
  const [form] = Form.useForm();
  const forms = [
    {
      label: "E-mail",
      name: "email",
      required: true,
      message: "Заполните",
      child: (
        <Input
          size="large"
          onChange={(e) => form.setFieldValue("email", e.target.value)}
        />
      ),
    },
    {
      label: "Пароль",
      name: "password",
      required: true,
      message: "Заполните",
      child: (
        <Input.Password
          size="large"
          onChange={(e) => form.setFieldValue("password", e.target.value)}
        />
      ),
    },
  ];
  const onFinish = () => {
    form.validateFields().then(() => {
      navigate(APP_ROUTES.HOME);
      // const values = form.getFieldsValue();
      // values["deviceName"] = "kiosk";
      // values["ip"] = loginParse?.ip;
      // login(values).then((res) => {
      //   if (res?.data?.authorization?.token) {
      //     navigate(APP_ROUTES.HOME);
      //   }
      // });
    });
  };
  return (
    <div className="wrapper h-full">
      <div className="h-full flex flex-col gap-4 items-center justify-center">
        <div className="w-[500px]">
          <Input
            className="w-full"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            size="large"
          />
          <Button
            onClick={() => {
              loginToFile({
                ...loginParse,
                ip: ipAddress,
              });
              window.location.reload();
            }}
            type="primary"
            className="mt-4 w-full"
            size="large"
          >
            Сохранить IP address
          </Button>
        </div>
        <Form
          form={form}
          onFinish={onFinish}
          className="w-[500px]"
          layout="vertical"
          initialValues={{
            email: loginParse?.email,
            password: loginParse?.password,
          }}
        >
          {forms.map((item, idx) => (
            <Form.Item
              key={idx}
              label={item.label}
              name={item.name}
              rules={[{ required: item.required, message: item.message }]}
            >
              {item.child}
            </Form.Item>
          ))}
          <Form.Item>
            <Button
              size="large"
              className="w-full"
              icon={<ApiOutlined />}
              type="primary"
              htmlType="submit"
              loading={loginLoading}
              disabled={loginLoading}
            >
              Авторизация
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
