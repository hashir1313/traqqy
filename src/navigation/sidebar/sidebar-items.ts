import { FolderOpen, LayoutDashboard, type LucideIcon, Settings, User } from "lucide-react";

export type NavBadge = "new" | "soon";

export interface NavSubItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

interface NavItemBase {
  id: string;
  title: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

export interface NavMainLinkItem extends NavItemBase {
  url: string;
  subItems?: never;
}

export interface NavMainParentItem extends NavItemBase {
  subItems: NavSubItem[];
}

export type NavMainItem = NavMainLinkItem | NavMainParentItem;

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    items: [
      { id: "dashboard", title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { id: "projects", title: "Projects", url: "/dashboard/projects", icon: FolderOpen },
    ],
  },
  {
    id: 2,
    label: "Account",
    items: [
      { id: "settings", title: "Settings", url: "/dashboard/settings", icon: Settings },
      { id: "profile", title: "Profile", url: "/dashboard/profile", icon: User },
    ],
  },
];
