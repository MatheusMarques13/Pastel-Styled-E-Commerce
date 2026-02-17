"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTheme, themes, ThemeId } from "@/lib/theme-context";
import { SettingsIcon, GlobeIcon, PaletteIcon, MonitorIcon, ChevronDownIcon, CheckIcon } from "@/components/ui/Icons";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
];

export function SettingsDropdown() {
  const t = useTranslations();
  const { currentTheme, setTheme } = useTheme();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"language" | "theme">("theme");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-pink-100 hover:text-white rounded-full hover:bg-pink-600 transition-colors"
        aria-label="Settings"
      >
        <SettingsIcon />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-border overflow-hidden z-50">
          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("theme")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "theme"
                  ? "bg-surface text-text-primary border-b-2 border-primary"
                  : "text-text-secondary hover:bg-surface-alt hover:text-text-primary"
              }`}
            >
              <PaletteIcon className="w-4 h-4" />
              {t('settings.theme')}
            </button>
            <button
              onClick={() => setActiveTab("language")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "language"
                  ? "bg-surface text-text-primary border-b-2 border-primary"
                  : "text-text-secondary hover:bg-surface-alt hover:text-text-primary"
              }`}
            >
              <GlobeIcon className="w-4 h-4" />
              {t('settings.language')}
            </button>
          </div>

          {/* Content */}
          <div className="max-h-80 overflow-y-auto">
            {activeTab === "theme" ? (
              <div className="p-3">
                <p className="text-xs text-text-muted mb-3 px-1">{t('settings.chooseTheme')}</p>
                <div className="space-y-1">
                  <button
                    onClick={() => setTheme("system")}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      currentTheme === "system"
                        ? "bg-primary/20 text-text-primary"
                        : "text-text-secondary hover:bg-surface-alt hover:text-text-primary"
                    }`}
                  >
                    <MonitorIcon className="w-5 h-5" />
                    <span className="flex-1">System Match</span>
                    {currentTheme === "system" && <CheckIcon className="w-4 h-4 text-primary" />}
                  </button>
                  <div className="border-t border-border my-2" />
                  <div className="grid grid-cols-2 gap-2">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setTheme(theme.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                          currentTheme === theme.id
                            ? "bg-primary/20 text-text-primary ring-1 ring-primary"
                            : "text-text-secondary hover:bg-surface-alt hover:text-text-primary"
                        }`}
                      >
                        <span className="text-lg">{theme.emoji}</span>
                        <span className="text-sm">{theme.name}</span>
                        {currentTheme === theme.id && (
                          <CheckIcon className="w-3 h-3 ml-auto text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3">
                <p className="text-xs text-text-muted mb-3 px-1">{t('settings.selectLanguage')}</p>
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        router.push(`/${lang.code}`);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-text-secondary hover:bg-surface-alt hover:text-text-primary transition-colors"
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="flex-1">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
