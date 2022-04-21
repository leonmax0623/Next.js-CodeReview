const defaultTheme = require('tailwindcss/defaultTheme')
const tailwindForms = require('@tailwindcss/forms')

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0971CE',
        secondary: '#18A0FB',
        gray: {
          40: '#E0E0E0',
        },
        'mine-shaft': '#2C2C2C',
        success: '#27AE60',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1rem' }], // 13px - 16px
      },
    },
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      textColor: ['disabled'],
      backgroundColor: ['disabled', 'odd'],
      opacity: ['disabled'],
      borderColor: ['disabled', 'odd', 'even'],
      border: ['disabled', 'odd', 'even'],
    },
  },
  plugins: [tailwindForms],
}
