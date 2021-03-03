import valid from 'card-validator';
import pick from 'lodash.pick';

export const removeNonNumber = (string = '') => string.replace(/[^\d]/g, '');
export const removeLeadingSpaces = (string = '') => string.replace(/^\s+/g, '');

const limitLength = (string = '', maxLength: number) =>
  string.substr(0, maxLength);
const addGaps = (string = '', gaps: Array<number>) => {
  const offsets = [0].concat(gaps).concat([string.length]);

  return offsets
    .map((end, index) => {
      if (index === 0) return '';
      const start = offsets[index - 1];
      return string.substr(start, end - start);
    })
    .filter((part) => part !== '')
    .join(' ');
};

const FALLBACK_CARD = {gaps: [4, 8, 12], lengths: [16], code: {size: 3}};

export const formatNumber = (number: string) => {
  const card = valid.number(number).card || FALLBACK_CARD;
  const numberSanitized = removeNonNumber(number);
  const maxLength = card.lengths[card.lengths.length - 1];
  const lengthSanitized = limitLength(numberSanitized, maxLength);
  const formatted = addGaps(lengthSanitized, card.gaps);
  return formatted;
};

export const formatExpiry = (expiry: string) => {
  const sanitized = limitLength(removeNonNumber(expiry), 4);
  if (sanitized.match(/^[2-9]$/)) {
    return `0${sanitized}`;
  }
  if (sanitized.length > 2) {
    return `${sanitized.substr(0, 2)}/${sanitized.substr(2, sanitized.length)}`;
  }
  return sanitized;
};

export const formatCVC = (cvc: string) => {
  const maxCVCLength = 3;
  return limitLength(removeNonNumber(cvc), maxCVCLength);
};
