// Perfis do Google Meu Negócio. Fonte: painel "Desempenho" do Perfil da Empresa, publicado com autorização dos clientes.
// `q` aceita HTML simples (<b>, <br>, <small>); é conteúdo estático escrito aqui.
export interface GmnStat { n: string; label: string; up?: string; vs?: string }
export interface GmnItem {
  name: string;
  segment: string;
  period: string;
  feature?: boolean;
  stats: GmnStat[];
  q: string;
}

const up = (v: string) => `<span class="gmn-card__up">${v}</span>`;

export const GMN: GmnItem[] = [
  {
    name: 'Hotel Tezla', segment: 'Hotelaria', period: 'jun–nov/2026', feature: true,
    stats: [
      { n: '12.201', label: 'pessoas viram o perfil', up: '+9,4%', vs: 'vs. set/2025' },
      { n: '5.767', label: 'buscas mostraram o perfil', up: '+5,4%', vs: 'vs. set/2025' },
      { n: '4.225', label: 'interações com o perfil (jun–nov/2026)' },
    ],
    q: 'Buscas principais: <b>“hotéis”</b> (1.684), <b>“hotel em primavera do leste”</b> (905) e <b>“hotel primavera do leste”</b> (608) · 46% das visualizações vêm pelo Google Maps no celular',
  },
  {
    name: 'Chaveiro Estrela', segment: 'Chaveiro', period: 'Últimos 12 meses',
    stats: [
      { n: '3.664', label: 'pessoas viram o perfil' },
      { n: '1.736', label: 'buscas mostraram o perfil' },
    ],
    q: `Buscas principais: <b>“chaveiro primavera do leste”</b> (785) e <b>“chaveiro”</b> (393) · 69% pelo celular · 4,6★ em 66 avaliações<br />Último mês: 692 visualizações ${up('+17,3%')} e 388 buscas ${up('+1,8%')} <small>(vs. set/2025)</small>`,
  },
  {
    name: 'Tron Locações', segment: 'Geradores e içamento pesado', period: 'Últimos 12 meses',
    stats: [
      { n: '1.099', label: 'pessoas viram o perfil' },
      { n: '58', label: 'buscas mostraram o perfil' },
    ],
    q: `Buscas principais: <b>“tenda”</b> (33) e <b>“gerador de energia”</b> (25) · 52% pelo celular<br />Último mês: 245 visualizações ${up('+14,0%')} e 41 buscas ${up('+57,7%')} <small>(vs. out/2025)</small>`,
  },
  {
    name: 'Construtora São Bento', segment: 'Locação de máquinas e terraplanagem', period: 'Último mês',
    stats: [
      { n: '331', label: 'pessoas viram o perfil' },
      { n: '39', label: 'buscas mostraram o perfil' },
    ],
    q: 'Busca nº 1: <b>“construtora primavera do leste”</b> (21) · 62% pelo celular',
  },
  {
    name: 'iBrand Marketing', segment: 'Agência de marketing', period: 'Últimos 12 meses',
    stats: [
      { n: '761', label: 'pessoas viram o perfil' },
      { n: '129', label: 'buscas mostraram o perfil' },
    ],
    q: 'Aparece em buscas genéricas: <b>“marketing”</b> (81) e <b>“marketing digital”</b> (48)',
  },
  {
    name: 'MR Resgate', segment: 'Remoção e transporte médico', period: 'Último mês',
    stats: [
      { n: '621', label: 'pessoas viram o perfil' },
      { n: '47', label: 'buscas mostraram o perfil' },
    ],
    q: 'Busca nº 1: <b>“ambulância”</b> (47) · 56% pelo celular',
  },
  {
    name: 'Plenus', segment: 'Infraestrutura de TI e controle de ponto', period: 'Último mês',
    stats: [
      { n: '794', label: 'pessoas viram o perfil' },
      { n: '65%', label: 'pesquisa no Google (computador e celular)' },
    ],
    q: 'Encontrado por <b>“desenvolvimento de sistemas”</b> e pelo nome da empresa · 21% pelo Google Maps no celular',
  },
];
