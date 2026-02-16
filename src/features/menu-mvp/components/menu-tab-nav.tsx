"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/menu", label: "추천" },
  { href: "/menu/saved", label: "저장" },
  { href: "/menu/activity", label: "활동" },
] as const;

export default function MenuTabNav() {
  const pathname = usePathname();

  return (
    <nav className="menu-mvp-tab-nav" aria-label="메뉴 내비게이션">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`menu-mvp-tab ${isActive ? "active" : ""}`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
