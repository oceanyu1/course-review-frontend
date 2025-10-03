/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // ✅ ADD THIS SECTION
            fontFamily: {
                sans: ["Inter", "sans-serif"], 
            },
        },
    },
    plugins: [],
}