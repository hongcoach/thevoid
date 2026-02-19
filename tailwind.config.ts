import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                void: {
                    950: "#020617", // Deepest black-blue
                    900: "#0f172a",
                    800: "#1e293b",
                },
                accent: {
                    purple: "#a855f7", // Mystical
                    rose: "#e11d48",   // Burner
                },
            },
            animation: {
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "dissolve": "dissolve 1s ease-out forwards",
            },
            keyframes: {
                dissolve: {
                    "0%": { opacity: "1", transform: "scale(1)" },
                    "100%": { opacity: "0", transform: "scale(1.1) filter(blur(10px))" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
