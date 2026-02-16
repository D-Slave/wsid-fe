import type { ReactNode } from "react";
import "./menu-mvp.css";
import MenuTabNav from "@/features/menu-mvp/components/menu-tab-nav";

export default function MenuMvpLayout({ children }: { children: ReactNode }) {
  return (
    <main className="menu-mvp-shell">
      <div className="menu-mvp-container">{children}</div>
      <MenuTabNav />
    </main>
  );
}
