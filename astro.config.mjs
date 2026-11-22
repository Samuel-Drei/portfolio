import { defineConfig } from 'astro/config';

// TODO: quando o domínio estiver definido, adicionar  site: 'https://SEU-DOMINIO'
// (habilita canonical, og:url absolutos e sitemap).
export default defineConfig({
  output: 'static',
  compressHTML: true,
});
