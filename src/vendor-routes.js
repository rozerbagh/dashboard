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

let routes = [
  {
    path: "/vendor/maindashboard",
    name: "Dashboard",
    icon: FiHome,
    menuKey: "dasboard",
  },
  {
    path: "#",
    name: "Privilege",
    icon: FiCommand,
    moreIcon: TiArrowSortedDown,
    lessIcon: TiArrowSortedUp,
    menuKey: "privilege",
    subMenu: [
      {
        path: "/vendor/privilege/vendors",
        name: "Users",
      },
    ]
  },
  {
    path: "/vendor/vprofile",
    name: "Profile",
    icon: FiUser,
  }
];

const toggleRoutes = (inside_customer) => {
  if (inside_customer === true) {
    routes = [
      {
        path: "/vendor/maindashboard",
        name: "Main Dashboard",
        icon: FiHome,
        menuKey: "maindashboard",
      },
      {
        path: "/vendor/dashboard",
        name: "Dashboard",
        icon: FiHome,
        menuKey: "dashboard",
      },
      {
        path: "#",
        name: "Manage",
        icon: FiSettings,
        moreIcon: TiArrowSortedDown,
        lessIcon: TiArrowSortedUp,
        menuKey: "manage",
        subMenu: [
          {
            path: "/vendor/manage/instance",
            name: "Instance",
          },
          {
            path: "/vendor/manage/zoom_view",
            name: "Zoom View",
          },
          {
            path: "/vendor/manage/setting",
            name: "Setting",
          },
        ]
      }
    ];
    return routes;
  } else {
    routes = [
      {
        path: "/vendor/maindashboard",
        name: "Dashboard",
        icon: FiHome,
        menuKey: "maindashboard",
      },
      {
        path: "#",
        name: "Privilege",
        icon: FiCommand,
        moreIcon: TiArrowSortedDown,
        lessIcon: TiArrowSortedUp,
        menuKey: "privilege",
        subMenu: [
          {
            path: "/vendor/privilege/vendors",
            name: "Users",
          },
        ]
      },
      {
        path: "/vendor/vprofile",
        name: "Profile",
        icon: FiUser,
        menuKey: "profile",
      }
    ];
    return routes;
  }
}

export default toggleRoutes;
