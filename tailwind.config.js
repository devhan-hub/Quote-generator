/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        quote:'"Playfair Display", serif',
        author:'"Roboto", sans-serif'

      },
      colors:{
        commen:'#56aeff',
      },
      backgroundImage: {
        'custom-radial': 'radial-gradient(circle farthest-side at 50% 50%, rgb(239, 205, 142), rgb(241, 199, 119), rgb(225, 176, 85))',
      },
      boxShadow:{
        boxshadow:"2px 2px 2px 2px rgba(0,0,0,0.1)",
      },
      screens:{
        mdet:'550px',
        
      },
      transitionProperty:{
        dire:"top, left,right",
      },

    },
  },
  plugins: [],
}

