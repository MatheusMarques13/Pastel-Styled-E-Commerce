import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-2xl border border-border p-6
        ${hover ? "hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer" : "shadow-sm"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
