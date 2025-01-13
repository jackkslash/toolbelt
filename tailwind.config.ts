import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        c1: {
          DEFAULT: '#08070a',
          light: '#2a282d',
          lighter: '#4c4a50',
          dark: '#050406',
          darker: '#020203'
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ]
} satisfies Config;
