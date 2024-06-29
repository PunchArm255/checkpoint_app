/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        khder: '#6fc641',
        byed: '#FFFFFF',
        mainpurpe: '1a0537',
        secpurpe: '#c5b0ef',
        lightpurpe: '#eee0fe',
        gradL: '#18154a',
        gradR: '#2c1f59'
    },
    backgroundImage: {
      grapurpe: 'linear-gradient(90deg, #1c063b 0%, #080019 100%)',
    },
  },
  plugins: [],
}
}
