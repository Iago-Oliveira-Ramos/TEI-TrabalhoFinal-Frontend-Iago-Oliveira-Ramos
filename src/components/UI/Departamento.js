import { variables } from "../../Variables";
import { useState, useEffect } from "react";

export const Departamento = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [nomeDepartamento, setNomeDepartamento] = useState("");
  const [idDepartamento, setIdDepartamento] = useState(0);

  const [idFiltro, setIdFiltro] = useState("");
  const [nomeFiltro, setNomeFiltro] = useState("");
  const [semFiltro, setSemFiltro] = useState([]);

  function refreshList() {
    fetch(variables.API_URL + "departamento")
      .then((response) => response.json())
      .then((data) => {
        setDepartamentos(data);
        setSemFiltro(data);
      });
  }

  function addClick() {
    setTitulo("Adicionar Departamento");
    setIdDepartamento(0);
    setNomeDepartamento("");
  }

  function editClick(dep) {
    setTitulo("Editar Departamento");
    setIdDepartamento(dep.DepartamentoId);
    setNomeDepartamento(dep.DepartamentoNome);
  }

  function createClick() {
    fetch(variables.API_URL + "departamento", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DepartamentoNome: nomeDepartamento,
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
    fetch(variables.API_URL + "departamento", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DepartamentoId: idDepartamento,
        DepartamentoNome: nomeDepartamento,
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
      fetch(variables.API_URL + "departamento/" + id, {
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

  const changeDepartmentIdFilter = (e) => {
    setIdFiltro(e.target.value);
    FilterFn();
  };
  const changeDepartmentNameFilter = (e) => {
    this.state.DepartmentNameFilter = e.target.value;
    this.FilterFn();
  };

  function FilterFn() {
    var IdFiltro = idFiltro;
    var NomeFiltro = nomeFiltro;

    var FilteredData = semFiltro.filter(function (el) {
      return (
        el.DepartamentoId.toString()
          .toLowerCase()
          .includes(IdFiltro.toString().trim().toLowerCase) &&
        el.DepartamentoNome.toString()
          .toLowerCase()
          .includes(NomeFiltro.toString().trim().toLowerCase)
      );
    });

    setDepartamentos(FilteredData);
  }

  useEffect(() => {
    refreshList();
  }, []);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => addClick()}
      >
        Adicionar Departamento
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>
              <input
                className="form-control m-2"
                onChange={(e) => changeDepartmentIdFilter(e)}
                placeholder="Filtro"
              />
              ID Departamento
            </th>
            <th>
              <input
                className="form-control m-2"
                onChange={(e) => {
                  setNomeFiltro(e.target.value);
                  FilterFn();
                }}
                placeholder="Filtro"
              />
              Nome Departamento
            </th>
            <th>Opções</th>
          </tr>
        </thead>

        <tbody>
          {departamentos.map((dep) => (
            <tr key={dep.DepartamentoId}>
              <td>{dep.DepartamentoId}</td>
              <td>{dep.DepartamentoNome}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => editClick(dep)}
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
                  onClick={() => deleteClick(dep.DepartamentoId)}
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
              <div className="input-group mb-3">
                <span className="input-group-text">Nome do Departamento</span>
                <input
                  type="text"
                  className="form-control"
                  value={nomeDepartamento}
                  onChange={(e) => setNomeDepartamento(e.target.value)}
                />
              </div>
            </div>

            {idDepartamento === 0 ? (
              <button
                type="button"
                className="btn btn-primary float-start"
                onClick={() => createClick()}
              >
                Criar
              </button>
            ) : null}

            {idDepartamento !== 0 ? (
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
  );
};
