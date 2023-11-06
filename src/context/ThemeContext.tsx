import { createContext, useState } from 'react';
import { ContextProps } from './AuthContext';

const ThemeContext = createContext({
  theme: 'light',
  toggleMode: () => {},
});

export function ThemeContextProvider({ children }: ContextProps) {
  const [theme, setTheme] = useState(window.localStorage.getItem('theme') || 'light');
  const toggleMode = () => {
    const changeTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(changeTheme);
    localStorage.setItem('theme', changeTheme);
  };

  return <ThemeContext.Provider value={{ theme, toggleMode }}>{children}</ThemeContext.Provider>;
}

export default ThemeContext;
