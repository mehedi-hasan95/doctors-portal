/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        'primery': '#323848',
        'primery-50': '#8391AD',
        'primery-100': '#D4D9E3',
        'secondery': '#0D544A',
        'secondery-50': '#19D3AE',
        'secondery-100': '#90FFE2',
        'sucess': '#154E64',
        'sucess-50': '#0FCFEC',
        'sucess-100': '#A4F4FD',
      },
    },
  },
  plugins: [require("daisyui")],
}
