import { cp } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: '/ong-maos-que-transformam/',
  publicDir: false,
  plugins: [{
    name: 'copy-runtime-assets',
    async closeBundle() {
      const output = resolve(root, 'dist');
      await cp(resolve(root, 'imagens'), resolve(output, 'imagens'), { recursive: true });
    }
  }],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: resolve(root, 'html/index.html'),
        projetos: resolve(root, 'html/projetos.html'),
        cadastro: resolve(root, 'html/cadastro.html'),
        modal: resolve(root, 'js/modal.js')
      },
      output: {
        entryFileNames: ({ name }) => name === 'modal' ? 'js/modal.js' : 'assets/[name]-[hash].js'
      }
    }
  }
});