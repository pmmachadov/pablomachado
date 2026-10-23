import { createContext } from 'react';

export const darkTheme = {
  backgroundColor: '#07070c',
  color: '#ededf3',
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
