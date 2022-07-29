/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      primary: {
        1: colors.sky[200],
        2: colors.sky[300],
        3: colors.sky[400],
        4: colors.sky[500],
        5: colors.sky[600],
        6: colors.sky[700]
      },
      secondary: {
        1: colors.purple[200],
        2: colors.purple[300],
        3: colors.purple[400],
        4: colors.purple[500],
        5: colors.purple[600],
        6: colors.purple[700]
      },
      main: {
        1: colors.white,
        2: colors.neutral[50],
        3: colors.neutral[200],
        4: colors.neutral[500],
        5: colors.neutral[600],
        6: colors.neutral[700],
        7: colors.neutral[800],
        8: colors.neutral[900]
      },
      transparent: colors.transparent
    },
    fontFamily: {
      primary: ['Inter', ...fontFamily.sans]
    }
  },
  plugins: []
}
