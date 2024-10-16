/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        branco: {
          fundo: '#FAFAFA'
        },
        preto: {
          padrao: '#0D0D0D'
        },
        laranja: {
          fraco: '#F28705',
          medio: '#F27405',
          escuro: '#8C3503'
        },
        bege: {
          padrao: '#A68F7B'
        }
      },
      fontFamily: {
        quicksand: ['Quicksand', 'serif'],
        roboto: ['Roboto', 'sans-serif']
      },
      keyframes: {
        bounce: { 
          '0%, 100%': { transform: 'translateY(-2%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1)'},
          '50%': { transform: 'translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1)'}
        }
      }
    },
  },
  plugins: [],
}

