import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#181816',
        paper: '#f6f5f1',
        line: '#dbd9d3',
        muted: '#77766f'
      },
      fontFamily: { sans: ['DM Sans', 'Helvetica Neue', 'Arial', 'sans-serif'] }
    }
  },
  plugins: []
} satisfies Config;
