export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sora: ["Sora"],
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
      boxShadow: {
        md: "6px 6px 16px 0 rgba(0, 0, 0, 0.25),-4px -4px 12px 0 rgba(255, 255, 255, 0.3);",
      },
    },
  },
  plugins: [],
};
