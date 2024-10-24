/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        darkCard: '#1e293b',
        lightCard: '#f3f4f6',
        headingColor: '#111827',
        desColor: '#1f2937',
        paraColor: '#9ca3af',
        btnColor: '#6366f1',
        hoverBtnColor: '#4f46e5',
        themeColor: '#881337',

      },
    },
  },
  plugins: [],
};
