"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";

export type ThemeId =
  | "pastel"
  | "vibrant"
  | "ocean"
  | "sunset"
  | "forest"
  | "lavender"
  | "candy"
  | "dark"
  | "white"
  | "system";

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  secondaryDark: string;
  accent: string;
  accentDark: string;
  surface: string;
  surfaceAlt: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  headerBg: string;
  headerText: string;
  headerTextMuted: string;
  headerBorder: string;
  footerBg: string;
  footerText: string;
}

export interface Theme {
  id: ThemeId;
  name: string;
  emoji: string;
  colors: ThemeColors;
}

export const themes: Theme[] = [
  {
    id: "pastel",
    name: "Pastel",
    emoji: "🌸",
    colors: {
      primary: "#d1b3e8",
      primaryDark: "#b794d6",
      secondary: "#f8b4c8",
      secondaryDark: "#f09ab5",
      accent: "#a8d8ea",
      accentDark: "#7ec8e3",
      surface: "#fef9ef",
      surfaceAlt: "#f0ebe3",
      textPrimary: "#4a3f5c",
      textSecondary: "#7a6f8a",
      textMuted: "#a89bb5",
      border: "#e8e0d8",
      headerBg: "rgba(236, 72, 153, 0.9)",
      headerText: "#ffffff",
      headerTextMuted: "#fce7f3",
      headerBorder: "#db2777",
      footerBg: "#dc2626",
      footerText: "#ffffff",
    },
  },
  {
    id: "vibrant",
    name: "Vibrant",
    emoji: "🎨",
    colors: {
      primary: "#8b5cf6",
      primaryDark: "#7c3aed",
      secondary: "#ec4899",
      secondaryDark: "#db2777",
      accent: "#06b6d4",
      accentDark: "#0891b2",
      surface: "#faf5ff",
      surfaceAlt: "#f3e8ff",
      textPrimary: "#1e1b4b",
      textSecondary: "#4c1d95",
      textMuted: "#7c3aed",
      border: "#e9d5ff",
      headerBg: "rgba(139, 92, 246, 0.95)",
      headerText: "#ffffff",
      headerTextMuted: "#ddd6fe",
      headerBorder: "#7c3aed",
      footerBg: "#ec4899",
      footerText: "#ffffff",
    },
  },
  {
    id: "ocean",
    name: "Ocean",
    emoji: "🌊",
    colors: {
      primary: "#0ea5e9",
      primaryDark: "#0284c7",
      secondary: "#38bdf8",
      secondaryDark: "#0ea5e9",
      accent: "#2dd4bf",
      accentDark: "#14b8a6",
      surface: "#f0f9ff",
      surfaceAlt: "#e0f2fe",
      textPrimary: "#0c4a6e",
      textSecondary: "#075985",
      textMuted: "#0284c7",
      border: "#bae6fd",
      headerBg: "rgba(14, 165, 233, 0.95)",
      headerText: "#ffffff",
      headerTextMuted: "#bae6fd",
      headerBorder: "#0284c7",
      footerBg: "#0369a1",
      footerText: "#ffffff",
    },
  },
  {
    id: "sunset",
    name: "Sunset",
    emoji: "🌅",
    colors: {
      primary: "#f97316",
      primaryDark: "#ea580c",
      secondary: "#fb923c",
      secondaryDark: "#f97316",
      accent: "#fbbf24",
      accentDark: "#f59e0b",
      surface: "#fffbeb",
      surfaceAlt: "#fef3c7",
      textPrimary: "#78350f",
      textSecondary: "#92400e",
      textMuted: "#b45309",
      border: "#fde68a",
      headerBg: "rgba(249, 115, 22, 0.95)",
      headerText: "#ffffff",
      headerTextMuted: "#fed7aa",
      headerBorder: "#ea580c",
      footerBg: "#dc2626",
      footerText: "#ffffff",
    },
  },
  {
    id: "forest",
    name: "Forest",
    emoji: "🌿",
    colors: {
      primary: "#22c55e",
      primaryDark: "#16a34a",
      secondary: "#86efac",
      secondaryDark: "#4ade80",
      accent: "#a3e635",
      accentDark: "#84cc16",
      surface: "#f0fdf4",
      surfaceAlt: "#dcfce7",
      textPrimary: "#14532d",
      textSecondary: "#166534",
      textMuted: "#15803d",
      border: "#bbf7d0",
      headerBg: "rgba(34, 197, 94, 0.95)",
      headerText: "#ffffff",
      headerTextMuted: "#bbf7d0",
      headerBorder: "#16a34a",
      footerBg: "#166534",
      footerText: "#ffffff",
    },
  },
  {
    id: "lavender",
    name: "Lavender",
    emoji: "💜",
    colors: {
      primary: "#a78bfa",
      primaryDark: "#8b5cf6",
      secondary: "#c4b5fd",
      secondaryDark: "#a78bfa",
      accent: "#e879f9",
      accentDark: "#d946ef",
      surface: "#faf5ff",
      surfaceAlt: "#f3e8ff",
      textPrimary: "#3b0764",
      textSecondary: "#581c87",
      textMuted: "#7e22ce",
      border: "#e9d5ff",
      headerBg: "rgba(167, 139, 250, 0.95)",
      headerText: "#ffffff",
      headerTextMuted: "#e9d5ff",
      headerBorder: "#8b5cf6",
      footerBg: "#7c3aed",
      footerText: "#ffffff",
    },
  },
  {
    id: "candy",
    name: "Candy",
    emoji: "🍬",
    colors: {
      primary: "#f472b6",
      primaryDark: "#ec4899",
      secondary: "#fb7185",
      secondaryDark: "#f43f5e",
      accent: "#c084fc",
      accentDark: "#a855f7",
      surface: "#fff1f2",
      surfaceAlt: "#ffe4e6",
      textPrimary: "#881337",
      textSecondary: "#9f1239",
      textMuted: "#be123c",
      border: "#fecdd3",
      headerBg: "rgba(244, 114, 182, 0.95)",
      headerText: "#ffffff",
      headerTextMuted: "#fce7f3",
      headerBorder: "#ec4899",
      footerBg: "#e11d48",
      footerText: "#ffffff",
    },
  },
  {
    id: "dark",
    name: "Dark",
    emoji: "🌙",
    colors: {
      primary: "#818cf8",
      primaryDark: "#6366f1",
      secondary: "#f472b6",
      secondaryDark: "#ec4899",
      accent: "#34d399",
      accentDark: "#10b981",
      surface: "#1e1b2e",
      surfaceAlt: "#2d2a3e",
      textPrimary: "#e2e8f0",
      textSecondary: "#94a3b8",
      textMuted: "#64748b",
      border: "#3d3a4e",
      headerBg: "rgba(30, 27, 46, 0.98)",
      headerText: "#e2e8f0",
      headerTextMuted: "#94a3b8",
      headerBorder: "#3d3a4e",
      footerBg: "#0f0d1a",
      footerText: "#e2e8f0",
    },
  },
  {
    id: "white",
    name: "White",
    emoji: "⬜",
    colors: {
      primary: "#3b82f6",
      primaryDark: "#2563eb",
      secondary: "#f43f5e",
      secondaryDark: "#e11d48",
      accent: "#8b5cf6",
      accentDark: "#7c3aed",
      surface: "#ffffff",
      surfaceAlt: "#f8fafc",
      textPrimary: "#0f172a",
      textSecondary: "#475569",
      textMuted: "#94a3b8",
      border: "#e2e8f0",
      headerBg: "rgba(255, 255, 255, 0.98)",
      headerText: "#0f172a",
      headerTextMuted: "#475569",
      headerBorder: "#e2e8f0",
      footerBg: "#f1f5f9",
      footerText: "#0f172a",
    },
  },
];

interface ThemeContextType {
  currentTheme: ThemeId;
  resolvedTheme: Theme;
  setTheme: (theme: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemPreference(): "dark" | "light" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(themeId: ThemeId): Theme {
  if (themeId === "system") {
    const pref = getSystemPreference();
    return themes.find((t) => t.id === (pref === "dark" ? "dark" : "pastel"))!;
  }
  return themes.find((t) => t.id === themeId) || themes[0];
}

function applyThemeToDOM(theme: Theme) {
  const root = document.documentElement;
  const c = theme.colors;
  root.style.setProperty("--color-primary", c.primary);
  root.style.setProperty("--color-primary-dark", c.primaryDark);
  root.style.setProperty("--color-secondary", c.secondary);
  root.style.setProperty("--color-secondary-dark", c.secondaryDark);
  root.style.setProperty("--color-accent", c.accent);
  root.style.setProperty("--color-accent-dark", c.accentDark);
  root.style.setProperty("--color-surface", c.surface);
  root.style.setProperty("--color-surface-alt", c.surfaceAlt);
  root.style.setProperty("--color-text-primary", c.textPrimary);
  root.style.setProperty("--color-text-secondary", c.textSecondary);
  root.style.setProperty("--color-text-muted", c.textMuted);
  root.style.setProperty("--color-border", c.border);
  root.style.setProperty("--color-header-bg", c.headerBg);
  root.style.setProperty("--color-header-text", c.headerText);
  root.style.setProperty("--color-header-text-muted", c.headerTextMuted);
  root.style.setProperty("--color-header-border", c.headerBorder);
  root.style.setProperty("--color-footer-bg", c.footerBg);
  root.style.setProperty("--color-footer-text", c.footerText);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Lazy load theme from localStorage
  const [currentTheme, setCurrentTheme] = useState<ThemeId>(() => {
    if (typeof window === "undefined") return "pastel";
    const saved = localStorage.getItem("yourshop-theme") as ThemeId | null;
    if (saved && (themes.some((t) => t.id === saved) || saved === "system")) {
      return saved;
    }
    return "pastel";
  });

  const resolvedTheme = useMemo(() => resolveTheme(currentTheme), [currentTheme]);

  // Apply theme whenever it changes
  useEffect(() => {
    applyThemeToDOM(resolvedTheme);
  }, [resolvedTheme]);

  // Listen for system preference changes when using "system" theme
  useEffect(() => {
    if (currentTheme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const resolved = resolveTheme("system");
      applyThemeToDOM(resolved);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [currentTheme]);

  const setTheme = useCallback((theme: ThemeId) => {
    setCurrentTheme(theme);
    localStorage.setItem("yourshop-theme", theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
