import * as IoIcons from "react-icons/io5";
import * as VscIcons from "react-icons/vsc";
import * as ImIcons from "react-icons/im";
import * as MdIcons from "react-icons/md";

export const NavBarData = [
  {
    title: "Home",
    path: "/home",
    icon: <IoIcons.IoHome />,
    className: "nav-text",
  },
  {
    title: "Departamento",
    path: "/departamento",
    icon: <MdIcons.MdWork />,
    className: "nav-text",
  },
  {
    title: "Empregado",
    path: "/empregado",
    icon: <ImIcons.ImUsers />,
    className: "nav-text",
  },
  {
    title: "JSON",
    path: "/json",
    icon: <VscIcons.VscJson />,
    className: "nav-text",
  },
];
