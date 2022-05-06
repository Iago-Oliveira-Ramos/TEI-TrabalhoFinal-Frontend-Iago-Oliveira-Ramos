import "./App.css";
import { NavBar } from "./components/NavBar";

export const App = () => {
  return (
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">Sistema de Cadastro</h3>

      <NavBar />
    </div>
  );
};
