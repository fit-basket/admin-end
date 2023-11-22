import {
  BuildingStorefrontIcon,
  ChartBarSquareIcon,
  ListBulletIcon,
  ShoppingBagIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

export const sidebarNavigation = [
  {
    name: "Business",
    to: "/business",
    icon: BuildingStorefrontIcon,
    current: true,
  },
  { name: "Dashboard", to: "/", icon: ChartBarSquareIcon, current: true },
  { name: "Products", to: "/products", icon: ListBulletIcon, current: false },
  { name: "Reviews", to: "/reviews", icon: StarIcon, current: false },
  { name: "Orders", to: "/orders", icon: ShoppingBagIcon, current: false },
];

export const userNavigation = [
  { name: "Your Profile", to: "/" },
  { name: "Settings", to: "/" },
];
