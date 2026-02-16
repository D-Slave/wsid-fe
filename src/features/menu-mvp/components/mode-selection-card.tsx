import type { ReactNode } from "react";

interface ModeSelectionCardProps {
  title: string;
  description: string;
  action: ReactNode;
  selected?: boolean;
}

export default function ModeSelectionCard({
  title,
  description,
  action,
  selected = false,
}: ModeSelectionCardProps) {
  return (
    <section
      className={`menu-mvp-card menu-mvp-mode-card menu-mvp-fade-up ${
        selected ? "menu-mvp-mode-card-selected" : ""
      }`}
    >
      <h2 className="menu-mvp-card-title">{title}</h2>
      <p className="menu-mvp-card-desc">{description}</p>
      {action}
    </section>
  );
}
