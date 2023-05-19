import { createContext } from 'react';

export const ThemeContext = createContext('light');

export default ThemeContext;

export const ThemeConsumer = ThemeContext.Consumer;
export const ThemeProvider = ThemeContext.Provider;
