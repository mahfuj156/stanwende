module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./**/*.php",
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
        sm: '1rem',
        lg: '4rem',
        xl: '6rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1312px',
      },
    },

    extend: {
      colors: {
        "custom-bg": "#F3F7F4",
        'custom-black': '#060806', 
        'green-light': '#6F9D74', 
        "gray-light": "#66625C",
      },

      // 👇 Add custom container here
      maxWidth: {
        'container-wide': '1312px',   // custom container width
        'container-narrow': '700px',  // extra example
      },
    },
    utilities: {
    '.break-inside-avoid': {
      'break-inside': 'avoid'
    }
  }
  },

  safelist: ["bg-custom-bg"],
  plugins: [],
};
