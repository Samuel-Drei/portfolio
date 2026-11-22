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

export const NAV = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#resultados', label: 'Resultados' },
  { href: '#maps', label: 'Maps' },
  { href: '#processo', label: 'Processo' },
  { href: '#sobre', label: 'Sobre' },
];

export const MENU = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#resultados', label: 'Resultados' },
  { href: '#maps', label: 'Google Meu Negócio' },
  { href: '#processo', label: 'Processo' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#faq', label: 'Dúvidas' },
  { href: '#contato', label: 'Orçamento' },
];
