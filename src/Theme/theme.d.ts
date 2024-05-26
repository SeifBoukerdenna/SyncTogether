// src/Theme/theme.d.ts
export interface Theme {
  colors: {
    white: string;
    black: string;
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    error: string;
    onPrimary: string;
    onSecondary: string;
    onBackground: string;
    onSurface: string;
    onError: string;
    darkPurple;
    lightPurple;
    teal;
    lightTeal;
    lightPink;
    darkPink;
    grey;
    lightGrey;
    darkGrey;
    blue;
    lightBlue;
    yellow;
    lightYellow;
    green;
    lightGreen;
  };
  spacings: {
    xxs: number;
    xs: number;
    s: number;
    m: number;
    l: number;
    xl:number;
    xxl: number;
  };
}