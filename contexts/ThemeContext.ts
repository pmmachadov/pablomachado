import { createContext } from 'react';

export const darkTheme = {
  backgroundColor: '#1e3a8a',
  color: '#e0e7ff',
};

interface Theme {
  themeStyle: {
    backgroundColor: string;
    color: string;
  };
}

const initialState: Theme = {
  themeStyle: darkTheme,
};

const ThemeContext = createContext<Theme>(initialState);

export default ThemeContext;
