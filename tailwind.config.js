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
        quicksand: ['Quicksand', 'serif']
      }
    },
  },
  plugins: [],
}

