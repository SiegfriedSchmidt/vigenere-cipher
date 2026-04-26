export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' // алфавит
export const CHAR_CODE_A = "A".charCodeAt(0) // номер символа A
export const M = ALPHABET.length // мощность алфавита
export const GITHUB_ALGORITHM_URL = "https://github.com/SiegfriedSchmidt/vigenere-cipher/blob/main/src/crypto/vigenere.ts"
export const GITHUB_ALGORITHM2_URL = "https://github.com/SiegfriedSchmidt/vigenere-cipher/blob/main/src/crypto/CryptoAnalyzer.ts"
const baseUrl = import.meta.env.BASE_URL;
export const LONG_TEXT_FILENAME = `${baseUrl}harrypotter.txt`

export const TEST_TEXTS = {
  short: "CRYPTOGRAPHY",
  long: "", // Will be loaded asynchronously
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
};

export const ENGLISH_FREQ: number[] = (() => {
  const freq = [
    0.0817, 0.0149, 0.0278, 0.0425, 0.1270, 0.0223, 0.0202, 0.0609, 0.0697, 0.0015,
    0.0077, 0.0403, 0.0241, 0.0675, 0.0751, 0.0193, 0.0010, 0.0599, 0.0633, 0.0906,
    0.0276, 0.0098, 0.0236, 0.0015, 0.0197, 0.0007
  ] // частота появления латинских букв
  const m = Math.max(...freq)
  return freq.map(v => v / m)
})();
