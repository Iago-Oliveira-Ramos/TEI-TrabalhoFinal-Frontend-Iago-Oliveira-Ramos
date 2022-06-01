import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { Departamento } from "./UI/Departamento";
import { Empregado } from "./UI/Empregado";
import { Home } from "./UI/Home";
import { NavBarData } from "./NavBarData";
import { useState } from "react";
import { IconContext } from "react-icons";
import { Button } from "antd";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Sidebar } from "./Sidebar";
import Json from "./UI/Json";

export const NavBar = ({ username }) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = () => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <Sidebar />
        </BrowserRouter>
      </React.StrictMode>
    );
  };

  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={() => showSidebar()} />
          </Link>
          <div className="titulo">SISTEMA DE CADASTRO</div>

          <div
            style={{
              paddingLeft: 550,
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaIcons.FaRegUserCircle
              style={{ width: 40, height: 40, marginRight: 50 }}
            />
            <div
              style={{
                color: "#fff",
                fontSize: 25,
                fontStyle: "bold",
                marginRight: 50,
              }}
            >
              {localStorage.getItem("usuario")}
            </div>
            <Button
              style={{
                paddingRight: 30,
                backgroundColor: "red",
                borderColor: "red",
                color: "#fff",
                fontSize: 15,
              }}
              onClick={() => handleLogout()}
            >
              Sair
            </Button>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={() => showSidebar()}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {NavBarData.map((item, index) => {
              return (
                <li key={index} className={item.className}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/departamento" element={<Departamento />} />
        <Route path="/empregado" element={<Empregado />} />
        <Route path="/json" element={<Json />} />
      </Routes>
    </div>
  );
};
