module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {
    fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
    colors: { ink: "#0f1b2d", mute: "#a3afbf", brand: { DEFAULT: "#0b66e0", dark: "#0a4aa8" } },
  } },
  plugins: [],
};
