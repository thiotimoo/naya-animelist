/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        page: '#121212', // Dark background
        
      },
      textColor: {
        body: '#ffffff', // Light text on dark background
      },
      textColor: {
        body: '#ffffff', // White text
        heading: '#ffcc00', // Yellow heading text
        link: '#3490dc', // Primary color for links
      },
      borderColor: {
        border: '#333333', // Dark border color
      },
      colors: {
          primary: '#ff69b4', // Pinkish primary color
          secondary: '#3490dc', // Blue secondary color
          neutral: '#718096',
          error: '#e53e3e',
          warning: '#f6e05e',
          success: '#38a169',
          link: '#4299e1',
          accent: '#ed64a6',
      }
    },
  },
  plugins: [],
}
