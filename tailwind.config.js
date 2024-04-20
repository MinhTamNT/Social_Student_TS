export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
      },
      keyframes: {
        slideInSidebar: {
          from: {
            transform: "translateX(-250px)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        slideOutSidebar: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(-250px)",
          },
        },
      },
      animation: {
        "slide-in-sidebar": "slideInSidebar 0.3s ease",
        "slide-out-sidebar": "slideOutSidebar 0.3s ease",
      },

      fontSize: {
        13: "13px",
        14: "14px",
        16: "16px",
        20: "20px",
        26: "26px",
        24: "24px",
        32: "32px",
        36: "36px",
        48: "48px",
      },

      colors: {
        "text-natural": "#2A3C42",
        "bg-hover": "#eaedef",
        "red-color": "rgba(255, 59, 92, 1)",
        "color-icon-image": "#45bd62",
        "color-icon_video": "#f02849",
        "bg-gray": "#EEEEEE",
        "bg-blue": "#0866ff",
      },
    },
  },
  plugins: [],
};
