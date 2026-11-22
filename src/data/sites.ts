// Sites no ar. Vídeo e capa ficam em public/videos/<video>.mp4 e <video>.jpg
export interface SiteItem {
  name: string;
  note: string;
  video: string;
  url?: string;
  demo?: string;
}

export const SITES: SiteItem[] = [
  { name: 'Tron Locações', note: 'Geradores e içamento pesado', video: 'tron', url: 'https://www.tronlocacoes.com.br' },
  { name: 'Hotel Tezla', note: 'Hotelaria · Primavera do Leste (MT)', video: 'tezla', url: 'https://www.tezlahotel.com.br' },
  { name: 'Klin', note: 'Sistema para clínicas de fisioterapia', video: 'klin', url: 'https://www.klintech.app.br', demo: 'https://demo.klintech.app.br' },
  { name: 'ConectAgro', note: 'Agronegócio · Mato Grosso', video: 'conectagro', url: 'https://agro-forge.vercel.app' },
  { name: 'Plenus', note: 'Infraestrutura de TI e controle de ponto', video: 'plenus', url: 'https://plenus-rho.vercel.app' },
  { name: 'MR Resgate', note: 'Ambulância e UTI móvel · Primavera do Leste (MT)', video: 'ambulancia', url: 'https://mr-resgates.vercel.app' },
  { name: 'Kelly Jalecos', note: 'Jalecos bordados · Primavera do Leste (MT)', video: 'jaleco', url: 'https://kellyjalecos.vercel.app' },
  { name: 'Missões Espontâneas', note: 'Institucional e doações', video: 'missoes', url: 'https://www.missoesespontaneas.com.br' },
  // Help.Me fora da versão pública até confirmar os números e regravar sem a etiqueta do Lovable (arquivos em ../_reserva/)
  { name: 'Grupo Tech', note: 'Institucional · tecnologia sob medida', video: 'grupotech', url: 'https://grupo-tech.vercel.app' },
];
