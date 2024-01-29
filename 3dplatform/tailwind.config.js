/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: { // Agrega la clase de fondo personalizada
        'custom': '#fffff', // Reemplaza con tu color deseado
      },
    },
  },
  plugins: [],
}
