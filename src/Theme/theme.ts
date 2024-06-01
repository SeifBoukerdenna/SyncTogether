// src/Theme/theme.ts
import { Theme } from "src/Theme/theme.d";
let nice;

export const theme: Theme = {
	colors: {
		white: "#FFFFFF",
		black: "#161616",
		primary: "#910EE8",
		secondary: "#03DAC6",
		accent: "#944E69",
		background: "#F5F5F5",
		surface: "#FFFFFF",
		error: "#B00020",

		onPrimary: "#FFFFFF",
		onSecondary: "#000000",
		onBackground: "#000000",
		onSurface: "#000000",
		onError: "#FFFFFF",

		darkPurple: "#3700B3",
		lightPurple: "#BB86FC",
		teal: "#03DAC6",
		lightTeal: "#BBFFF3",
		lightPink: "#FFC1E3",
		darkPink: "#C60055",
		grey: "#323232",
		lightGrey: "#E0E0E0",
		darkGrey: "#616161",
		blue: "#03A9F4",
		lightBlue: "#81D4FA",
		yellow: "#FFEB3B",
		lightYellow: "#FFF59D",
		green: "#4CAF50",
		lightGreen: "#A5D6A7",
	},
	spacings: {
		xxs: 4,
		xs: 8,
		s: 12,
		m: 16,
		l: 20,
		xl: 24,
		xxl: 32,
	},
	fontSize: {
		xxs: 10,
		xs: 12,
		s: 14,
		m: 16,
		l: 20,
		xl: 24,
		xxl: 28,
	},
};
