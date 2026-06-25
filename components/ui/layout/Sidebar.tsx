"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  PackageOpen,
  ShieldAlert,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/usuarios", label: "Usuarios", icon: Users },
  { href: "/ordenes", label: "Órdenes", icon: ShoppingBag },
  { href: "/productos", label: "Productos", icon: PackageOpen },
  { href: "/moderacion", label: "Moderación", icon: ShieldAlert },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-card min-h-screen hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b">
        <h1 className="font-bold text-lg tracking-tight">Control Plane</h1>
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-xs">
            SA
          </div>
          <div className="text-sm">
            <p className="font-medium">Super Admin</p>
            <p className="text-xs text-muted-foreground">Sistema Global</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
