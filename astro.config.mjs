import { defineConfig } from 'astro/config';

// Endereço oficial: habilita canonical, og:url e og:image absolutos.
// Se trocar para um domínio próprio, mude aqui, em public/robots.txt e em public/sitemap.xml.
export default defineConfig({
  site: 'https://samuelandrei.vercel.app',
  output: 'static',
  compressHTML: true,
});
