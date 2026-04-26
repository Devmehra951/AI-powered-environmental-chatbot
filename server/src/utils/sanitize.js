import xss from 'xss';

export const sanitizeInput = (value) => xss(String(value || '').trim());
