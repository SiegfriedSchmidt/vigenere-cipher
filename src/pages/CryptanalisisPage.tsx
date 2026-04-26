import React, {useState, useMemo, useCallback} from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import {
  PageContainer,
  GraphContainer,
  GraphTitle,
  BarChart,
  Bar,
  XAxis,
  KeyLengthDisplay,
  KeyPositionSelector,
  KeyPositionButton,
  GuessedKeyDisplay,
  ResultSection,
  Section,
  Label,
  TextArea,
  FrequencyChart,
  FreqBar,
  Legend,
  GammaBox
} from '../styles/StyledComponents';

// Expected English letter frequencies (A-Z)
const ENGLISH_FREQ: number[] = [
  0.0817, 0.0149, 0.0278, 0.0425, 0.1270, 0.0223, 0.0202, 0.0609, 0.0697, 0.0015,
  0.0077, 0.0403, 0.0241, 0.0675, 0.0751, 0.0193, 0.0010, 0.0599, 0.0633, 0.0906,
  0.0276, 0.0098, 0.0236, 0.0015, 0.0197, 0.0007
];

const cleanTextOnly = (text: string): string => {
  return text.toUpperCase().replace(/[^A-Z]/g, '');
};

const calculateIC = (text: string): number => {
  const n = text.length;
  if (n < 2) return 0;

  const freq = new Array(26).fill(0);
  for (const char of text) {
    const idx = char.charCodeAt(0) - 65;
    if (idx >= 0 && idx < 26) freq[idx]++;
  }

  let sum = 0;
  for (const f of freq) {
    sum += f * (f - 1);
  }

  return sum / (n * (n - 1));
};

const getSubsequences = (text: string, keyLength: number): string[] => {
  const sequences: string[] = new Array(keyLength).fill('');
  for (let i = 0; i < text.length; i++) {
    sequences[i % keyLength] += text[i];
  }
  return sequences;
};

const calculateICForLength = (text: string, keyLength: number): number => {
  const sequences = getSubsequences(text, keyLength);
  let avgIC = 0;
  for (const seq of sequences) {
    avgIC += calculateIC(seq);
  }
  return avgIC / keyLength;
};

const findKeyLengths = (text: string, maxLength: number = 20): { length: number; ic: number }[] => {
  const results = [];
  for (let len = 1; len <= maxLength; len++) {
    const ic = calculateICForLength(text, len);
    results.push({length: len, ic});
  }
  return results;
};

const shiftText = (text: string, shift: number): string => {
  let result = '';
  for (const char of text) {
    const idx = char.charCodeAt(0) - 65;
    const shifted = (idx + shift) % 26;
    result += String.fromCharCode(shifted + 65);
  }
  return result;
};

const frequencyAnalysis = (text: string): number[] => {
  const freq = new Array(26).fill(0);
  for (const char of text) {
    const idx = char.charCodeAt(0) - 65;
    if (idx >= 0 && idx < 26) freq[idx]++;
  }
  const total = text.length;
  return freq.map(f => (f / total) * 100);
};

const findBestShift = (text: string): number => {
  const freq = frequencyAnalysis(text);
  let bestShift = 0;
  let bestCorrelation = -Infinity;

  for (let shift = 0; shift < 26; shift++) {
    let correlation = 0;
    for (let i = 0; i < 26; i++) {
      const shiftedIdx = (i + shift) % 26;
      correlation += freq[shiftedIdx] * ENGLISH_FREQ[i];
    }
    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestShift = shift;
    }
  }
  return bestShift;
};

const CryptanalysisPage: React.FC = () => {
  const [ciphertext, setCiphertext] = useState<string>('KIVIWKQNMWWIXWGWVWXKNIWWIXZVWWPIZSXKJVIW');
  const [guessedKeyLength, setGuessedKeyLength] = useState<number>(0);
  const [selectedPosition, setSelectedPosition] = useState<number>(0);
  const [guessedKey, setGuessedKey] = useState<string>('');
  const [decryptedText, setDecryptedText] = useState<string>('');

  const cleanCiphertext = useMemo(() => cleanTextOnly(ciphertext), [ciphertext]);

  const icResults = useMemo(() => {
    if (cleanCiphertext.length < 2) return [];
    return findKeyLengths(cleanCiphertext, 20);
  }, [cleanCiphertext]);

  const maxIC = useMemo(() => {
    if (icResults.length === 0) return 0;
    return Math.max(...icResults.map(r => r.ic));
  }, [icResults]);

  const handleAnalyzeKeyLength = useCallback(() => {
    if (icResults.length === 0) return;
    // Find length with IC closest to expected English IC (~0.066)
    let best = icResults[0];
    for (const result of icResults) {
      if (Math.abs(result.ic - 0.066) < Math.abs(best.ic - 0.066)) {
        best = result;
      }
    }
    setGuessedKeyLength(best.length);
    setSelectedPosition(0);

    // Now find the key
    const sequences = getSubsequences(cleanCiphertext, best.length);
    let key = '';
    for (let i = 0; i < best.length; i++) {
      const shift = findBestShift(sequences[i]);
      key += String.fromCharCode(65 + shift);
    }
    setGuessedKey(key);

    // Decrypt using the found key
    let decrypted = '';
    for (let i = 0; i < cleanCiphertext.length; i++) {
      const cipherChar = cleanCiphertext[i];
      const keyChar = key[i % key.length];
      const cipherIdx = cipherChar.charCodeAt(0) - 65;
      const keyIdx = keyChar.charCodeAt(0) - 65;
      const plainIdx = (cipherIdx - keyIdx + 26) % 26;
      decrypted += String.fromCharCode(plainIdx + 65);
    }
    setDecryptedText(decrypted);
  }, [icResults, cleanCiphertext]);

  const currentPositionFreq = useMemo(() => {
    if (!guessedKeyLength || !cleanCiphertext) return [];
    const sequences = getSubsequences(cleanCiphertext, guessedKeyLength);
    if (selectedPosition >= sequences.length) return [];
    const shiftedText = shiftText(sequences[selectedPosition], 26 - (guessedKey.charCodeAt(selectedPosition) - 65));
    return frequencyAnalysis(shiftedText);
  }, [guessedKeyLength, cleanCiphertext, selectedPosition, guessedKey]);

  const maxFreq = useMemo(() => {
    if (currentPositionFreq.length === 0) return 0;
    return Math.max(...currentPositionFreq);
  }, [currentPositionFreq]);

  return (
    <PageContainer>
      <Section>
        <Label>Зашифрованный текст</Label>
        <TextArea
          value={ciphertext}
          onChange={(e) => setCiphertext(e.target.value.toUpperCase())}
          placeholder="Введите шифротекст для взлома..."
        />
      </Section>

      <button
        onClick={handleAnalyzeKeyLength}
        style={{
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '16px',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 500,
          marginBottom: '2rem',
          width: '100%'
        }}
      >
        Найти ключ и расшифровать
      </button>

      {icResults.length > 0 && (
        <GraphContainer>
          <GraphTitle>Индекс совпадения для разных длин ключа</GraphTitle>
          <BarChart>
            {icResults.map((result) => (
              <Bar
                key={result.length}
                $height={(result.ic / maxIC) * 100}
                $isMax={result.length === guessedKeyLength}
              />
            ))}
          </BarChart>
          <XAxis>
            {icResults.map((result) => (
              <span key={result.length}>{result.length}</span>
            ))}
          </XAxis>
        </GraphContainer>
      )}

      {guessedKeyLength > 0 && (
        <>
          <KeyLengthDisplay>
            <p>Предполагаемая длина ключа</p>
            <h2>{guessedKeyLength}</h2>
          </KeyLengthDisplay>

          <GuessedKeyDisplay>
            <div className="label">🔑 Найденный ключ</div>
            <div className="key">{guessedKey || '???'}</div>
          </GuessedKeyDisplay>

          <Section>
            <Label>Частотный анализ для каждой позиции ключа</Label>
            <KeyPositionSelector>
              {Array.from({length: guessedKeyLength}, (_, i) => (
                <KeyPositionButton
                  key={i}
                  $active={selectedPosition === i}
                  onClick={() => setSelectedPosition(i)}
                >
                  Позиция {i + 1}: {guessedKey[i] || '?'}
                </KeyPositionButton>
              ))}
            </KeyPositionSelector>

            <GraphContainer>
              <Legend>
                <span className="actual">🔵 Фактическое распределение</span>
                <span className="expected">🔴 Ожидаемое (английский текст)</span>
              </Legend>
              <FrequencyChart>
                {currentPositionFreq.map((freq, idx) => (
                  <FreqBar
                    key={idx}
                    $height={(freq / maxFreq) * 100}
                    $expectedHeight={ENGLISH_FREQ[idx] * 100}
                  />
                ))}
              </FrequencyChart>
              <XAxis>
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                  <span key={letter}>{letter}</span>
                ))}
              </XAxis>
            </GraphContainer>
          </Section>

          <ResultSection>
            <Section>
              <Label>Расшифрованный текст</Label>
              <GammaBox style={{minHeight: '150px', whiteSpace: 'pre-wrap'}}>
                {decryptedText || '(нет данных)'}
              </GammaBox>
            </Section>
          </ResultSection>
        </>
      )}
    </PageContainer>
  );
};

export default CryptanalysisPage;