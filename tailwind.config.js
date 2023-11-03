/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        chart: "15px 15px 0px 0px #37F2B3",
        map: "15px 15px 0px 0px #7871DA",
      },
      colors: {
        blue: {
          7: "#1E429F",
          6: "#1C64F2",
          5: "#3F83F8",
          4: "#76A9FA",
          3: "#A4CAFE",
          2: "#C3DDFD",
          1: "#E1EFFE",
        },
        orange: {
          7: "#F26B2A",
          6: "#F3773B",
          5: "#F38D5C",
          4: "#F4A179",
          3: "#F4A883",
          2: "#F5BCA1",
          1: "#F5D6C7",
        },
        pink: {
          7: "#8F3C60",
          6: "#A84D77",
          5: "#C15E8F",
          4: "#C86893",
          3: "#D177A1",
          2: "#DB8BB4",
          1: "#E9A9C9",
        },
        teal: {
          7: "#00656D",
          6: "#0495A0",
          5: "#16BDCA",
          4: "#87D1D7",
          3: "#ABE7EB",
          2: "#D3F4F6",
          1: "#EAFCFE",
        },
        green: {
          "dark-jungle": "#111928",
        },
        "dutch-white": "#EFE3BC",
      },
      fontSize: {
        caption: ["0.75rem", "0.875rem"],
      },
      gridTemplateColumns: {
        "layout-loading": "256px minmax(0, 1fr)",
        "page-loading": "minmax(0, 1fr) 285px",
      },
      height: {
        appbar: "89px",
        content: "calc(100% - 131px)",
        "content-sidebar": "calc(100% - 56px)",
      },
      padding: {
        appbar: "89px",
      },
      width: {
        overlay: "calc(100% + 35px)",
        "sidebar-divider": "calc(100% - 24px)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
