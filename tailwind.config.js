/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./docs/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                priFont: "'Poppins', sans-serif",
            },
            colors: {
                priColor: "#FFC400",
            },
            textColor: {
                priText: "#d7d8df",
                priBold: "#ebebef",
            },
            backgroundColor: {
                priBG: "#111111",
            },
            width: {
                priWidth: "clamp(200px, 90vw, 1200px)",
                secWidth: "clamp(200px, 90vw, 800px)",
                terWidth: "clamp(200px, 90vw, 600px)",
                quaWidth: "clamp(200px, 90vw, 400px)",
            },
        },
        screens: {
            xsm: "400px",
            sm: "500px",
            md: "750px",
            lg: "1000px",
            xl: "1200px",
            "2xl": "1400px",
        },
    },
    plugins: [],
};
