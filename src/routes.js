import {
  FiHome,
  FiCommand,
  FiSettings,
  FiFileMinus,
  FiFileText,
  FiUser,
  FiChevronDown,
  FiChevronUp
} from "react-icons/fi";

import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
// core components/views for Admin layout

const dashboardRoutes = [
  {
    path: "/coc/dashboard",
    name: "Dashboard",
    icon: FiHome,
    menuKey: "dasboard",
  },
  {
    path: "/coc/users",
    name: "Users",
    icon: FiCommand,
    menuKey: "users",
  },
  {
    path: "/coc/graphs",
    name: "Graphs",
    icon: FiSettings,
    menuKey: "graphs",
  },
  {
    path: "/coc/invoices",
    name: "Billing",
    icon: FiSettings,
    menuKey: "billing",
  },

  {
    path: "/coc/bandwidth",
    name: "Bandwidth",
    icon: FiFileText,
    menuKey: "bandwidth",
  },
  {
    path: "/coc/profile",
    name: "Profile",
    icon: FiUser,
    menuKey: "profile",
  }
];

export default dashboardRoutes;
