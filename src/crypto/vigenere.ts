import type {CipherMode, GammaMode} from "../types/general.ts";

const CHAR_CODE_A = "A".charCodeAt(0)
const M = 26 // мощность алфавита

export function cleanText(text: string) {
  return text.toUpperCase().replace(/[^A-Z]/g, '');
}

function applyGamma(
  text: string,
  gamma: string,
  mode: CipherMode
): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const p = text.charCodeAt(i) - CHAR_CODE_A;
    const g = gamma.charCodeAt(i % gamma.length) - CHAR_CODE_A;
    const c = mode === 'encrypt' ? (p + g) % M : (p - g + M) % M;
    result += String.fromCharCode(c + CHAR_CODE_A);
  }

  return result;
}

export const vigenere = (
  text: string,
  key: string,
  cipherMode: CipherMode,
  gammaMode: GammaMode
): { cipherText: string, gamma: string } => {
  if (text.length === 0) return {cipherText: '', gamma: ''};

  if (gammaMode === 'repeat') {
    let gamma = '';
    for (let i = 0; i < text.length; i++) {
      gamma += key[i % key.length];
    }
    return {cipherText: applyGamma(text, gamma, cipherMode), gamma};
  } else if (gammaMode === 'autokey-plain' && cipherMode === 'encrypt' || gammaMode === 'autokey-cipher' && cipherMode === 'decrypt') {
    const gamma = key[0] + text.slice(0, text.length - 1);
    return {cipherText: applyGamma(text, gamma, cipherMode), gamma};
  } else {
    let gamma = key[0];
    let cipherText = '';
    for (let i = 0; i < text.length; i++) {
      cipherText += applyGamma(text[i], gamma[i], cipherMode);
      if (i === text.length - 1) break;
      gamma += cipherText[i];
    }
    return {cipherText, gamma};
  }
};

