module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {
    fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
    colors: { ink: "#0f1b2d", mute: "#a3afbf", brand: { DEFAULT: "#2d4fe8", dark: "#1f3bc4" } },
  } },
  plugins: [],
};
