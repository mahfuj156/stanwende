const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
content: [ "./src/**/*.{js,jsx}", "./src/blocks/**/*.{js,jsx}", "./**/*.php",
   "./wp-content/plugins/zero-theme-block/**/*.php",
    "./wp-content/plugins/zero-theme-block/src/blocks/**/*.php",

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
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.8s ease-out forwards',
      },
      /* ----------------------------------------------
         ⬇️ Background Colors (from your design system)
      ---------------------------------------------- */
      colors: {
        "bg1": "#F3F7F4",
        "bg2": "#FFFEFC",
        "bg3": "#E4ECE5",
        "bg4": "#FFF8ED",
        "white": "#FFFFFF",
        "gold": "#DC7B30",
        "green-1": "#587D5C",
        "warning": "#B06226", 
 
        "primary": "#6F9D74",
        "secondary": "#212F22",
        "info": "#2C3E2E",
        "828382": "#828382",

        /* Existing */
        "custom-bg": "#F3F7F4",
        "custom-black": "#060806",
        "green-light": "#6F9D74",
        "gray-light": "#66625C",
      },

      /* ----------------------------------------------
         ⬇️ Typography
      ---------------------------------------------- */
      fontSize: {
        h54: "54px",
        h46: "46px",
        h38: "38px",
        h32: "32px",
        h22: "22px",
        h20: "20px",
        h18: "18px",

        p18: "18px",
        p16: "16px",
      },
      lineHeight: {
        h54: "62px",
        h46: "54px",
        h38: "44px",
        h32: "44px",
        p18: "28px",
        '114': '114%',
        '150': '150%',
    },

      /* ----------------------------------------------
         ⬇️ Button Shadows
      ---------------------------------------------- */
      boxShadow: {
        "btn-primary": [
          "0px 1px 2px 0px #0608060D",
          "0px -2px 1px 0px #00000033 inset",
          "0px 0px 0px 1px #06080626 inset",
          "0px 2px 1px 0px #FFFFFF40 inset",
          "0px 32px 24px 0px #FFFFFF0D inset"
        ].join(", "),

        "btn-secondary": [
          "0px 1px 2px 0px #0608060D",
          "0px -2px 1px 0px #0608060D inset",
          "0px 0px 0px 1px #0608060D inset"
        ].join(", "),
      },
       borderRadius: {
        '12': '12px',
      },
      /* ----------------------------------------------
         ⬇️ Container Widths
      ---------------------------------------------- */
      maxWidth: {
        'container-wide': '1312px',
        'container-medium': '1154px',
        'container-narrow': '700px',
      },

      /* ----------------------------------------------
         ⬇️ Extra Utilities
      ---------------------------------------------- */
      spacing: {
        "btn-x": "20px",
        "btn-y": "12px",
        "20": "80px",
      },
    },
  },

  /* ----------------------------------------------
     Safelist prevents classes from being purged
  ---------------------------------------------- */
  safelist: [
    "bg-custom-bg",
    "bg-bg1",
    "bg-bg2",
    "bg-bg3",
    "bg-bg4",
    "bg-info",
    "gold",
    "text-h54",
    "text-h46",
    "text-h38",
    "text-h32",
    "text-h22",
    "text-h20",
    "text-h18",
    "text-info",
    "text-warning",
    "828382",
    "text-green-1",
  ],

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/uploads', to: 'uploads' }
      ],
    }),
  ],
};
