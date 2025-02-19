import { useEffect, useState } from "react";

const ToggleTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Apply the theme to the document's body or root element
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <label className="swap swap-rotate">
      {/* Hidden checkbox to toggle the theme */}
      <input
        type="checkbox"
        className="hidden"
        checked={theme === "dark"}
        onChange={handleThemeToggle}
      />

      {/* Sun Icon (for Light Mode) */}
      <svg
        className="swap-off w-10 h-10 fill-current text-yellow-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M12 2a1 1 0 011 1v2a1 1 0 01-2 0V3a1 1 0 011-1zm6.364 3.636a1 1 0 011.415 0l1.414 1.415a1 1 0 11-1.414 1.414L18.364 7.05a1 1 0 010-1.414zM22 11a1 1 0 010 2h-2a1 1 0 110-2h2zM5.636 4.05a1 1 0 011.414 1.415L5.636 6.88a1 1 0 11-1.414-1.415l1.414-1.414zM4 11a1 1 0 110 2H2a1 1 0 110-2h2zm10 9a1 1 0 011-1v-2a1 1 0 10-2 0v2a1 1 0 011 1zm6.364-2.364a1 1 0 00-1.415 0L18.364 18.95a1 1 0 101.415 1.415l1.414-1.414a1 1 0 000-1.415zM12 6.5A5.5 5.5 0 1017.5 12 5.51 5.51 0 0012 6.5zm0 9A3.5 3.5 0 1115.5 12 3.5 3.5 0 0112 15.5z" />
      </svg>

      {/* Moon Icon (for Dark Mode) */}
      <svg
        className="swap-on w-10 h-10 fill-current text-gray-300"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73A8.15 8.15 0 019.08 5.49a8.59 8.59 0 01.25-2A1 1 0 008 2.36 10.14 10.14 0 1022 14.05a1 1 0 00-.36-1.05zM12.14 19.73A8.14 8.14 0 017.08 5.22v.27A10.15 10.15 0 0017.22 15.63a9.79 9.79 0 002.1-.22 8.11 8.11 0 01-7.18 4.32z" />
      </svg>
    </label>
  );
};

export default ToggleTheme;
