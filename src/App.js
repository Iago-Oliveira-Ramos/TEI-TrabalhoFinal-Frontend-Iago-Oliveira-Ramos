import { useEffect } from "react";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { Sidebar } from "./components/Sidebar";

export const App = () => {
  useEffect(() => {
    localStorage.setItem("loggedIn", false);
  }, []);

  const loggedIn = localStorage.getItem("loggedIn");
  console.log(loggedIn);

  return <>{loggedIn === "false" ? <Sidebar /> : <NavBar />}</>;
};
