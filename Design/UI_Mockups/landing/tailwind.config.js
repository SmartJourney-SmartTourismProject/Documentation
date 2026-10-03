module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  corePlugins: { preflight: true },
  theme: {
    extend: {
      colors: { korma: "var(--korma)" },
      fontFamily: {
        "fraunces-black": "var(--fraunces-black-font-family)",
        "fraunces-bold": "var(--fraunces-bold-font-family)",
        "fraunces-semibold": "var(--fraunces-semibold-font-family)",
        "inter-bold": "var(--inter-bold-font-family)",
        "inter-medium": "var(--inter-medium-font-family)",
        "inter-regular": "var(--inter-regular-font-family)",
        "inter-regular-lower": "var(--inter-regular-lower-font-family)",
        "inter-semi-bold": "var(--inter-semi-bold-font-family)",
        "inter-semi-bold-upper": "var(--inter-semi-bold-upper-font-family)",
        "jetbrains-mono-bold": "var(--jetbrains-mono-bold-font-family)",
        "jetbrains-mono-bold-upper":
          "var(--jetbrains-mono-bold-upper-font-family)",
        "jetbrains-mono-medium": "var(--jetbrains-mono-medium-font-family)",
        "jetbrains-mono-medium-upper":
          "var(--jetbrains-mono-medium-upper-font-family)",
        "jetbrains-mono-regular": "var(--jetbrains-mono-regular-font-family)",
        "jetbrains-mono-regular-upper":
          "var(--jetbrains-mono-regular-upper-font-family)",
        "plus-jakarta-sans-bold": "var(--plus-jakarta-sans-bold-font-family)",
        "plus-jakarta-sans-bold-upper":
          "var(--plus-jakarta-sans-bold-upper-font-family)",
        "plus-jakarta-sans-extrabold":
          "var(--plus-jakarta-sans-extrabold-font-family)",
        "plus-jakarta-sans-regular":
          "var(--plus-jakarta-sans-regular-font-family)",
        "plus-jakarta-sans-semibold":
          "var(--plus-jakarta-sans-semibold-font-family)",
        "poppins-bold": "var(--poppins-bold-font-family)",
        "semantic-button": "var(--semantic-button-font-family)",
        "semantic-cell-upper": "var(--semantic-cell-upper-font-family)",
        "semantic-data": "var(--semantic-data-font-family)",
        "semantic-heading-1": "var(--semantic-heading-1-font-family)",
        "semantic-heading-2": "var(--semantic-heading-2-font-family)",
        "semantic-heading-3": "var(--semantic-heading-3-font-family)",
        "semantic-input": "var(--semantic-input-font-family)",
        "semantic-item": "var(--semantic-item-font-family)",
        "semantic-link": "var(--semantic-link-font-family)",
        "semantic-options": "var(--semantic-options-font-family)",
        "semantic-strong": "var(--semantic-strong-font-family)",
        "semantic-textarea": "var(--semantic-textarea-font-family)",
      },
    },
  },
  plugins: [],
};
