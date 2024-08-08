/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/index.html',
  ],
  theme: {
    extend: {
      colors:{
        'hbar': "rgba(248, 248, 230)",
        'hbarx': "rgba(248, 248, 248, 0.1)",
        'x' : 'rgb(96, 114, 116)',
        'y' : 'rgb(0, 105, 137)',
        'z' : 'rgb(90, 114, 160)',
        'a' : 'rgb(152, 112, 112)',
        'b' : ' rgb(33, 156, 144)',
      },
      fontFamily : {
        roboto : ['Roboto', 'sans-serif'],
        satoshi : ['Satoshi', 'sans-serif'],
      },
      width:{
        'h-extra' : '28rem'
      },
      screens:{
        ssm :'0px',
        sm : '480px',
        md : '768px',
        lg : '976px',
        xl : '1440px', // Mac M1
        xxl : '1920px' 
      },
      margin:{
        smxtra : '20rem',
        mdxtra : '22rem',
        lgxtra : '24rem',
        xlxtra : '28rem',
        xxlxtra : '40rem',

        sourcegap: '16rem',
        xlleft:'60rem',

        eye :'15.5rem',
        pencil : '0.8rem',
        
        // This was for filters, but for now filters have been removed
        smhbar : '164rem',
        mdhbar : '78.5rem',
        lghbar : '51rem',
        xlhbar : '34rem', // Mac M1
        xxlhbar: '26.5rem',
      },
    },
  },
  plugins: [],
}