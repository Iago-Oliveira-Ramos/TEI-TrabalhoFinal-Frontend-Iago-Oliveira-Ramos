export const Home = () => {
  return (
    <div className="container mt-4">
      <div className="jumbotron">
        <img
          src={require("../../assets/Pic.jpg")}
          alt="Foto do desenvolvedor"
          style={{
            float: "right",
            width: 250,
            heigth: 260,
            borderRadius: 20,
          }}
        />
        <h1 className="display-4">Iago Oliveira Ramos</h1>

        <h3>RA: 2840 4819 11019</h3>
        <p style={{ fontStyle: "italic" }}>Tecnologias Utilizadas</p>
        <p className="lead">
          <a style={{ color: "#23A6EC" }}>React</a>
          <br />
          <a style={{ color: "#23A6EC" }}>Python Django</a>
          <br />
          <a style={{ color: "#23A6EC" }}>SQLite</a>
        </p>
        <hr className="my-4" />
        <p style={{ fontSize: 20 }}>
          <b>Tema escolhido:</b> Sistema de cadastro de departamentos e
          empregados.
        </p>

        <p style={{ fontSize: 20 }}>
          <b>Objetivo:</b> Desenvolver um sistema fullstack integrado a um banco
          de dados para realizar o CRUD dos dados nas tabelas.
        </p>
        <br />
        <br />
        <p style={{ fontSize: 16 }}>
          <b>Disciplina:</b> Tópicos Essenciais em Informática
        </p>
        <p style={{ fontSize: 16 }}>
          <b>Semestre:</b> 6º Semestre, manhã
        </p>
        <p style={{ fontSize: 16 }}>
          <b>Professor:</b> Fabricio Gustavo Henrique
        </p>
      </div>
    </div>
  );
};
