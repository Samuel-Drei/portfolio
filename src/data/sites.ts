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
}

const SG = ['Site', 'Google Meu Negócio'];

export const SITES: SiteItem[] = [
  { name: 'Hotel Tezla', note: 'Hotel · Primavera do Leste (MT)', video: 'tezla', tags: SG, url: 'https://www.tezlahotel.com.br',
    result: { n: '12.201', text: 'pessoas viram o perfil no Google', period: 'jun–nov/2026' } },
  { name: 'Tron Locações', note: 'Geradores e içamento pesado', video: 'tron', tags: SG, url: 'https://www.tronlocacoes.com.br',
    result: { n: '1.099', text: 'pessoas viram o perfil no Google', period: 'últimos 12 meses' } },
  { name: 'MR Resgate', note: 'Ambulância e UTI móvel · Primavera do Leste (MT)', video: 'ambulancia', tags: SG, url: 'https://mr-resgates.vercel.app',
    result: { n: '621', text: 'pessoas viram o perfil no Google', period: 'último mês' } },
  { name: 'Plenus', note: 'Infraestrutura de TI e controle de ponto', video: 'plenus', tags: SG, url: 'https://plenus-rho.vercel.app',
    result: { n: '794', text: 'pessoas viram o perfil no Google', period: 'último mês' } },
  { name: 'Kelly Jalecos', note: 'Jalecos bordados · Primavera do Leste (MT)', video: 'jaleco', tags: ['Site'], url: 'https://kellyjalecos.vercel.app' },
  { name: 'Missões Espontâneas', note: 'Institucional e doações', video: 'missoes', tags: ['Site'], url: 'https://www.missoesespontaneas.com.br' },
  { name: 'Klin', note: 'Sistema para clínicas de fisioterapia', video: 'klin', tags: ['Site', 'Demo interativa'], url: 'https://www.klintech.app.br', demo: 'https://demo.klintech.app.br' },
  { name: 'ConectAgro', note: 'Aplicativo para o agronegócio · Mato Grosso', video: 'conectagro', tags: ['Site'], url: 'https://agro-forge.vercel.app' },
  { name: 'Grupo Tech', note: 'Institucional · tecnologia sob medida', video: 'grupotech', tags: ['Site'], url: 'https://grupo-tech.vercel.app' },
  // Help.Me fora da versão pública até confirmar os números e regravar sem a etiqueta do Lovable (arquivos em ../_reserva/)
];
