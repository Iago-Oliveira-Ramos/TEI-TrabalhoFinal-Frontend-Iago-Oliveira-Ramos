import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { variables } from "../Variables";

export const Cadastro = () => {
  const [form] = Form.useForm();
  const [formLayout] = useState("vertical");
  const [login, setLogin] = useState("");
  const [novoLogin, setNovoLogin] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [senha, setSenha] = useState("");
  const [titulo, setTitulo] = useState("");
  const [buttonTitle, setButtonTitle] = useState("");
  const [usuarios, setUsuarios] = useState("");

  const getUsuarios = () => {
    fetch(variables.API_URL + "usuario")
      .then((response) => response.json())
      .then((data) => setUsuarios(data));
  };

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

  const handleDelete = () => {
    setTitulo("Deletar");
    setButtonTitle("Deletar");
    setLogin("");
    setSenha("");
  };

  const handleUpdate = () => {
    setTitulo("Atualizar");
    setButtonTitle("Atualizar");
    setLogin("");
    setSenha("");
    setNovoLogin("");
    setNovaSenha("");
  };

  function deleteClick(id) {
    if (window.confirm("Tem certeza?")) {
      fetch(variables.API_URL + "usuario/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
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
    }
  }

  function updateClick() {
    getUsuarios();

    let idUsuario = null;

    usuarios.map((user) => {
      if (user.Login === login && user.Senha === senha)
        idUsuario = user.UsuarioId;
    });

    fetch(variables.API_URL + "usuario", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UsuarioId: idUsuario,
        Login: novoLogin,
        Senha: novaSenha,
      }),
    })
      .then((response) => response.json())
      .then(
        (result) => {
          alert(result);
          setLogin("");
          setSenha("");
          setNovoLogin("");
          setNovaSenha("");
        },
        (error) => {
          alert("Falhou.");
        }
      );
  }

  return (
    <>
      <Form
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        style={{
          paddingTop: "2%",
          paddingLeft: "30%",
          backgroundColor: "#EFEBE9",
          height: "89.5vh",
        }}
      >
        <Form.Item wrapperCol={{ offset: 5 }}>
          <img
            className="logo"
            src={require("../assets/ic_launcher-web.png")}
            alt="Logo do sistema de cadastro"
            style={{ width: "200px", heigth: "200px" }}
          />
        </Form.Item>
        <Form.Item label="Usuário">
          <Input
            placeholder="Digite seu novo usuário..."
            style={{ width: "650px" }}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Senha">
          <Input.Password
            placeholder="Digite sua nova senha..."
            style={{ width: "650px", marginLeft: 0 }}
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
        <Form.Item style={{ paddingTop: "7%" }}>
          <Button
            type="primary"
            style={{
              width: "150px",
              height: "40px",
              paddingRight: "27px",
              background: "#E61D1DE8",
              borderColor: "#E61D1DE8",
            }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => handleDelete()}
          >
            Deletar
          </Button>
          <Button
            type="primary"
            style={{
              width: "150px",
              height: "40px",
              paddingRight: "27px",
              background: "#49f352",
              borderColor: "#49f352",
              marginLeft: "32.4%",
            }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => handleUpdate()}
          >
            Atualizar
          </Button>
        </Form.Item>
      </Form>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{titulo}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                arial-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="input-group mb-3">
                <div className="input-group mb-3">
                  <span className="input-group-text">Login</span>
                  <input
                    type="text"
                    className="form-control"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Senha</span>
                  <input
                    type="text"
                    className="form-control"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </div>

                {buttonTitle === "Atualizar" ? (
                  <>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Novo Login</span>
                      <input
                        type="text"
                        className="form-control"
                        value={novoLogin}
                        onChange={(e) => setNovoLogin(e.target.value)}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Nova Senha</span>
                      <input
                        type="text"
                        className="form-control"
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                      />
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            {buttonTitle === "Deletar" ? (
              <button
                style={{
                  background: "#E61D1DE8",
                  borderColor: "#E61D1DE8",
                }}
                type="button"
                className="btn btn-primary float-start"
                onClick={() => {
                  getUsuarios();

                  let idUsuario = null;

                  usuarios.map((user) => {
                    if (user.Login === login && user.Senha === senha)
                      idUsuario = user.UsuarioId;
                  });

                  console.log(idUsuario);

                  deleteClick(idUsuario);
                }}
              >
                Deletar
              </button>
            ) : null}

            {buttonTitle === "Atualizar" ? (
              <button
                style={{
                  background: "#49f352",
                  borderColor: "#49f352",
                }}
                type="button"
                className="btn btn-primary float-start"
                onClick={() => updateClick()}
              >
                Atualizar
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
