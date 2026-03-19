import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Upload,
  Activity,
  Bot,
  Settings,
  History,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  const navGroups = [
    {
      label: "Main Workflow",
      links: [
        { href: "/dashboard", icon: LayoutDashboard, text: "Dashboard" },
        { href: "/upload", icon: Upload, text: "Upload File" },
        { href: "/analysis", icon: Activity, text: "File Analysis" },
        { href: "/history", icon: History, text: "History" },
        { href: "/ai", icon: Bot, text: "Claimbot" },
        { href: "/settings", icon: Settings, text: "Settings" },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 transition-all duration-300 flex flex-col h-full overflow-y-auto hidden md:flex text-slate-600 dark:text-slate-300 print:hidden",
        isOpen ? "w-[260px]" : "w-0 overflow-hidden border-none",
      )}
    >
      <div className="flex items-center justify-between h-16 min-h-[4rem] px-4 border-b border-gray-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10 transition-colors duration-300">
        <div className="flex items-center gap-2">
          <img src={logo} alt="ClaimLens Logo" className="h-8 w-auto" />
          <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
            ClaimLens
          </span>
        </div>
      </div>

      <nav className="p-4 space-y-6 flex-1 text-sm font-medium">
        {navGroups.map((group, i) => (
          <div key={i}>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-2">
              {group.label}
            </div>
            <div className="space-y-1">
              {group.links.map((link) => {
                const isActive =
                  (location.pathname.startsWith(link.href) &&
                    link.href !== "/dashboard") ||
                  location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200",
                      isActive
                        ? "bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
                    )}
                  >
                    <link.icon className="w-4 h-4" />
                    <span className="sidebar-text truncate">{link.text}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
