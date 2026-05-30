/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Verdes institucionais
        'verde-escuro': '#006B2E',
        'verde-positivo': '#1F9D3A',
        'verde-claro': '#A3D94D',
        // Azuis técnicos
        'azul-escuro': '#062B63',
        'azul-profundo': '#031E49',
        'azul-medio': '#0455A7',
        'azul-claro': '#308BA8',
        // Neutros
        'fundo': '#F5F7FA',
        'texto-principal': '#102033',
        'texto-secundario': '#5A6B7A',
        // Status
        'alerta': '#FF9800',
        'critico': '#D32F2F',
        primary: {
          DEFAULT: '#006B2E',
          50: '#E8F5EC',
          100: '#C6E6D0',
          500: '#1F9D3A',
          600: '#157d2e',
          700: '#006B2E',
          800: '#055423',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(16, 32, 51, 0.06), 0 1px 2px rgba(16, 32, 51, 0.04)',
        'card-hover': '0 4px 14px rgba(16, 32, 51, 0.10)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
      },
    },
  },
  plugins: [],
}
