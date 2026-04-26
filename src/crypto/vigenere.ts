import type {CipherMode, GammaMode} from "../types/general.ts";
import {CHAR_CODE_A, M} from "../types/constants.ts";

export function cleanText(text: string) { // оставить только символы из алфавита
  return text.toUpperCase().replace(/[^A-Z]/g, '');
}

function applyGamma(// применить гамму к тексту
  text: string,
  gamma: string,
  mode: CipherMode
): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const p = text.charCodeAt(i) - CHAR_CODE_A;
    const g = gamma.charCodeAt(i % gamma.length) - CHAR_CODE_A;
    const c = mode === 'encrypt' ? (p + g) % M : (p - g + M) % M; // применяем гамму для зашифрования/расшифрования
    result += String.fromCharCode(c + CHAR_CODE_A);
  }

  return result;
}

export function vigenere(// зашифровываем/расшифровываем текст
  text: string,
  key: string,
  cipherMode: CipherMode,
  gammaMode: GammaMode
): { cipherText: string, gamma: string } {
  if (text.length === 0) return {cipherText: '', gamma: ''};

  if (gammaMode === 'repeat') { // повторение ключа зашифрование/расшифрование
    let gamma = '';
    for (let i = 0; i < text.length; i++) {
      gamma += key[i % key.length];
    }
    return {cipherText: applyGamma(text, gamma, cipherMode), gamma};
  } else if (gammaMode === 'autokey-plain' && cipherMode === 'encrypt' || gammaMode === 'autokey-cipher' && cipherMode === 'decrypt') {
    // зашифрование: самоключ по открытому тексту, расшифрование: самоключ по закрытому тексту
    const gamma = key[0] + text.slice(0, text.length - 1);
    return {cipherText: applyGamma(text, gamma, cipherMode), gamma};
  } else {
    // зашифрование: самоключ по закрытому тексту, расшифрование: самоключ по открытому тексту
    let gamma = key[0];
    let cipherText = '';
    for (let i = 0; i < text.length; i++) {
      cipherText += applyGamma(text[i], gamma[i], cipherMode);
      if (i === text.length - 1) break;
      gamma += cipherText[i];
    }
    return {cipherText, gamma};
  }
}
