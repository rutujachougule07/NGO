import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // 'forest' (from reference images) or 'maroon' (from prompt text)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ilf_theme') || 'forest';
  });

  useEffect(() => {
    localStorage.setItem('ilf_theme', theme);
    const root = document.documentElement;
    if (theme === 'maroon') {
      root.classList.add('theme-maroon');
    } else {
      root.classList.remove('theme-maroon');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'forest' ? 'maroon' : 'forest'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
