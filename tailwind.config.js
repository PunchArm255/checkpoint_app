/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        khder: '#6fc641',
        byed: '#FFFFFF',
        mainpurpe: '#1a0537',
        secpurpe: '#c5b0ef',
        lightpurpe: '#eee0fe',
        gradL: '#18154a',
        gradR: '#2c1f59',
        secred: '#d39999',
        mainred: '#330000',
        mainblue: '#000233',
        secblue: '#99a5d3',
        savpurpe: '#e8d1ff',
        hapurpe: '#6100bc',
        hapurpe2: '#6100bc',
        hliba: '#efefef',
        darkaHliba: '#8c8c8c',
        fakeGlass: 'rgba(239, 239, 239, 0.17)',
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight","sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      }
  },
  plugins: [],
}
}
