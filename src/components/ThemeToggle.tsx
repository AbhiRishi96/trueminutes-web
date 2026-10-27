"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem("trueminutes-theme");
    const next: Theme = saved === "light" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    window.localStorage.setItem("trueminutes-theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "dark" ? "bright" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "bright" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
