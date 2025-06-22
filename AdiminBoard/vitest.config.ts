import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  console.log('Vitest running from:', process.cwd());

  return {
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/vitest.setup.ts']
    },
    define: {
      'import.meta.env': JSON.stringify(env),
      'process.env': JSON.stringify(env),
    },
  };
});
