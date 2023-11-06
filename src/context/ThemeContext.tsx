import { createContext, useState } from 'react';
import { ContextProps } from './AuthContext';

const ThemeContext = createContext({
  theme: 'light',
  toggleMode: () => {},
});

export function ThemeContextProvider({ children }: ContextProps) {
  const [theme, setTheme] = useState('light');
  const toggleMode = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return <ThemeContext.Provider value={{ theme, toggleMode }}>{children}</ThemeContext.Provider>;
}

export default ThemeContext;
