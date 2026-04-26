import {CHAR_CODE_A, ENGLISH_FREQ, M} from "../types/constants.ts";

function calculateDistribution(text: string): number[] {
  const freq: number[] = new Array(M).fill(0);
  for (let i = 0; i < text.length; i++) {
    const idx = text.charCodeAt(i) - CHAR_CODE_A;
    freq[idx]++;
  }
  return freq
}

function calculateIC(text: string): number {
  const n = text.length
  return calculateDistribution(text).reduce((a, b) => a + (b * b) / (n * n), 0);
}

function getSubsequences(text: string, keyLength: number): string[] {
  const sequences: string[] = new Array(keyLength).fill('');
  for (let i = 0; i < text.length; i++) {
    sequences[i % keyLength] += text[i];
  }
  return sequences;
}

function calculateICForLength(text: string, keyLength: number): number {
  const sequences = getSubsequences(text, keyLength);
  let avgIC = 0;
  for (const seq of sequences) {
    avgIC += calculateIC(seq);
  }
  return avgIC / keyLength;
}

export class CryptoAnalyzer {
  private readonly maxKeyLength: number = 20;
  public ICResults: { length: number; ic: number }[] = []
  public maxIC = 0
  public averageIC: number = 0
  public keyLength: number = 0
  public separatedDistributions = new Map<number, number[]>();
  public shiftedDistributions = new Map<number, { dist: number[], shift: number }>();
  public guessedKey = ''

  constructor(public readonly cipherText: string) {
  }

  analyze(manualKeyLength?: number) {
    this.findKeyLengths()
    this.getBestKeyLength()

    if (manualKeyLength) this.keyLength = manualKeyLength;

    this.calculateSeparatedDistributions()
    this.guessKey()
  }

  findKeyLengths() {
    for (let length = 1; length <= this.maxKeyLength; length++) {
      this.ICResults.push({length, ic: calculateICForLength(this.cipherText, length)});
    }
  }

  getBestKeyLength() {
    for (const {ic} of this.ICResults) {
      this.averageIC += ic
      if (ic > this.maxIC) {
        this.maxIC = ic
        this.keyLength = length;
      }
    }
    this.averageIC = this.averageIC / this.ICResults.length;

    for (const {length, ic} of this.ICResults) {
      if (ic > this.averageIC) {
        this.keyLength = length;
        break
      }
    }
  }

  calculateSeparatedDistributions() {
    const sequences = getSubsequences(this.cipherText, this.keyLength);
    for (let i = 0; i < this.keyLength; ++i) {
      const dist = calculateDistribution(sequences[i])
      const max = Math.max(...dist)
      this.separatedDistributions.set(i, dist.map(v => v / max));
    }
  }

  guessKey() {
    for (let keyIdx = 0; keyIdx < this.keyLength; ++keyIdx) {
      const dist = this.separatedDistributions.get(keyIdx)
      if (!dist) continue;
      let best_score = 0
      let guessedShift = 0
      for (let shift = 0; shift < M; ++shift) {
        let score = 0
        for (let i = 0; i < M; ++i) {
          score += ENGLISH_FREQ[i] * dist[(i + shift) % M]
        }

        if (score > best_score) {
          best_score = score
          guessedShift = shift
        }
      }
      this.guessedKey = this.guessedKey + String.fromCharCode(guessedShift + CHAR_CODE_A)
      this.shiftedDistributions.set(keyIdx, {
        shift: guessedShift,
        dist: dist.map((_, i) => dist[(i + guessedShift) % M])
      })
    }
  }
}
