import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Departamento } from "./UI/Departamento";
import { Empregado } from "./UI/Empregado";
import { Home } from "./UI/Home";

export const NavBar = () => {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <Link className="btn btn-light btn-outline-primary" to="/home">
                Home
              </Link>
            </li>

            <li className="nav-item- m-1">
              <Link
                className="btn btn-light btn-outline-primary"
                to="/departamento"
              >
                Departamento
              </Link>
            </li>

            <li className="nav-item- m-1">
              <Link
                className="btn btn-light btn-outline-primary"
                to="/empregado"
              >
                Empregado
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/departamento" element={<Departamento />} />
          <Route path="/empregado" element={<Empregado />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
