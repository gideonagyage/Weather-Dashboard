/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      quicksand: ["Quicksand", "sans-serif"],
    },
    extend: {
      fontSize: {
        tiny: "1.0rem", // Use for small labels, details
        small: "1.1rem", // Use for body text
        base: "1.2rem", // Use for main content text
        medium: "1.4rem", // Use for subheadings
        large: "1.8rem", // Use for main headings
        huge: "2.5rem", // Use for prominent titles
      },

      colors: {
        primary: {
          light: "#3498db", // Vibrant blue for light mode
          dark: "#2980b9", // Slightly darker blue for dark mode
        },
        secondary: {
          light: "#e74c3c", // Warm red for highlights
          dark: "#c0392b", // Darker red for dark mode
        },
        background: {
          light: "#f5f5f5", // Light gray background
          dark: "#1d1f21", // Dark gray background
        },
        text: {
          light: "#2c3e50", // Dark gray text
          dark: "#ecf0f1", // Light gray text
        },
        accent: {
          light: "#f1c40f", // Yellow for accents
          dark: "#d4ac79", // Muted yellow for dark mode
        },
      },
      spacing: {
        2: "0.5rem", // Use for small paddings and margins
        4: "1rem", // Use for standard paddings and margins
        6: "1.5rem", // Use for larger paddings and margins
        8: "2rem", // Use for section paddings
        12: "3rem", // Use for extra-large paddings
      },
      height: {
        8: "2rem", // Use for small elements
        10: "2.5rem", // Use for input fields, buttons
        12: "3rem", // Use for slightly taller elements
      },
    },
  },

  plugins: [],
};

