import { variables } from "../../Variables";
import { useState, useEffect } from "react";

export const Empregado = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [empregados, setEmpregados] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [idEmpregado, setIdEmpregado] = useState(0);
  const [nomeEmpregado, setNomeEmpregado] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [dataIngressao, setDataIngressao] = useState("");
  const [nomeFoto, setNomeFoto] = useState("anonymous.png");
  const [photoPath] = useState(variables.PHOTO_URL);

  function refreshList() {
    fetch(variables.API_URL + "empregado")
      .then((response) => response.json())
      .then((data) => {
        setEmpregados(data);
      });

    fetch(variables.API_URL + "departamento")
      .then((response) => response.json())
      .then((data) => {
        setDepartamentos(data);
      });
  }

  function addClick() {
    setTitulo("Adicionar Empregado");
    setIdEmpregado(0);
    setNomeEmpregado("");
    setDepartamento("");
    setDataIngressao("");
    setNomeFoto("anonymous.png");
  }

  function editClick(emp) {
    setTitulo("Editar Empregado");
    setIdEmpregado(emp.EmpregadoId);
    setNomeEmpregado(emp.EmpregadoNome);
    setDepartamento(emp.Departamento);
    setDataIngressao(emp.DataDeIngressao);
    setNomeFoto(emp.FotoPerfil);
  }

  function createClick() {
    fetch(variables.API_URL + "empregado", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmpregadoNome: nomeEmpregado,
        Departamento: departamento,
        DataDeIngressao: dataIngressao,
        FotoPerfil: nomeFoto,
      }),
    })
      .then((response) => response.json())
      .then(
        (result) => {
          alert(result);
          refreshList();
        },
        (error) => {
          alert("Falhou.");
        }
      );
  }

  function updateClick() {
    fetch(variables.API_URL + "empregado", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmpregadoId: idEmpregado,
        EmpregadoNome: nomeEmpregado,
        Departamento: departamento,
        DataDeIngressao: dataIngressao,
        FotoPerfil: nomeFoto,
      }),
    })
      .then((response) => response.json())
      .then(
        (result) => {
          alert(result);
          refreshList();
        },
        (error) => {
          alert("Falhou.");
        }
      );
  }

  function deleteClick(id) {
    if (window.confirm("Tem certeza?")) {
      fetch(variables.API_URL + "empregado/" + id, {
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
            refreshList();
          },
          (error) => {
            alert("Falhou.");
          }
        );
    }
  }

  const imageUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    fetch(variables.API_URL + "empregado/salvarfoto", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setNomeFoto(data);
      });
  };

  useEffect(() => {
    refreshList();
  }, []);

  return (
    <div style={{ paddingTop: 40, paddingLeft: 20, paddingRight: 20 }}>
      <button
        type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => addClick()}
      >
        Adicionar Empregado
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID Empregado</th>
            <th>Nome Empregado</th>
            <th>Departamento</th>
            <th>Data de Ingressão</th>
            <th>Opções</th>
          </tr>
        </thead>

        <tbody>
          {empregados.map((emp) => (
            <tr key={emp.EmpregadoId}>
              <td>{emp.EmpregadoId}</td>
              <td>{emp.EmpregadoNome}</td>
              <td>{emp.Departamento}</td>
              <td>{emp.DataDeIngressao}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => editClick(emp)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => deleteClick(emp.EmpregadoId)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
              <div className="d-flex flex-row bd-highlight mb-3">
                <div className="p-2 w-50 bd-highlight">
                  <div className="input-group mb-3">
                    <span className="input-group-text">Nome do Empregado</span>
                    <input
                      type="text"
                      className="form-control"
                      value={nomeEmpregado}
                      onChange={(e) => setNomeEmpregado(e.target.value)}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Departamento</span>
                    <select
                      className="form-select"
                      value={departamento}
                      onChange={(e) => setDepartamento(e.target.value)}
                    >
                      {departamentos.map((dep) => (
                        <option key={dep.DepartamentoId}>
                          {dep.DepartamentoNome}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Data de Ingressão</span>
                    <input
                      type="date"
                      className="form-control"
                      value={dataIngressao}
                      onChange={(e) => setDataIngressao(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2 w-50 bd-highlight">
                  <img
                    width="250px"
                    height="250px"
                    src={photoPath + nomeFoto}
                    alt="Foto de Perfil"
                  />
                  <input
                    className="m-2"
                    type="file"
                    onChange={(e) => imageUpload(e)}
                  />
                </div>
              </div>
              {idEmpregado === 0 ? (
                <button
                  type="button"
                  className="btn btn-primary float-start"
                  onClick={() => createClick()}
                >
                  Criar
                </button>
              ) : null}

              {idEmpregado !== 0 ? (
                <button
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
      </div>
    </div>
  );
};
