import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { variables } from "../Variables";

export const Cadastro = () => {
  const [form] = Form.useForm();
  const [formLayout] = useState("vertical");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const criarUsuario = () => {
    fetch(variables.API_URL + "usuario", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Login: login,
        Senha: senha,
      }),
    })
      .then((response) => response.json())
      .then(
        (result) => {
          alert(result);
          setLogin("");
          setSenha("");
        },
        (error) => {
          alert("Falhou.");
        }
      );
  };

  return (
    <Form
      layout={formLayout}
      form={form}
      initialValues={{
        layout: formLayout,
      }}
      style={{
        paddingTop: "150px",
        paddingLeft: "400px",
        backgroundColor: "#EFEBE9",
        height: "89.5vh",
      }}
    >
      <Form.Item label="Usuário">
        <Input
          placeholder="Digite seu novo usuário..."
          style={{ width: "650px" }}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Senha">
        <Input
          placeholder="Digite sua nova senha..."
          style={{ width: "650px" }}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          style={{
            width: "150px",
            height: "40px",
            paddingRight: "27px",
          }}
          onClick={() => criarUsuario()}
        >
          Criar
        </Button>
      </Form.Item>
    </Form>
  );
};
