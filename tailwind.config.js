// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         purple: {
//           400: '#c084fc',
//           500: '#a855f7',
//           600: '#9333ea',
//           700: '#7e22ce',
//         },
//       },
//       boxShadow: {
//         'neon-purple': '0 0 5px theme("colors.purple.400"), 0 0 20px theme("colors.purple.600")',
//         'neon-bitcoin': '0 0 10px #f7931a, 0 0 20px #f7931a',
//         'neon-ethereum': '0 0 10px #3c3c3d, 0 0 20px #3c3c3d',
//         'neon-usd': '0 0 10px #00ff00, 0 0 20px #00ff00',
//       },
//     },
//   },
//   plugins: [],
// }



module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
        },
      },
      boxShadow: {
        'neon-purple': '0 0 5px #c084fc, 0 0 10px #9333ea',
      },
    },
  },
  plugins: [],
};
