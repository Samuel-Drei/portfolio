// Projetos. Vídeo e capa ficam em public/videos/<video>.mp4 e <video>.jpg
// Ordem: negócios locais primeiro (é o que o comprador reconhece), produtos e sistemas depois.
// `result`: número real do painel do Google Meu Negócio do cliente (veja gmn.ts), com o período.
export interface SiteItem {
  name: string;
  note: string;
  video: string;
  tags: string[];
  url?: string;
  demo?: string;
  result?: { n: string; text: string; period: string };
  home?: boolean; // aparece na faixa horizontal da página inicial (os demais ficam em /projetos)
}

const SG = ['Site', 'Google Meu Negócio'];

export const SITES: SiteItem[] = [
  { home: true, name: 'Hotel Tezla', note: 'Hotel', video: 'tezla', tags: SG, url: 'https://www.tezlahotel.com.br',
    result: { n: '12.201', text: 'pessoas viram o perfil no Google', period: 'jun–nov/2026' } },
  { home: true, name: 'Tron Locações', note: 'Geradores e içamento pesado', video: 'tron', tags: SG, url: 'https://www.tronlocacoes.com.br',
    result: { n: '1.099', text: 'pessoas viram o perfil no Google', period: 'últimos 12 meses' } },
  { home: true, name: 'MR Resgate', note: 'Ambulância e UTI móvel', video: 'ambulancia', tags: SG, url: 'https://mr-resgates.vercel.app',
    result: { n: '621', text: 'pessoas viram o perfil no Google', period: 'último mês' } },
  { home: true, name: 'Plenus', note: 'Infraestrutura de TI e controle de ponto', video: 'plenus', tags: SG, url: 'https://plenus-rho.vercel.app',
    result: { n: '794', text: 'pessoas viram o perfil no Google', period: 'último mês' } },
  { name: 'Kelly Jalecos', note: 'Jalecos bordados', video: 'jaleco', tags: ['Site'], url: 'https://kellyjalecos.vercel.app' },
  { name: 'Missões Espontâneas', note: 'Institucional e doações', video: 'missoes', tags: ['Site'], url: 'https://www.missoesespontaneas.com.br' },
  { home: true, name: 'Klin', note: 'Sistema para clínicas de fisioterapia', video: 'klin', tags: ['Site', 'Demo interativa'], url: 'https://www.klintech.app.br', demo: 'https://demo.klintech.app.br' },
  { name: 'ConectAgro', note: 'Aplicativo para o agronegócio', video: 'conectagro', tags: ['Site'], url: 'https://agro-forge.vercel.app' },
  { name: 'Grupo Tech', note: 'Institucional · tecnologia sob medida', video: 'grupotech', tags: ['Site'], url: 'https://grupo-tech.vercel.app' },
  // Help.Me fora da versão pública até confirmar os números e regravar sem a etiqueta do Lovable (arquivos em ../_reserva/)
];
