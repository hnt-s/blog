import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',  // ダークモードをクラスベースで有効にする
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.600'), 
            h1: { color: theme('colors.gray.600') }, 
            h2: { color: theme('colors.gray.600') },
            h3: { color: theme('colors.gray.600') },
            h4: { color: theme('colors.gray.600') },
            p: { color: theme('colors.gray.600') }, 
            a: { color: theme('colors.gray.600'), '&:hover': { color: theme('colors.sky.300') } }, 
          },
        },
        dark: {
          css: {
            color: theme('colors.white'), 
            h1: { color: theme('colors.white') }, 
            h2: { color: theme('colors.white') },
            h3: { color: theme('colors.white') },
            h4: { color: theme('colors.white') },
            p: { color: theme('colors.white') }, 
            a: { color: theme('colors.white'), '&:hover': { color: theme('colors.sky.500') } }, 
          },
        },
      }),
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
