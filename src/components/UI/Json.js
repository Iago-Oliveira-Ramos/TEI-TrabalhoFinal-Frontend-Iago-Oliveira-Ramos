import { Button } from "antd";
import React, { useState } from "react";
import { FaPaste, FaPlus, FaSpinner } from "react-icons/fa";
import { Container, Form, SubmitButton, List } from "./styles";

export default function Json() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [url, setUrl] = useState("");

  const handleImport = () => {
    if (data === undefined || data === null || data === "")
      return alert("Insira uma requisição válida.");
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(data)], {
      type: "text/plain;charset-utf-8",
    });

    element.href = URL.createObjectURL(file);
    element.download = "JsonData.txt";
    document.body.appendChild(element);
    element.click();

    setData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(function () {
      setLoading(false);
      fetch(url)
        .then((response) => response.json())
        .then((data) => setData(data));
    }, 500);

    setUrl("");
  };

  return (
    <>
      <Button
        style={{
          float: "right",
          marginRight: "27%",
          marginTop: "1.5%",
          paddingRight: 30,
          backgroundColor: "#8585fd",
          borderColor: "#8585fd",
          color: "#fff",
          fontSize: 15,
        }}
        onClick={() => handleImport()}
      >
        Importar
      </Button>

      <Container>
        <h1>
          <FaPaste />
          Dados JSON
        </h1>

        <Form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Adicionar dados"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>{JSON.stringify(data)}</List>
      </Container>
    </>
  );
}
