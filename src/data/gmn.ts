// Perfis do Google Meu Negócio. Fonte: painel "Desempenho" do Perfil da Empresa, publicado com autorização dos clientes.
export interface GmnStat { n: string; label: string; up?: string; vs?: string }
export interface GmnItem {
  name: string;
  segment: string;
  period: string;
  feature?: boolean;
  stats: GmnStat[];
  searches?: { t: string; n: string }[]; // o que as pessoas digitaram (n = quantas vezes)
  notes?: string[];
  recent?: { title: string; items: { n: string; what: string; up: string }[]; vs: string };
}

const V = 'pessoas viram a empresa no Google';
const B = 'buscas em que a empresa apareceu';

export const GMN: GmnItem[] = [
  {
    name: 'Hotel Tezla', segment: 'Hotelaria', period: 'jun–nov/2026', feature: true,
    stats: [
      { n: '12.201', label: V, up: '+9,4%', vs: 'vs. set/2025' },
      { n: '5.767', label: B, up: '+5,4%', vs: 'vs. set/2025' },
      { n: '4.225', label: 'interações com a ficha da empresa' },
    ],
    searches: [
      { t: 'hotéis', n: '1.684' },
      { t: 'hotel em primavera do leste', n: '905' },
      { t: 'hotel primavera do leste', n: '608' },
    ],
    notes: ['46% das visualizações vêm pelo Google Maps no celular'],
  },
  {
    name: 'Chaveiro Estrela', segment: 'Chaveiro', period: 'Últimos 12 meses',
    stats: [
      { n: '3.664', label: V },
      { n: '1.736', label: B },
    ],
    searches: [
      { t: 'chaveiro primavera do leste', n: '785' },
      { t: 'chaveiro', n: '393' },
    ],
    notes: ['69% pelo celular', 'Nota 4,6★ em 66 avaliações'],
    recent: { title: 'Último mês', items: [{ n: '692', what: 'visualizações', up: '+17,3%' }, { n: '388', what: 'buscas', up: '+1,8%' }], vs: 'vs. set/2025' },
  },
  {
    name: 'Tron Locações', segment: 'Geradores e içamento pesado', period: 'Últimos 12 meses',
    stats: [
      { n: '1.099', label: V },
      { n: '58', label: B },
    ],
    searches: [
      { t: 'tenda', n: '33' },
      { t: 'gerador de energia', n: '25' },
    ],
    notes: ['52% pelo celular'],
    recent: { title: 'Último mês', items: [{ n: '245', what: 'visualizações', up: '+14,0%' }, { n: '41', what: 'buscas', up: '+57,7%' }], vs: 'vs. out/2025' },
  },
  {
    name: 'Construtora São Bento', segment: 'Locação de máquinas e terraplanagem', period: 'Último mês',
    stats: [
      { n: '331', label: V },
      { n: '39', label: B },
    ],
    searches: [{ t: 'construtora primavera do leste', n: '21' }],
    notes: ['62% pelo celular'],
  },
  {
    name: 'iBrand Marketing', segment: 'Agência de marketing', period: 'Últimos 12 meses',
    stats: [
      { n: '761', label: V },
      { n: '129', label: B },
    ],
    searches: [{ t: 'marketing', n: '81' }, { t: 'marketing digital', n: '48' }],
  },
  {
    name: 'MR Resgate', segment: 'Remoção e transporte médico', period: 'Último mês',
    stats: [
      { n: '621', label: V },
      { n: '47', label: B },
    ],
    searches: [{ t: 'ambulância', n: '47' }],
    notes: ['56% pelo celular'],
  },
  {
    name: 'Plenus', segment: 'Infraestrutura de TI e controle de ponto', period: 'Último mês',
    stats: [
      { n: '794', label: V },
      { n: '65%', label: 'chegaram pesquisando no Google' },
    ],
    searches: [{ t: 'desenvolvimento de sistemas', n: '' }],
    notes: ['Também é encontrado pelo nome da empresa', '21% pelo Google Maps no celular'],
  },
];
