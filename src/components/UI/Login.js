import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import "../../App.css";
import { variables } from "../../Variables";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "../NavBar";

export const Login = () => {
  const [usuarios, setUsuarios] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let acesso = false;

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleLogin = () => {
    usuarios.map((user) => {
      if (username === user.Login && password === user.Senha) {
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(
          <React.StrictMode>
            <BrowserRouter>
              <NavBar username={username} />
            </BrowserRouter>
          </React.StrictMode>
        );

        localStorage.setItem("usuario", username);
        acesso = true;
      }
    });

    return acesso ? alert("Acesso autorizado!") : alert("Acesso negado!");
  };

  const getData = () => {
    fetch(variables.API_URL + "usuario")
      .then((response) => response.json())
      .then((data) => setUsuarios(data));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem("loggedIn", true);
  }, [acesso]);

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
        paddingTop: "2%",
        backgroundColor: "#EFEBE9",
        height: "89.5vh",
      }}
    >
      <Form.Item wrapperCol={{ offset: 11 }}>
        <img
          className="logo"
          src={require("../../assets/ic_launcher-web.png")}
          alt="Logo do sistema de cadastro"
          style={{ width: "200px", heigth: "200px" }}
        />
      </Form.Item>
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
        <Input
          style={{ width: "585px" }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <Input.Password
          style={{ width: "585px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
          style={{
            width: "150px",
            height: "40px",
            paddingRight: "27px",
          }}
          onClick={() => handleLogin()}
        >
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
};
