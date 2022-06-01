import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import { Login } from "../components/UI/Login";

import "./Sidebar.css";
import { Cadastro } from "./Cadastro";
import { Logo } from "./Logo";
import { NavBar } from "./NavBar";

export const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={() => showSidebar()} />
          </Link>
          <div className="titulo">SISTEMA DE CADASTRO</div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={() => showSidebar()}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
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
        <Route path={"*"} element={<Logo />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/cadastro"} element={<Cadastro />} />
        <Route path={"/navbar"} element={<NavBar />} />
      </Routes>
    </>
  );
};
