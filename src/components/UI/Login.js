import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { App } from "../../App";
import "../../App.css";

export const Login = ({ root }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{
        paddingTop: "150px",
        backgroundColor: "#EFEBE9",
        height: "89.5vh",
      }}
    >
      <Form.Item
        label="Usuário"
        name="username"
        rules={[
          {
            required: true,
            message: "Insira um usuário válido!",
          },
        ]}
        style={{ paddingLeft: "22px" }}
      >
        <Input style={{ width: "585px" }} />
      </Form.Item>

      <Form.Item
        label="Senha"
        name="password"
        rules={[
          {
            required: true,
            message: "Insira uma senha válida!",
          },
        ]}
      >
        <Input.Password style={{ width: "585px" }} />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Lembrar senha</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 15,
          span: 8,
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          onClick={() =>
            root.render(
              <React.StrictMode>
                <App />
              </React.StrictMode>
            )
          }
          style={{
            width: "150px",
            height: "40px",
            paddingRight: "27px",
          }}
        >
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
};
