// Dados gerais. Edite aqui: o resto do site lê daqui.
export const WHATSAPP = '5566984245364'; // DDI + DDD + número
export const PHONE_LABEL = '(66) 98424-5364';
export const PHONE_TEL = '+5566984245364';
export const EMAIL = 'samuelandreit.teixeira@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/samuel-andrei';
export const GITHUB = 'https://github.com/Samuel-Drei';
// TODO: adicionar o Instagram quando o usuário informar
export const INSTAGRAM = '';

export const wa = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

// Mensagens pré-preenchidas (uma por seção, para saber de onde veio o contato)
export const MSG = {
  hero: 'Olá Samuel! Vi seu site e quero um orçamento. Meu negócio é: ___ . Minha cidade é: ___ .',
  gmn: 'Olá Samuel! Vi os resultados no Google e quero algo parecido para o meu negócio. Meu negócio é: ___ .',
  sites: 'Olá Samuel! Vi os sites que você fez e quero um para o meu negócio. Meu negócio é: ___ .',
  final: 'Olá Samuel! Quero receber uma proposta de site e Google para o meu negócio. Meu negócio é: ___ . Minha cidade é: ___ .',
  bar: 'Olá Samuel! Vi seu site e quero um orçamento. Meu negócio é: ___ .',
};

export const NAV = [
  { href: '#google-meu-negocio', label: 'Google' },
  { href: '#sites', label: 'Sites' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#faq', label: 'Dúvidas' },
];

export const MENU = [
  { href: '#google-meu-negocio', label: 'Resultados no Google' },
  { href: '#sites', label: 'Sites no ar' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#processo', label: 'Como funciona' },
  { href: '#faq', label: 'Dúvidas' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Orçamento' },
];
