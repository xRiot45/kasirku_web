import { FaUsers } from "react-icons/fa";
import { FaBoxesStacked } from "react-icons/fa6";
import { GiDatabase } from "react-icons/gi";
import { HiDocumentReport } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

export const menuItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: <MdDashboard />,
  },

  {
    name: "Menu",
  },
  {
    name: "Master Data",
    href: "#",
    icon: <GiDatabase />,
    dropdownItems: [
      {
        name: "Role",
        href: "/admin/master/roles",
      },
      {
        name: "Product Category",
        href: "/admin/master/product-category",
      },
    ],
  },

  {
    name: "Users",
    href: "/admin/users",
    icon: <FaUsers />,
  },

  {
    name: "Products",
    href: "/admin/products",
    icon: <FaBoxesStacked />,
  },
  {
    name: "Reports",
    href: "/admin/reports",
    icon: <HiDocumentReport />,
  },
];
