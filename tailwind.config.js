/** @type {import('tailwindcss').Config} */

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}", // React app components
  "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}", // Material Tailwind components
  "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}", // Material Tailwind theme
];
export const theme = {
  extend: {}, // Extend or customize your theme here
};
export const plugins = [];
